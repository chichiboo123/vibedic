import { getSystemPrompt } from './prompt';

export type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

// 호출 우선순위 체인. 앞쪽(최신·상위) 모델부터 시도하고,
// 사용할 수 없으면(모델 미출시·권한 없음·할당량·서버 오류) 다음으로 넘어갑니다.
// index 0 이 최상위(배터리 가득), 마지막이 최하위(배터리 최소)입니다.
export const MODEL_CHAIN = [
  { id: 'gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash Lite' },
  { id: 'gemini-3.5-flash', label: 'Gemini 3.5 Flash' },
  { id: 'gemini-3-flash', label: 'Gemini 3 Flash' },
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
  { id: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite' },
] as const;

const API_KEY_STORAGE = 'vibedic:gemini-api-key';

// 빌드 시 주입되는 환경변수(VITE_GEMINI_API_KEY)를 우선 사용합니다.
const ENV_API_KEY = (import.meta.env.VITE_GEMINI_API_KEY ?? '').trim();

export function hasEnvApiKey(): boolean {
  return ENV_API_KEY.length > 0;
}

// 환경변수 키가 있으면 그것을, 없으면 사용자가 직접 입력해 저장한 키를 씁니다.
export function getApiKey(): string {
  if (ENV_API_KEY) return ENV_API_KEY;
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

export type GeminiErrorKind = 'auth' | 'quota' | 'model' | 'server' | 'network' | 'unknown';

export class GeminiError extends Error {
  constructor(
    message: string,
    public readonly kind: GeminiErrorKind,
  ) {
    super(message);
    this.name = 'GeminiError';
  }
}

export type SendResult = {
  text: string;
  modelIndex: number;
  modelLabel: string;
};

type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  error?: { code?: number; status?: string; message?: string };
};

function looksLikeInvalidKey(status: number, bodyText: string): boolean {
  const lower = bodyText.toLowerCase();
  return (
    lower.includes('api_key_invalid') ||
    lower.includes('api key not valid') ||
    lower.includes('api key expired') ||
    (status === 403 && lower.includes('permission') && lower.includes('api key'))
  );
}

// 모델 하나를 호출합니다. 성공 시 응답 텍스트를 반환하고, 실패 시 GeminiError를 던집니다.
async function callModel(modelId: string, apiKey: string, history: ChatMessage[]): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${encodeURIComponent(apiKey)}`;

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
        generationConfig: { temperature: 0.6, maxOutputTokens: 1024 },
      }),
    });
  } catch {
    throw new GeminiError('네트워크 연결을 확인해 주세요.', 'network');
  }

  if (!response.ok) {
    const bodyText = await response.text().catch(() => '');
    // 키 자체가 잘못된 경우는 어떤 모델로 바꿔도 동일하므로 폴백하지 않고 즉시 중단합니다.
    if (looksLikeInvalidKey(response.status, bodyText)) {
      throw new GeminiError('API 키가 올바르지 않아요. 키를 다시 확인해 주세요.', 'auth');
    }
    if (response.status === 404 || response.status === 400) {
      // 모델이 아직 없거나 이 키로 접근할 수 없음 → 다음 모델로 폴백
      throw new GeminiError(`${modelId} 모델을 사용할 수 없어요.`, 'model');
    }
    if (response.status === 403) {
      throw new GeminiError(`${modelId} 모델에 접근할 수 없어요.`, 'model');
    }
    if (response.status === 429) {
      throw new GeminiError('요청이 많아요.', 'quota');
    }
    throw new GeminiError(`응답에 실패했어요. (오류 코드 ${response.status})`, 'server');
  }

  const data = (await response.json()) as GeminiResponse;
  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? '')
    .join('')
    .trim();

  if (!text) {
    throw new GeminiError('빈 응답을 받았어요.', 'server');
  }
  return text;
}

// 모델 체인을 순서대로 시도합니다.
// onAttempt 는 각 모델을 시도하기 직전에 호출되어, UI가 "지금 어떤 모델로 대화 중"인지 표시할 수 있게 합니다.
export async function sendToGemini(
  apiKey: string,
  history: ChatMessage[],
  onAttempt?: (modelIndex: number) => void,
): Promise<SendResult> {
  let lastError: GeminiError = new GeminiError('사용 가능한 모델이 없어요.', 'unknown');

  for (let index = 0; index < MODEL_CHAIN.length; index += 1) {
    const model = MODEL_CHAIN[index];
    onAttempt?.(index);
    try {
      const text = await callModel(model.id, apiKey, history);
      return { text, modelIndex: index, modelLabel: model.label };
    } catch (error) {
      if (error instanceof GeminiError) {
        // 키 오류는 폴백해도 소용없으므로 즉시 중단합니다.
        if (error.kind === 'auth') throw error;
        lastError = error;
        continue;
      }
      lastError = new GeminiError('알 수 없는 문제가 생겼어요.', 'unknown');
    }
  }

  // 모든 모델이 실패한 경우
  if (lastError.kind === 'quota') {
    throw new GeminiError('모든 모델의 요청 한도에 도달했어요. 잠시 후 다시 시도해 주세요.', 'quota');
  }
  if (lastError.kind === 'network') {
    throw new GeminiError('네트워크 연결을 확인해 주세요.', 'network');
  }
  throw new GeminiError('지금은 응답할 수 있는 모델이 없어요. 잠시 후 다시 시도해 주세요.', lastError.kind);
}
