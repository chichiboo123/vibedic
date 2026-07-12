import { getSystemPrompt } from './prompt';

export type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

const API_KEY_STORAGE = 'vibedic:gemini-api-key';
export const GEMINI_MODEL = 'gemini-2.5-flash';

export function getStoredApiKey(): string {
  try {
    return window.localStorage.getItem(API_KEY_STORAGE) ?? '';
  } catch {
    return '';
  }
}

export function setStoredApiKey(key: string): void {
  try {
    if (key) window.localStorage.setItem(API_KEY_STORAGE, key);
    else window.localStorage.removeItem(API_KEY_STORAGE);
  } catch {
    // localStorage를 쓸 수 없는 환경에서는 키가 세션 동안만 유지됩니다.
  }
}

export class GeminiError extends Error {
  constructor(
    message: string,
    public readonly kind: 'auth' | 'quota' | 'network' | 'unknown',
  ) {
    super(message);
    this.name = 'GeminiError';
  }
}

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
  error?: { message?: string };
};

// 브라우저에서 Google Generative Language API를 직접 호출합니다.
// 키는 사용자의 브라우저(localStorage)에만 저장되며 서버를 거치지 않습니다.
export async function sendToGemini(apiKey: string, history: ChatMessage[]): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: getSystemPrompt() }] },
        contents: history.map((message) => ({
          role: message.role === 'user' ? 'user' : 'model',
          parts: [{ text: message.text }],
        })),
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 1024,
        },
      }),
    });
  } catch {
    throw new GeminiError('네트워크 연결을 확인해 주세요.', 'network');
  }

  if (!response.ok) {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      throw new GeminiError('API 키가 올바르지 않아요. 키를 다시 확인해 주세요.', 'auth');
    }
    if (response.status === 429) {
      throw new GeminiError('요청이 너무 많아요. 잠시 후 다시 시도해 주세요.', 'quota');
    }
    throw new GeminiError(`응답에 실패했어요. (오류 코드 ${response.status})`, 'unknown');
  }

  const data = (await response.json()) as GeminiResponse;
  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? '')
    .join('')
    .trim();

  if (!text) {
    throw new GeminiError('빈 응답을 받았어요. 질문을 바꿔 다시 시도해 주세요.', 'unknown');
  }
  return text;
}
