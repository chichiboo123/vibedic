import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './renderApp';

describe('저장함', () => {
  it('상세 페이지에서 저장하고 해제할 수 있다', async () => {
    const user = userEvent.setup();
    renderApp('/ui/toggle-switch');

    const saveButton = screen.getByRole('button', { name: '토글 스위치 저장' });
    await user.click(saveButton);
    expect(screen.getByRole('button', { name: '토글 스위치 저장 해제' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await user.click(screen.getByRole('button', { name: '토글 스위치 저장 해제' }));
    expect(screen.getByRole('button', { name: '토글 스위치 저장' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('저장한 항목이 저장함 페이지에 나타난다', async () => {
    const user = userEvent.setup();
    const { unmount } = renderApp('/ui/toggle-switch');
    await user.click(screen.getByRole('button', { name: '토글 스위치 저장' }));
    unmount();

    renderApp('/saved');
    expect(screen.getByText(/UI 1개, UX 0개를 저장했어요/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: '토글 스위치' })).toBeInTheDocument();
  });

  it('localStorage에서 저장 상태가 복원된다', () => {
    window.localStorage.setItem(
      'vibedic:saved-items',
      JSON.stringify([{ type: 'ux', id: 'ux-search' }]),
    );
    renderApp('/saved');
    expect(screen.getByText(/UI 0개, UX 1개를 저장했어요/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: '검색' })).toBeInTheDocument();
  });

  it('저장한 항목이 없으면 빈 상태 안내가 보인다', () => {
    renderApp('/saved');
    expect(screen.getByText('아직 저장한 항목이 없어요.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'UI 요소 둘러보기' })).toBeInTheDocument();
  });

  it('상세 페이지를 방문하면 최근 본 항목에 기록된다', () => {
    const { unmount } = renderApp('/ui/toggle-switch');
    unmount();
    renderApp('/saved');
    expect(screen.getByRole('region', { name: '최근 본 항목' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /토글 스위치/ })).toBeInTheDocument();
  });
});
