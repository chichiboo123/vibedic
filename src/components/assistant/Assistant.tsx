import { useEffect, useRef, useState } from 'react';
import { Bot, ExternalLink, KeyRound, Send, Settings2, Sparkles, X } from 'lucide-react';
import {
  GeminiError,
  getApiKey,
  hasEnvApiKey,
  sendToGemini,
  setStoredApiKey,
  type ChatMessage,
} from '../../assistant/gemini';
import { AssistantText } from './AssistantText';
import { ModelBattery } from './ModelBattery';

const starterQuestions = [
  '회원가입 화면에는 어떤 UI가 필요해?',
  '목록에서 항목을 지울 때 실수를 막으려면?',
  '모바일에서 필터는 어떻게 보여주는 게 좋아?',
  '화면 아래에서 올라오는 메뉴 이름이 뭐야?',
];

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  text: '안녕하세요! VibeDic 어시스턴트예요.\n만들고 싶은 화면이나 궁금한 UI·UX를 편하게 물어보세요. 사전에서 알맞은 항목을 골라 추천해 드릴게요.',
};

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => getApiKey());
  const envKey = hasEnvApiKey();
  const [showSettings, setShowSettings] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  // 현재(또는 마지막으로) 대화에 사용한 모델의 체인 인덱스. null이면 아직 호출 전.
  const [modelIndex, setModelIndex] = useState<number | null>(null);

  const fabRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, apiKey, showSettings]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        fabRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  // 환경변수 키가 있으면 항상 설정된 상태, 없으면 사용자가 입력해야 합니다.
  const needsKey = !apiKey || (!envKey && showSettings);

  const closePanel = () => {
    setOpen(false);
    fabRef.current?.focus();
  };

  const saveKey = () => {
    const trimmed = keyInput.trim();
    if (!trimmed) return;
    setStoredApiKey(trimmed);
    setApiKey(trimmed);
    setKeyInput('');
    setShowSettings(false);
    setErrorText('');
  };

  const send = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || loading || !apiKey) return;
    setErrorText('');
    setInput('');
    const nextHistory: ChatMessage[] = [...messages, { role: 'user', text }];
    setMessages(nextHistory);
    setLoading(true);
    try {
      // 환영 인사는 API 히스토리에서 제외합니다.
      // onAttempt로 시도 중인 모델을 실시간 반영해 배터리 표시가 폴백을 따라 내려갑니다.
      const result = await sendToGemini(apiKey, nextHistory.slice(1), (index) =>
        setModelIndex(index),
      );
      setModelIndex(result.modelIndex);
      setMessages((current) => [...current, { role: 'assistant', text: result.text }]);
    } catch (error) {
      if (error instanceof GeminiError) {
        setErrorText(error.message);
        if (error.kind === 'auth' && !envKey) setShowSettings(true);
      } else {
        setErrorText('알 수 없는 문제가 생겼어요. 다시 시도해 주세요.');
      }
      // 실패한 질문은 입력창에 되살려 다시 보낼 수 있게 합니다.
      setMessages((current) => current.slice(0, -1));
      setInput(text);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        aria-label={open ? 'VibeDic 어시스턴트 닫기' : 'VibeDic 어시스턴트 열기'}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-raised transition-colors hover:bg-primary-hover"
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Bot className="h-7 w-7" aria-hidden="true" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="VibeDic 어시스턴트"
          className="fixed inset-x-2 bottom-20 top-16 z-50 flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-raised sm:inset-auto sm:bottom-20 sm:right-4 sm:top-auto sm:h-[min(36rem,calc(100dvh-7rem))] sm:w-[24rem]"
        >
          <header className="flex items-center gap-2 border-b border-line bg-primary-soft/60 px-4 py-3">
            <Sparkles className="h-4 w-4 shrink-0 text-primary-strong" aria-hidden="true" />
            <h2 className="text-sm font-bold">VibeDic 어시스턴트</h2>
            {!needsKey && modelIndex !== null ? (
              <ModelBattery modelIndex={modelIndex} />
            ) : (
              <span className="ml-auto rounded-full bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-muted">
                Gemini
              </span>
            )}
            {apiKey && !envKey && (
              <button
                type="button"
                aria-label="API 키 설정"
                onClick={() => setShowSettings((current) => !current)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-ink"
              >
                <Settings2 className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              aria-label="어시스턴트 닫기"
              onClick={closePanel}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </header>

          {needsKey ? (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <KeyRound className="h-4 w-4 text-primary" aria-hidden="true" />
                Google Gemini API 키 연결
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                어시스턴트는 Google Gemini API로 동작해요. 키는{' '}
                <strong className="text-ink">내 브라우저에만 저장</strong>되고, 질문은 브라우저에서
                Google로 직접 전송돼요. VibeDic 서버는 없어요.
              </p>
              <p className="mt-2 rounded-md bg-primary-soft/60 px-3 py-2 text-xs leading-relaxed text-muted">
                배포 환경에서는 관리자가 <code className="font-mono">VITE_GEMINI_API_KEY</code>{' '}
                환경변수로 키를 넣을 수 있어요. 아래 입력은 그 값이 없을 때 쓰는 개인용 방법이에요.
              </p>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted">
                <li>
                  <a
                    href="https://aistudio.google.com/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-medium text-primary-strong hover:underline"
                  >
                    Google AI Studio
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">(새 창에서 열림)</span>
                  </a>
                  에서 무료 API 키를 만들어요.
                </li>
                <li>만든 키를 아래에 붙여 넣어요.</li>
              </ol>
              <form
                className="mt-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  saveKey();
                }}
              >
                <label htmlFor="gemini-key" className="sr-only">
                  Gemini API 키
                </label>
                <input
                  id="gemini-key"
                  type="password"
                  value={keyInput}
                  onChange={(event) => setKeyInput(event.target.value)}
                  placeholder="AIza로 시작하는 API 키"
                  autoComplete="off"
                  className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
                />
                <div className="mt-2 flex gap-2">
                  <button
                    type="submit"
                    disabled={!keyInput.trim()}
                    className="min-h-11 flex-1 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50"
                  >
                    연결하기
                  </button>
                  {apiKey && (
                    <button
                      type="button"
                      onClick={() => {
                        setStoredApiKey('');
                        setApiKey('');
                        setShowSettings(false);
                      }}
                      className="min-h-11 rounded-lg border border-line px-3 text-sm text-muted hover:text-error"
                    >
                      키 삭제
                    </button>
                  )}
                </div>
              </form>
              {errorText && (
                <p role="alert" className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-error dark:bg-red-950/40">
                  {errorText}
                </p>
              )}
            </div>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
                {messages.map((message, index) =>
                  message.role === 'user' ? (
                    <div key={index} className="flex justify-end">
                      <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-white">
                        {message.text}
                      </p>
                    </div>
                  ) : (
                    <div key={index} className="flex justify-start">
                      <div className="max-w-[92%] rounded-2xl rounded-bl-sm border border-line bg-background px-3.5 py-2.5">
                        <AssistantText text={message.text} />
                      </div>
                    </div>
                  ),
                )}
                {loading && (
                  <div className="flex items-center gap-2 text-sm text-muted" role="status">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-primary" aria-hidden="true" />
                    {modelIndex !== null
                      ? `${['Gemini 3.1 Flash Lite', 'Gemini 3.5 Flash', 'Gemini 3 Flash', 'Gemini 2.5 Flash', 'Gemini 2.5 Flash Lite'][modelIndex]}로 답변을 만들고 있어요…`
                      : '답변을 만들고 있어요…'}
                  </div>
                )}
                {messages.length === 1 && !loading && (
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-muted">이렇게 물어보세요</p>
                    {starterQuestions.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => send(question)}
                        className="block w-full rounded-lg border border-line bg-surface px-3 py-2 text-left text-sm text-muted hover:border-primary hover:text-primary-strong"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}
                {errorText && (
                  <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-error dark:bg-red-950/40">
                    {errorText}
                  </p>
                )}
              </div>
              <form
                className="flex items-end gap-2 border-t border-line p-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  send(input);
                }}
              >
                <label htmlFor="assistant-input" className="sr-only">
                  어시스턴트에게 질문
                </label>
                <textarea
                  id="assistant-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                      event.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="만들고 싶은 화면을 설명해 보세요"
                  className="max-h-24 min-h-11 flex-1 resize-none rounded-lg border border-line bg-surface px-3 py-2.5 text-sm"
                />
                <button
                  type="submit"
                  aria-label="질문 보내기"
                  disabled={!input.trim() || loading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-hover disabled:opacity-50"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
