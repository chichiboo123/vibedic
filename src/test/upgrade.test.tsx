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

describe('홈 용어 띠', () => {
  it('흐르는 용어를 누르면 해당 UI 상세로 이동하고, 복제본은 보조기기에서 숨긴다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    const marquee = screen.getByRole('navigation', { name: 'UI 용어 바로가기' });
    // 보조기기에는 원본 목록만 노출됩니다.
    expect(within(marquee).getAllByRole('link')).toHaveLength(uiItems.length);

    await user.click(within(marquee).getByRole('link', { name: '체크박스 Checkbox' }));
    expect(await screen.findByRole('heading', { level: 1, name: '체크박스' })).toBeInTheDocument();
  });
});

describe('스크롤 효과', () => {
  it('홈에 스크롤 문장, 단계 카드, UX 분류 가로 구간이 있고 링크로 이동한다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    expect(screen.getByRole('region', { name: 'VibeDic이 하는 일' })).toHaveTextContent(/이름을 알면/);
    expect(screen.getByRole('heading', { level: 3, name: '프롬프트로 가져가요' })).toBeInTheDocument();

    const journey = screen.getByRole('region', { name: '사용자는 무엇을 하고 싶을까요?' });
    expect(within(journey).getAllByRole('link')).toHaveLength(8);
    await user.click(within(journey).getByRole('link', { name: /원하는 정보를 찾고 싶어요/ }));
    expect(await screen.findByRole('heading', { level: 1, name: 'UX 패턴' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '원하는 정보를 찾고 싶어요' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('맨 위로 버튼은 처음엔 숨겨져 있고 Tab 순서에서도 빠진다', () => {
    renderApp('/');
    // 숨김 상태(aria-hidden)에서는 접근 가능한 이름 계산이 빠지므로 레이블 속성으로 찾습니다.
    const button = document.querySelector('button[aria-label="맨 위로 이동"]');
    expect(button).not.toBeNull();
    expect(screen.queryByRole('button', { name: '맨 위로 이동' })).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-hidden', 'true');
    expect(button).toHaveAttribute('tabindex', '-1');
  });

  it('IntersectionObserver가 없는 환경에서는 내용을 숨기지 않는다', () => {
    renderApp('/ui');
    expect(document.documentElement.classList.contains('reveal-ready')).toBe(false);
    expect(screen.getByRole('heading', { level: 3, name: '토스트' })).toBeInTheDocument();
  });
});

describe('움직임·스크롤 분류', () => {
  const motionSlugs = [
    'scroll-reveal',
    'parallax-scrolling',
    'scroll-progress',
    'back-to-top',
    'hide-on-scroll-header',
    'scroll-text-reveal',
    'stacking-cards',
    'horizontal-scroll-section',
    'count-up',
  ];

  it('새 분류에 9개 항목이 있고 목록 필터로 볼 수 있다', async () => {
    const user = userEvent.setup();
    expect(uiItems.filter((item) => item.category === 'motion').map((item) => item.slug)).toEqual(motionSlugs);

    renderApp('/ui');
    await user.click(screen.getByRole('button', { name: '움직임·스크롤' }));
    expect(screen.getAllByRole('article')).toHaveLength(9);
    expect(screen.getByRole('heading', { level: 3, name: '패럴랙스 스크롤' })).toBeInTheDocument();
  });

  it.each([
    ['스크롤 효과', 'scroll-reveal'],
    ['패럴렉스', 'parallax-scrolling'],
    ['TOP 버튼', 'back-to-top'],
    ['sticky', 'hide-on-scroll-header'],
    ['가로 스크롤', 'horizontal-scroll-section'],
    ['카운터', 'count-up'],
  ])('"%s"로 검색하면 %s 항목이 나온다', (query, slug) => {
    expect(searchAll(query).some((result) => result.type === 'ui' && result.slug === slug)).toBe(true);
  });

  it('상세 페이지마다 직접 조작 데모가 있다', () => {
    for (const slug of motionSlugs) {
      const { unmount } = renderApp(`/ui/${slug}`);
      const region = screen.getByRole('region', { name: '직접 살펴보기' });
      expect(within(region).getByText('데모 영역 · 직접 조작해 보세요')).toBeInTheDocument();
      unmount();
    }
  });

  it('맨 위로 버튼 데모는 목록을 내리면 버튼이 나타난다', () => {
    renderApp('/ui/back-to-top');
    const area = screen.getByRole('region', { name: '상품 목록 스크롤 영역' });
    area.scrollTop = 400;
    fireEvent.scroll(area);
    expect(screen.getByRole('button', { name: '맨 위로 이동(데모)' })).toBeInTheDocument();
    expect(screen.getByText(/버튼이 나타났어요/)).toBeInTheDocument();
  });

  it('Apple 서비스 상세에서 움직임 항목으로 연결된다', () => {
    renderApp('/services/apple');
    const related = screen.getByRole('region', { name: '참고할 UI 요소' });
    expect(within(related).getByRole('link', { name: /겹쳐 쌓이는 카드/ })).toHaveAttribute('href', '/ui/stacking-cards');
  });
});

describe('쉬운 사용 개선', () => {
  it('상세 제목 옆 "프롬프트 바로 복사"는 저장된 조건까지 반영해 복사한다', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    window.localStorage.setItem('vibedic:prompt-options', JSON.stringify({ stack: 'react', addons: ['a11y'] }));

    renderApp('/ui/modal');
    await user.click(screen.getByRole('button', { name: '프롬프트 바로 복사' }));
    const copied = writeText.mock.calls[0][0] as string;
    expect(copied).toContain('모달');
    expect(copied).toContain('React 함수 컴포넌트와 Tailwind CSS');
    expect(copied).toContain('키보드만으로 조작');
  });

  it('상세 페이지는 데모 다음에 "언제 사용하나요?"가 나온다', () => {
    renderApp('/ui/modal');
    const titles = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent ?? '');
    const demo = titles.findIndex((title) => title.includes('직접 살펴보기'));
    expect(titles[demo + 1]).toContain('언제 사용하나요?');
  });

  it('모바일 메뉴에 메뉴마다 한 줄 설명이 보이고 링크 이름은 짧게 유지된다', async () => {
    const user = userEvent.setup();
    renderApp('/');
    await user.click(screen.getByRole('button', { name: '메뉴 열기' }));
    const dialog = await screen.findByRole('dialog', { name: '모바일 메뉴' });
    const uiLink = within(dialog).getByRole('link', { name: 'UI 요소' });
    expect(uiLink).toHaveTextContent('화면에 보이는 것의 이름');
  });

  it('홈 첫 화면에 UI와 UX의 차이를 한 줄로 알려준다', () => {
    renderApp('/');
    expect(screen.getByText(/는 검색·저장처럼 사용하는 흐름이에요/)).toBeInTheDocument();
  });
});
