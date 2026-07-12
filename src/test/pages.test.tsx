import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './renderApp';

describe('페이지 렌더링과 이동', () => {
  it('홈 화면에 핵심 문구와 주요 진입 카드가 보인다', () => {
    renderApp('/');
    expect(
      screen.getByRole('heading', { level: 1, name: /필요할 때 꺼내 찾는/ }),
    ).toBeInTheDocument();
    expect(screen.getByText('UI 요소 찾기')).toBeInTheDocument();
    expect(screen.getByText('UX 패턴 찾기')).toBeInTheDocument();
  });

  it('UI 목록이 렌더링되고 카테고리 필터가 동작한다', async () => {
    const user = userEvent.setup();
    renderApp('/ui');
    expect(screen.getByRole('heading', { level: 1, name: 'UI 요소' })).toBeInTheDocument();
    expect(screen.getByText(/개 항목을 보고 있어요/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '상태 알려주기' }));
    expect(screen.getByRole('heading', { level: 3, name: '토스트' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: '체크박스' })).not.toBeInTheDocument();
  });

  it('UX 목록이 렌더링되고 카테고리 필터가 동작한다', async () => {
    const user = userEvent.setup();
    renderApp('/ux');
    expect(screen.getByRole('heading', { level: 1, name: 'UX 패턴' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '원하는 정보를 찾고 싶어요' }));
    expect(screen.getByRole('heading', { level: 3, name: '검색' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: '로그인' })).not.toBeInTheDocument();
  });

  it('UI 목록에서 카드를 눌러 상세로 이동한다', async () => {
    const user = userEvent.setup();
    renderApp('/ui');
    await user.click(screen.getByRole('link', { name: '토글 스위치' }));
    expect(
      await screen.findByRole('heading', { level: 1, name: '토글 스위치' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Toggle Switch')).toBeInTheDocument();
    expect(screen.getByText('기능이나 설정을 바로 켜고 끌 때 사용하는 요소입니다.')).toBeInTheDocument();
  });

  it('UI 상세에서 관련 UX 링크로 이동한다', async () => {
    const user = userEvent.setup();
    renderApp('/ui/search-field');
    const related = screen.getByRole('region', { name: '함께 알아보면 좋은 UX' });
    await user.click(within(related).getByRole('link', { name: '검색 Search Experience' }));
    expect(await screen.findByRole('heading', { level: 1, name: '검색' })).toBeInTheDocument();
    expect(screen.getByText('Search Experience')).toBeInTheDocument();
  });

  it('UX 상세 페이지에 대표 흐름과 체크리스트가 보인다', () => {
    renderApp('/ux/search');
    expect(screen.getByRole('heading', { level: 1, name: '검색' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: '대표 흐름' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: '점검하기' })).toBeInTheDocument();
  });

  it('서비스 목록과 상세 페이지가 렌더링된다', async () => {
    const user = userEvent.setup();
    renderApp('/services');
    expect(screen.getByRole('heading', { level: 1, name: '유명 서비스' })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Notion' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Notion' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: '참고할 UI 요소' })).toBeInTheDocument();
  });

  it('기기별 비교 페이지가 렌더링된다', () => {
    renderApp('/compare');
    expect(screen.getByRole('heading', { level: 1, name: '기기별 비교' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: '사이드바와 하단 내비게이션' }),
    ).toBeInTheDocument();
  });

  it('잘못된 경로에서는 404 화면이 보인다', () => {
    renderApp('/이상한-경로');
    expect(screen.getByRole('heading', { name: '찾으려는 페이지가 없어요.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '홈으로 이동' })).toBeInTheDocument();
  });

  it('존재하지 않는 UI slug에서도 404 화면이 보인다', () => {
    renderApp('/ui/없는-슬러그');
    expect(screen.getByRole('heading', { name: '찾으려는 페이지가 없어요.' })).toBeInTheDocument();
  });
});
