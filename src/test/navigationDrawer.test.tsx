import { describe, expect, it } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './renderApp';

describe('내비게이션 드로어', () => {
  it('햄버거 버튼을 누르면 드로어가 열리고 포커스가 안으로 이동한다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    const hamburger = screen.getByRole('button', { name: '메뉴 열기' });
    await user.click(hamburger);

    const dialog = await screen.findByRole('dialog', { name: '모바일 메뉴' });
    expect(dialog).toBeInTheDocument();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it('ESC로 닫히고 포커스가 햄버거 버튼으로 돌아온다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    const hamburger = screen.getByRole('button', { name: '메뉴 열기' });
    await user.click(hamburger);
    await screen.findByRole('dialog', { name: '모바일 메뉴' });

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: '모바일 메뉴' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '메뉴 열기' })).toHaveFocus();
  });

  it('바깥(배경) 클릭으로 닫히고 포커스가 햄버거 버튼으로 돌아온다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    const hamburger = screen.getByRole('button', { name: '메뉴 열기' });
    await user.click(hamburger);
    const dialog = await screen.findByRole('dialog', { name: '모바일 메뉴' });

    // 드로어를 감싸는 배경(backdrop) 요소를 직접 클릭해 바깥 클릭을 재현합니다.
    fireEvent.click(dialog.parentElement!);

    expect(screen.queryByRole('dialog', { name: '모바일 메뉴' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '메뉴 열기' })).toHaveFocus();
  });

  it('닫기 버튼을 누르면 닫히고 포커스가 햄버거 버튼으로 돌아온다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: '메뉴 열기' }));
    const dialog = await screen.findByRole('dialog', { name: '모바일 메뉴' });
    await user.click(within(dialog).getByRole('button', { name: '메뉴 닫기' }));

    expect(screen.queryByRole('dialog', { name: '모바일 메뉴' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '메뉴 열기' })).toHaveFocus();
  });

  it('메뉴 항목을 누르면 해당 페이지로 이동하고 드로어가 닫힌다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: '메뉴 열기' }));
    const dialog = await screen.findByRole('dialog', { name: '모바일 메뉴' });
    await user.click(within(dialog).getByRole('link', { name: 'UI 요소' }));

    expect(screen.queryByRole('dialog', { name: '모바일 메뉴' })).not.toBeInTheDocument();
    expect(await screen.findByRole('heading', { level: 1, name: 'UI 요소' })).toBeInTheDocument();
  });
});
