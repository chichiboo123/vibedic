import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './renderApp';
import { uiItems } from '../data/uiItems';

// 예전에는 절반 가까운 항목이 "시각적 예시"만 보여 줬습니다.
// 이제는 모든 항목이 데모 영역에서 실제로 조작되는지 확인합니다.

describe('직접 살펴보기 데모', () => {
  it('모든 UI 상세 페이지의 데모 영역이 "직접 조작해 보세요"로 안내된다', () => {
    for (const item of uiItems) {
      const { unmount } = renderApp(`/ui/${item.slug}`);
      const region = screen.getByRole('region', { name: '직접 살펴보기' });
      expect(
        within(region).getByText('데모 영역 · 직접 조작해 보세요'),
        `${item.slug}에 조작 가능한 데모가 없습니다`,
      ).toBeInTheDocument();
      unmount();
    }
  });

  it('사이드바 데모를 접으면 이름이 사라지고 본문이 넓어진다', async () => {
    const user = userEvent.setup();
    renderApp('/ui/sidebar');

    const nav = screen.getByRole('navigation', { name: '사이드바 메뉴' });
    expect(within(nav).getByRole('button', { name: '내 문서' })).toBeInTheDocument();

    await user.click(within(nav).getByRole('button', { name: '사이드바 접기' }));
    expect(within(nav).getByRole('button', { name: '사이드바 펼치기' })).toBeInTheDocument();
    // 접으면 이름은 화면에서 사라지지만, 툴팁(title)으로는 여전히 읽을 수 있어야 합니다.
    expect(within(nav).queryByText('내 문서')).not.toBeInTheDocument();
    expect(within(nav).getByRole('button', { name: '내 문서' })).toHaveAttribute('title', '내 문서');
  });

  it('표 데모의 머리글을 누르면 정렬 방향이 바뀐다', async () => {
    const user = userEvent.setup();
    renderApp('/ui/table');

    const priceHeader = screen.getByRole('columnheader', { name: /가격/ });
    expect(priceHeader).toHaveAttribute('aria-sort', 'none');

    await user.click(within(priceHeader).getByRole('button'));
    expect(priceHeader).toHaveAttribute('aria-sort', 'ascending');
    await user.click(within(priceHeader).getByRole('button'));
    expect(priceHeader).toHaveAttribute('aria-sort', 'descending');
  });

  it('인증번호 입력 데모가 다음 칸으로 자동으로 넘어간다', async () => {
    const user = userEvent.setup();
    renderApp('/ui/otp-input');

    const first = screen.getByRole('textbox', { name: '인증번호 1번째 자리' });
    await user.click(first);
    await user.keyboard('48');

    expect(first).toHaveValue('4');
    expect(screen.getByRole('textbox', { name: '인증번호 2번째 자리' })).toHaveValue('8');
    expect(screen.getByRole('textbox', { name: '인증번호 3번째 자리' })).toHaveFocus();
  });

  it('드로어 데모가 열리고 ESC로 닫힌다', async () => {
    const user = userEvent.setup();
    renderApp('/ui/drawer');

    await user.click(screen.getByRole('button', { name: '필터 서랍 열기' }));
    expect(await screen.findByRole('dialog', { name: '검색 필터' })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: '검색 필터' })).not.toBeInTheDocument();
  });

  it('알림 배지 데모가 100개를 넘으면 99+로 줄여서 보여 준다', async () => {
    const user = userEvent.setup();
    renderApp('/ui/notification-badge');

    const demo = screen.getByRole('region', { name: '직접 살펴보기' });
    expect(within(demo).getByText('읽지 않은 알림 3개')).toBeInTheDocument();

    await user.click(within(demo).getByRole('button', { name: '100개 넘겨 보기' }));
    expect(within(demo).getAllByText('99+').length).toBeGreaterThan(0);

    await user.click(within(demo).getByRole('button', { name: '모두 읽음' }));
    expect(within(demo).queryByText('99+')).not.toBeInTheDocument();
    expect(within(demo).getByText('읽지 않은 알림 0개')).toBeInTheDocument();
  });

  it('목록 카드 썸네일에 데모 표시가 붙고 카드를 눌러 상세로 들어간다', async () => {
    const user = userEvent.setup();
    renderApp('/ui?category=layout');

    expect(screen.getAllByText('직접 조작 데모').length).toBe(
      uiItems.filter((item) => item.category === 'layout').length,
    );

    await user.click(screen.getByRole('link', { name: '사이드바' }));
    expect(await screen.findByRole('heading', { level: 1, name: '사이드바' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: '직접 살펴보기' })).toBeInTheDocument();
  });
});
