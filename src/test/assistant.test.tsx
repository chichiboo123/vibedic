import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './renderApp';

function mockGeminiReply(text: string) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      candidates: [{ content: { parts: [{ text }] } }],
    }),
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('VibeDic 어시스턴트', () => {
  it('플로팅 버튼이 보이고 누르면 패널이 열린다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    const fab = screen.getByRole('button', { name: 'VibeDic 어시스턴트 열기' });
    await user.click(fab);
    expect(screen.getByRole('dialog', { name: 'VibeDic 어시스턴트' })).toBeInTheDocument();
  });

  it('API 키가 없으면 키 연결 안내가 보인다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: 'VibeDic 어시스턴트 열기' }));
    expect(screen.getByText('Google Gemini API 키 연결')).toBeInTheDocument();
    expect(screen.getByLabelText('Gemini API 키')).toBeInTheDocument();
  });

  it('키를 저장하면 채팅 화면으로 전환되고 시작 질문이 보인다', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: 'VibeDic 어시스턴트 열기' }));
    await user.type(screen.getByLabelText('Gemini API 키'), 'AIza-test-key');
    await user.click(screen.getByRole('button', { name: '연결하기' }));

    expect(screen.getByLabelText('어시스턴트에게 질문')).toBeInTheDocument();
    expect(screen.getByText('이렇게 물어보세요')).toBeInTheDocument();
    expect(window.localStorage.getItem('vibedic:gemini-api-key')).toBe('AIza-test-key');
  });

  it('질문을 보내면 답변이 표시되고 [[ui:slug]]가 사전 링크로 바뀐다', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('vibedic:gemini-api-key', 'AIza-test-key');
    const fetchMock = mockGeminiReply(
      '설정을 바로 켜고 끄려면 [[ui:toggle-switch]]가 알맞아요.',
    );
    renderApp('/');

    await user.click(screen.getByRole('button', { name: 'VibeDic 어시스턴트 열기' }));
    await user.type(screen.getByLabelText('어시스턴트에게 질문'), '알림 설정 UI 추천해줘');
    await user.click(screen.getByRole('button', { name: '질문 보내기' }));

    expect(await screen.findByText(/설정을 바로 켜고 끄려면/)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /토글 스위치/ });
    expect(link).toHaveAttribute('href', '/ui/toggle-switch');
    expect(fetchMock).toHaveBeenCalledOnce();

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body.systemInstruction.parts[0].text).toContain('VibeDic 어시스턴트');
    expect(body.systemInstruction.parts[0].text).toContain('ui:toggle-switch');
    expect(body.contents.at(-1).parts[0].text).toBe('알림 설정 UI 추천해줘');
  });

  it('API 오류 시 안내가 표시되고 입력이 복원된다', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('vibedic:gemini-api-key', 'bad-key');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 403, json: async () => ({}) }),
    );
    renderApp('/');

    await user.click(screen.getByRole('button', { name: 'VibeDic 어시스턴트 열기' }));
    await user.type(screen.getByLabelText('어시스턴트에게 질문'), '버튼 추천');
    await user.click(screen.getByRole('button', { name: '질문 보내기' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('API 키가 올바르지 않아요');
  });
});
