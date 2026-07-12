import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './renderApp';

// 성공 응답을 돌려주는 fetch 목. 지정한 modelId 요청에만 성공하고 나머지는 실패시킬 수 있습니다.
function mockGemini(options: { text?: string; okForModel?: (modelId: string) => boolean; failStatus?: number; failBody?: unknown } = {}) {
  const {
    text = '설정을 바로 켜고 끄려면 [[ui:toggle-switch]]가 알맞아요.',
    okForModel = () => true,
    failStatus = 404,
    failBody = { error: { status: 'NOT_FOUND', message: 'model not found' } },
  } = options;

  const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
    void _init;
    const modelId = url.match(/models\/([^:]+):/)?.[1] ?? '';
    if (okForModel(modelId)) {
      return {
        ok: true,
        status: 200,
        json: async () => ({ candidates: [{ content: { parts: [{ text }] } }] }),
      };
    }
    return {
      ok: false,
      status: failStatus,
      text: async () => JSON.stringify(failBody),
      json: async () => failBody,
    };
  });
  vi.stubGlobal('fetch', fetchMock as unknown as typeof fetch);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

async function openAssistant(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'VibeDic 어시스턴트 열기' }));
}

describe('VibeDic 어시스턴트', () => {
  it('플로팅 버튼이 보이고 누르면 패널이 열린다', async () => {
    const user = userEvent.setup();
    renderApp('/');
    await openAssistant(user);
    expect(screen.getByRole('dialog', { name: 'VibeDic 어시스턴트' })).toBeInTheDocument();
  });

  it('API 키가 없으면 키 연결 안내가 보인다', async () => {
    const user = userEvent.setup();
    renderApp('/');
    await openAssistant(user);
    expect(screen.getByText('Google Gemini API 키 연결')).toBeInTheDocument();
    expect(screen.getByLabelText('Gemini API 키')).toBeInTheDocument();
  });

  it('키를 저장하면 채팅 화면으로 전환되고 시작 질문이 보인다', async () => {
    const user = userEvent.setup();
    renderApp('/');
    await openAssistant(user);
    await user.type(screen.getByLabelText('Gemini API 키'), 'AIza-test-key');
    await user.click(screen.getByRole('button', { name: '연결하기' }));

    expect(screen.getByLabelText('어시스턴트에게 질문')).toBeInTheDocument();
    expect(screen.getByText('이렇게 물어보세요')).toBeInTheDocument();
    expect(window.localStorage.getItem('vibedic:gemini-api-key')).toBe('AIza-test-key');
  });

  it('질문을 보내면 답변이 표시되고 [[ui:slug]]가 사전 링크로 바뀐다', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('vibedic:gemini-api-key', 'AIza-test-key');
    const fetchMock = mockGemini();
    renderApp('/');

    await openAssistant(user);
    await user.type(screen.getByLabelText('어시스턴트에게 질문'), '알림 설정 UI 추천해줘');
    await user.click(screen.getByRole('button', { name: '질문 보내기' }));

    expect(await screen.findByText(/설정을 바로 켜고 끄려면/)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /토글 스위치/ });
    expect(link).toHaveAttribute('href', '/ui/toggle-switch');

    // 첫 시도는 체인 최상위 모델(gemini-3.1-flash-lite)이어야 합니다.
    const firstUrl = fetchMock.mock.calls[0][0] as string;
    expect(firstUrl).toContain('gemini-3.1-flash-lite');

    const body = JSON.parse(fetchMock.mock.calls[0][1]!.body as string);
    expect(body.systemInstruction.parts[0].text).toContain('VibeDic 어시스턴트');
    expect(body.contents.at(-1).parts[0].text).toBe('알림 설정 UI 추천해줘');
  });

  it('상위 모델이 없으면 다음 모델로 폴백하고 배터리에 사용 모델을 표시한다', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('vibedic:gemini-api-key', 'AIza-test-key');
    // 앞의 세 모델은 실패, gemini-2.5-flash 부터 성공
    const fetchMock = mockGemini({ okForModel: (id) => id === 'gemini-2.5-flash' });
    renderApp('/');

    await openAssistant(user);
    await user.type(screen.getByLabelText('어시스턴트에게 질문'), '버튼 추천');
    await user.click(screen.getByRole('button', { name: '질문 보내기' }));

    expect(await screen.findByText(/설정을 바로 켜고 끄려면/)).toBeInTheDocument();
    // 4번째 시도(gemini-2.5-flash)까지 호출되어야 합니다.
    expect(fetchMock.mock.calls.length).toBe(4);
    // 배터리 표시가 현재 모델을 알린다
    expect(
      screen.getByLabelText(/Gemini 2\.5 Flash로 대화 중.*5단계 중 4단계/),
    ).toBeInTheDocument();
  });

  it('키가 잘못되면 폴백하지 않고 즉시 안내한다', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('vibedic:gemini-api-key', 'bad-key');
    const fetchMock = mockGemini({
      okForModel: () => false,
      failStatus: 400,
      failBody: { error: { status: 'INVALID_ARGUMENT', message: 'API key not valid. Please pass a valid API key.' } },
    });
    renderApp('/');

    await openAssistant(user);
    await user.type(screen.getByLabelText('어시스턴트에게 질문'), '버튼 추천');
    await user.click(screen.getByRole('button', { name: '질문 보내기' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('API 키가 올바르지 않아요');
    // 키 오류는 첫 모델에서 즉시 중단되어야 합니다.
    expect(fetchMock.mock.calls.length).toBe(1);
  });

  it('닫기 버튼으로 패널을 닫을 수 있다', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('vibedic:gemini-api-key', 'AIza-test-key');
    renderApp('/');

    await openAssistant(user);
    const dialog = screen.getByRole('dialog', { name: 'VibeDic 어시스턴트' });
    await user.click(within(dialog).getByRole('button', { name: '어시스턴트 닫기' }));
    expect(screen.queryByRole('dialog', { name: 'VibeDic 어시스턴트' })).not.toBeInTheDocument();
  });
});
