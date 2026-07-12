import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './renderApp';

describe('주요 인터랙션', () => {
  it('프롬프트 복사 버튼이 클립보드에 복사하고 토스트를 띄운다', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    renderApp('/ui/toggle-switch');
    await user.click(screen.getByRole('button', { name: '프롬프트 복사' }));

    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('토글 스위치'));
    expect(await screen.findByText('프롬프트를 복사했어요.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '복사 완료' })).toBeInTheDocument();
  });

  it('기기별 비교 탭이 전환된다', async () => {
    const user = userEvent.setup();
    renderApp('/ui/toggle-switch');

    const tablist = screen.getByRole('tablist', { name: '기기 선택' });
    expect(screen.getByRole('tab', { name: 'PC', selected: true })).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/마우스를 올렸을 때/);

    const mobileTab = screen.getByRole('tab', { name: '모바일' });
    await user.click(mobileTab);
    expect(mobileTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/호버가 없으므로/);
    expect(tablist).toBeInTheDocument();
  });

  it('토글 스위치 데모가 실제로 켜지고 꺼진다', async () => {
    const user = userEvent.setup();
    renderApp('/ui/toggle-switch');

    const demoSwitch = screen.getByRole('switch', { name: '알림 받기' });
    expect(demoSwitch).toHaveAttribute('aria-checked', 'false');
    await user.click(demoSwitch);
    expect(demoSwitch).toHaveAttribute('aria-checked', 'true');
  });

  it('모달 데모가 열리고 ESC로 닫힌다', async () => {
    const user = userEvent.setup();
    renderApp('/ui/modal');

    await user.click(screen.getByRole('button', { name: '공유 설정 열기' }));
    const dialog = await screen.findByRole('dialog', { name: '공유 설정' });
    expect(dialog).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: '공유 설정' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '공유 설정 열기' })).toHaveFocus();
  });

  it('탭 데모가 화살표 키로 이동된다', async () => {
    const user = userEvent.setup();
    renderApp('/ui/tab');

    const firstTab = screen.getByRole('tab', { name: '상품 정보' });
    firstTab.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: '리뷰 12' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: '리뷰 12' })).toBeInTheDocument();
  });

  it('검색 페이지에서 한글 검색과 결과 유형 표시가 동작한다', async () => {
    const user = userEvent.setup();
    renderApp('/search');

    const input = screen.getByRole('searchbox', { name: '검색어' });
    await user.type(input, '토글{Enter}');

    expect(await screen.findByText(/검색 결과/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /토글 스위치/ })).toBeInTheDocument();
  });

  it('검색 결과가 없으면 다음 행동을 안내한다', async () => {
    const user = userEvent.setup();
    renderApp('/search');

    const input = screen.getByRole('searchbox', { name: '검색어' });
    await user.type(input, 'qqqq없는검색어zzzz{Enter}');

    expect(await screen.findByText(/에 대한 결과가 없어요/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'UI 전체 보기' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'UX 전체 보기' })).toBeInTheDocument();
  });

  it('검색어가 URL 쿼리로 유지된다', async () => {
    renderApp('/search?q=모달');
    expect(await screen.findByText(/“모달” 검색 결과/)).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: '검색어' })).toHaveValue('모달');
  });
});
