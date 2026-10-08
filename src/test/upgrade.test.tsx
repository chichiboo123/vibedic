import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './renderApp';
import { versusTopics } from '../data/versus';
import { findUIItemById, uiItems } from '../data/uiItems';
import { searchAll } from '../hooks/useSearch';
import { buildPrompt } from '../data/promptKit';

describe('빠른 검색 (커맨드 팔레트)', () => {
  it('헤더 검색 버튼으로 열고, 입력한 결과를 Enter로 연다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: '빠른 검색 열기' }));
    const dialog = await screen.findByRole('dialog', { name: '빠른 검색' });
    const input = within(dialog).getByRole('combobox', { name: '빠른 검색어' });
    expect(input).toHaveFocus();

    await user.type(input, '토글');
    expect(within(dialog).getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{Enter}');

    expect(await screen.findByRole('heading', { level: 1, name: '토글 스위치' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog', { name: '빠른 검색' })).not.toBeInTheDocument();
  });

  it('Ctrl+K로 열리고 ESC로 닫힌다', async () => {
    const user = userEvent.setup();
    renderApp('/ui');

    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
    expect(await screen.findByRole('dialog', { name: '빠른 검색' })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: '빠른 검색' })).not.toBeInTheDocument();
  });

  it('입력창에서 / 를 쳐도 빠른 검색이 열리지 않는다', async () => {
    const user = userEvent.setup();
    renderApp('/ui');

    await user.type(screen.getByRole('searchbox', { name: 'UI 요소 이름으로 걸러내기' }), '/');
    expect(screen.queryByRole('dialog', { name: '빠른 검색' })).not.toBeInTheDocument();
  });

  it('화살표로 고른 뒤 전체 결과 보기로 통합 검색 페이지로 간다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    fireEvent.keyDown(document, { key: '/' });
    const dialog = await screen.findByRole('dialog', { name: '빠른 검색' });
    await user.type(within(dialog).getByRole('combobox'), '모달');
    await user.click(within(dialog).getByRole('button', { name: /“모달” 전체 결과 보기/ }));

    expect(await screen.findByText(/“모달” 검색 결과/)).toBeInTheDocument();
  });
});

describe('헷갈리는 UI 구분하기', () => {
  it('모든 비교 주제가 실제 UI 항목만 참조하고 행의 값 개수가 맞는다', () => {
    const slugs = new Set<string>();
    for (const topic of versusTopics) {
      expect(slugs.has(topic.slug)).toBe(false);
      slugs.add(topic.slug);
      expect(topic.uiIds.length).toBeGreaterThanOrEqual(2);
      for (const id of topic.uiIds) expect(findUIItemById(id)).toBeDefined();
      for (const row of topic.rows) expect(row.values).toHaveLength(topic.uiIds.length);
    }
  });

  it('비교 페이지에 주제와 비교표가 보이고 항목 상세로 이동한다', async () => {
    const user = userEvent.setup();
    renderApp('/versus');

    expect(screen.getByRole('heading', { level: 1, name: '헷갈리는 UI 구분하기' })).toBeInTheDocument();
    const section = screen.getByRole('region', { name: '체크박스 · 토글 스위치 · 라디오 버튼' });
    expect(within(section).getByRole('table', { name: /비교표/ })).toBeInTheDocument();

    await user.click(within(section).getByRole('link', { name: /라디오 버튼/ }));
    expect(await screen.findByRole('heading', { level: 1, name: '라디오 버튼' })).toBeInTheDocument();
  });

  it('UI 상세에서 관련 비교표로 연결된다', () => {
    renderApp('/ui/bottom-sheet');
    expect(screen.getByRole('link', { name: /모달 · 바텀 시트 · 드로어 비교표 보기/ })).toHaveAttribute(
      'href',
      '/versus#modal-sheet-drawer',
    );
  });

  it('통합 검색에서 비교 주제도 찾는다', () => {
    const results = searchAll('바텀 시트');
    expect(results.some((result) => result.type === 'versus' && result.slug === 'modal-sheet-drawer')).toBe(true);
  });
});

describe('프롬프트 빌더', () => {
  it('기술 스택과 공통 조건을 골라 덧붙여 복사한다', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

    renderApp('/ui/toggle-switch');
    const section = screen.getByRole('region', { name: '내 웹앱에 적용하기' });
    await user.click(within(section).getByRole('button', { name: 'React + Tailwind' }));
    await user.click(within(section).getByRole('button', { name: /접근성/ }));
    expect(within(section).getByRole('button', { name: /접근성/ })).toHaveAttribute('aria-pressed', 'true');

    await user.click(within(section).getByRole('button', { name: '프롬프트 복사' }));
    const copied = writeText.mock.calls[0][0] as string;
    expect(copied).toContain('토글 스위치');
    expect(copied).toContain('React 함수 컴포넌트와 Tailwind CSS');
    expect(copied).toContain('키보드만으로 조작');
    expect(window.localStorage.getItem('vibedic:prompt-options')).toContain('react');
  });

  it('조건을 고르지 않으면 원래 프롬프트 그대로다', () => {
    const base = '버튼을 만들어줘.';
    expect(buildPrompt(base, 'none', [])).toBe(base);
  });
});

describe('목록과 상세 탐색', () => {
  it('목록 검색어가 주소에 남아 다시 들어와도 유지된다', () => {
    renderApp('/ui?q=토글&category=control');
    expect(screen.getByRole('searchbox', { name: 'UI 요소 이름으로 걸러내기' })).toHaveValue('토글');
    expect(screen.getByRole('heading', { level: 3, name: '토글 스위치' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: '버튼' })).not.toBeInTheDocument();
  });

  it('상세 페이지에서 다음 항목으로 넘어간다', async () => {
    const user = userEvent.setup();
    const first = uiItems[0];
    const second = uiItems[1];
    renderApp(`/ui/${first.slug}`);

    const nav = screen.getByRole('navigation', { name: '이전·다음 UI 요소' });
    await user.click(within(nav).getByRole('link', { name: new RegExp(second.koreanName) }));
    expect(await screen.findByRole('heading', { level: 1, name: second.koreanName })).toBeInTheDocument();
  });

  it('상세 페이지에 목차가 있다', () => {
    renderApp('/ux/load-more');
    const toc = screen.getByRole('navigation', { name: '이 페이지 목차' });
    expect(within(toc).getByRole('button', { name: '대표 흐름' })).toBeInTheDocument();
    expect(within(toc).getByRole('button', { name: '점검하기' })).toBeInTheDocument();
  });

  it('검색 결과를 유형으로 거른다', async () => {
    const user = userEvent.setup();
    renderApp('/search?q=모달');
    const filters = await screen.findByRole('group', { name: '결과 유형 필터' });
    await user.click(within(filters).getByRole('button', { name: /^구분/ }));
    const links = screen.getAllByRole('link').filter((link) => link.getAttribute('href')?.startsWith('/versus#'));
    expect(links.length).toBeGreaterThan(0);
    expect(screen.queryByRole('link', { name: /Modal/ })).not.toBeInTheDocument();
  });
});

describe('새 콘텐츠 페이지', () => {
  it('프롬프트 가이드 페이지가 렌더링된다', () => {
    renderApp('/guide');
    expect(screen.getByRole('heading', { level: 1, name: '바이브코딩 프롬프트 가이드' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: '정확한 이름으로 부르기' })).toBeInTheDocument();
  });

  it('새 UX 패턴 상세가 열린다', () => {
    renderApp('/ux/permission-request');
    expect(screen.getByRole('heading', { level: 1, name: '권한 요청' })).toBeInTheDocument();
  });
});
