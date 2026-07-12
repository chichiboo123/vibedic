import { describe, expect, it } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './renderApp';

describe('사용법 안내 모달', () => {
  it('헤더의 사용법 버튼을 누르면 안내 모달이 열리고 포커스가 안으로 이동한다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    const guideButton = screen.getByRole('button', { name: '사용법 보기' });
    await user.click(guideButton);

    const dialog = await screen.findByRole('dialog', { name: '이렇게 꺼내 찾아보세요' });
    expect(dialog).toBeInTheDocument();
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(within(dialog).getAllByRole('listitem')).toHaveLength(6);
  });

  it('ESC로 닫히고 포커스가 사용법 버튼으로 돌아온다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: '사용법 보기' }));
    await screen.findByRole('dialog', { name: '이렇게 꺼내 찾아보세요' });

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: '이렇게 꺼내 찾아보세요' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '사용법 보기' })).toHaveFocus();
  });

  it('바깥 클릭으로 닫히고 포커스가 사용법 버튼으로 돌아온다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: '사용법 보기' }));
    const dialog = await screen.findByRole('dialog', { name: '이렇게 꺼내 찾아보세요' });

    fireEvent.click(dialog.parentElement!);

    expect(screen.queryByRole('dialog', { name: '이렇게 꺼내 찾아보세요' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '사용법 보기' })).toHaveFocus();
  });

  it('모바일 메뉴 드로어의 사용법 항목을 누르면 드로어가 닫히고 안내 모달이 열린다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: '메뉴 열기' }));
    const drawer = await screen.findByRole('dialog', { name: '모바일 메뉴' });
    await user.click(within(drawer).getByRole('button', { name: '사용법' }));

    expect(screen.queryByRole('dialog', { name: '모바일 메뉴' })).not.toBeInTheDocument();
    expect(await screen.findByRole('dialog', { name: '이렇게 꺼내 찾아보세요' })).toBeInTheDocument();
  });

  it('둘러보기 링크를 누르면 해당 사전 페이지로 이동하고 모달이 닫힌다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: '사용법 보기' }));
    const dialog = await screen.findByRole('dialog', { name: '이렇게 꺼내 찾아보세요' });
    await user.click(within(dialog).getByRole('link', { name: 'UI 사전 둘러보기' }));

    expect(screen.queryByRole('dialog', { name: '이렇게 꺼내 찾아보세요' })).not.toBeInTheDocument();
    expect(await screen.findByRole('heading', { level: 1, name: 'UI 요소' })).toBeInTheDocument();
  });
});
