import { useId, useState } from 'react';
import { AlertTriangle, Bell, HelpCircle, Inbox, Mail, RefreshCw, X } from 'lucide-react';
import { useToast } from '../common/ToastProvider';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { DemoNote, PhoneFrame, Skeletonish } from './frames';

// 상태 알려주기(status) 요소 데모 — 지금 무슨 일이 벌어지는지 보여 주는 요소들입니다.

export function PopoverDemo() {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState('무료');
  const popoverId = useId();

  return (
    <div
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false);
      }}
    >
      <div className="relative w-fit">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={popoverId}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-11 items-center gap-1.5 rounded-lg border border-line bg-surface px-4 text-sm font-semibold hover:bg-background"
        >
          <HelpCircle className="h-4 w-4 text-muted" aria-hidden="true" />
          요금제 안내 보기
        </button>
        {open && (
          <div
            id={popoverId}
            role="dialog"
            aria-label="요금제 안내"
            className="absolute left-0 top-full z-10 mt-2 w-64 rounded-card border border-line bg-surface p-3 shadow-raised"
          >
            <span
              aria-hidden="true"
              className="absolute -top-1.5 left-6 h-3 w-3 rotate-45 border-l border-t border-line bg-surface"
            />
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-bold">요금제를 골라 보세요</p>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted hover:bg-background"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-1 text-xs text-muted">
              팝오버 안에는 이렇게 버튼이나 링크를 넣을 수 있어요. 툴팁과 다른 점입니다.
            </p>
            <div className="mt-2 flex gap-1.5">
              {['무료', '프로'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setPlan(option);
                    setOpen(false);
                  }}
                  className={`min-h-10 flex-1 rounded-lg border px-2 text-xs font-semibold ${
                    plan === option ? 'border-primary bg-primary-soft text-primary-strong' : 'border-line'
                  }`}
                >
                  {option} 요금제
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <DemoNote>
        지금 선택한 요금제는 ‘{plan}’이에요. 팝오버는 클릭으로 열리고 안에서 조작까지 할 수 있습니다.
      </DemoNote>
    </div>
  );
}

const filterOptions = ['안 읽음', '첨부 있음', '별표', '최근 7일'];

export function DrawerDemo() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<string[]>(['안 읽음']);
  const trapRef = useFocusTrap<HTMLDivElement>(open, () => setOpen(false));
  const groupId = useId();

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="min-h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
      >
        필터 서랍 열기
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-label="검색 필터"
            className="flex h-full w-72 max-w-[85vw] flex-col bg-surface p-4 shadow-raised"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold">검색 필터</h3>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-background"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-1 text-sm text-muted">
              드로어는 모달과 달리 옆에서 밀려 나와, 뒤 목록을 보면서 조건을 조절해요.
            </p>
            <fieldset className="mt-4 flex-1">
              <legend className="text-sm font-semibold">조건</legend>
              <div className="mt-2 space-y-1">
                {filterOptions.map((option, index) => (
                  <label
                    key={option}
                    htmlFor={`${groupId}-${index}`}
                    className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-2 hover:bg-background"
                  >
                    <input
                      id={`${groupId}-${index}`}
                      type="checkbox"
                      checked={checked.includes(option)}
                      onChange={() =>
                        setChecked((current) =>
                          current.includes(option)
                            ? current.filter((item) => item !== option)
                            : [...current, option],
                        )
                      }
                      className="h-4.5 w-4.5 accent-[var(--color-primary)]"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              {checked.length}개 조건 적용하기
            </button>
          </div>
        </div>
      )}
      <DemoNote>
        {checked.length > 0 ? `적용된 조건: ${checked.join(' · ')}` : '조건을 하나도 켜지 않았어요.'}
      </DemoNote>
    </div>
  );
}

const bannerVariants = [
  {
    id: 'warning',
    tone: 'border-amber-300 bg-amber-50 text-amber-900',
    icon: AlertTriangle,
    title: '인터넷 연결이 불안정해요',
    body: '작성 중인 내용은 기기에 임시 저장됩니다.',
    action: '다시 연결',
  },
  {
    id: 'info',
    tone: 'border-sky-300 bg-sky-50 text-sky-900',
    icon: Bell,
    title: '7월 31일 새벽 2시에 점검이 있어요',
    body: '약 30분 동안 저장이 잠시 멈출 수 있어요.',
    action: '자세히',
  },
];

export function BannerDemo() {
  const [index, setIndex] = useState(0);
  const [closed, setClosed] = useState(false);
  const variant = bannerVariants[index];
  const { showToast } = useToast();

  return (
    <div>
      {closed ? (
        <div className="rounded-card border border-dashed border-line p-4 text-center">
          <p className="text-sm text-muted">배너를 닫았어요.</p>
          <button
            type="button"
            onClick={() => setClosed(false)}
            className="mt-2 min-h-11 rounded-lg border border-line bg-surface px-4 text-sm font-semibold hover:bg-background"
          >
            다시 보이기
          </button>
        </div>
      ) : (
        <div role="status" className={`flex items-start gap-2.5 rounded-card border p-3.5 ${variant.tone}`}>
          <variant.icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{variant.title}</p>
            <p className="mt-0.5 text-xs">{variant.body}</p>
            <button
              type="button"
              onClick={() => showToast(`${variant.action}을(를) 실행했어요.`)}
              className="mt-2 min-h-9 rounded-md bg-white/70 px-2.5 text-xs font-semibold underline-offset-2 hover:underline"
            >
              {variant.action}
            </button>
          </div>
          <button
            type="button"
            aria-label="배너 닫기"
            onClick={() => setClosed(true)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md hover:bg-black/5"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          setIndex((value) => (value + 1) % bannerVariants.length);
          setClosed(false);
        }}
        className="mt-3 min-h-11 rounded-lg border border-line bg-surface px-4 text-sm font-semibold hover:bg-background"
      >
        다른 종류의 배너 보기
      </button>
      <DemoNote>
        배너는 토스트와 달리 사용자가 닫기 전까지 화면에 남아 있어요.
      </DemoNote>
    </div>
  );
}

export function SpinnerDemo() {
  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);
  const { showToast } = useToast();

  const start = () => {
    setLoading(true);
    setSlow(false);
    const slowTimer = window.setTimeout(() => setSlow(true), 1500);
    window.setTimeout(() => {
      window.clearTimeout(slowTimer);
      setLoading(false);
      setSlow(false);
      showToast('목록을 새로 불러왔어요.');
    }, 3200);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={start}
          disabled={loading}
          className="flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
        >
          {loading && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          )}
          {loading ? '불러오는 중…' : '목록 새로 고침'}
        </button>
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-[3px] border-line border-t-primary"
          />
          <span
            aria-hidden="true"
            className="h-9 w-9 animate-spin rounded-full border-4 border-line border-t-primary"
          />
          <span className="text-xs text-muted">크기 예시</span>
        </div>
      </div>

      <div className="mt-3 min-h-24 rounded-card border border-line bg-background p-4">
        {loading ? (
          <div className="flex flex-col items-center gap-2 py-2" role="status" aria-live="polite">
            <RefreshCw className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
            <p className="text-sm">불러오는 중이에요…</p>
            {slow && (
              <p className="text-xs text-muted">평소보다 오래 걸리고 있어요. 조금만 기다려 주세요.</p>
            )}
          </div>
        ) : (
          <ul className="space-y-2 text-sm">
            {['주간 회의 안내', '결제 영수증', '새 댓글 알림'].map((row) => (
              <li key={row} className="rounded-md bg-surface px-3 py-2">
                {row}
              </li>
            ))}
          </ul>
        )}
      </div>
      <DemoNote>
        {loading
          ? '스피너는 “얼마나 남았는지” 알 수 없을 때 씁니다. 오래 걸리면 안내 문구를 덧붙여요.'
          : '버튼을 눌러 3초 정도 걸리는 불러오기를 실행해 보세요.'}
      </DemoNote>
    </div>
  );
}

export function EmptyStateDemo() {
  const [state, setState] = useState<'first' | 'no-result' | 'filled'>('first');

  return (
    <div>
      <div role="group" aria-label="상황 선택" className="mb-3 flex flex-wrap gap-2">
        {[
          { label: '처음 왔을 때', value: 'first' as const },
          { label: '검색 결과 없음', value: 'no-result' as const },
          { label: '내용이 있을 때', value: 'filled' as const },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={state === option.value}
            onClick={() => setState(option.value)}
            className={`min-h-10 rounded-full border px-3.5 text-sm ${
              state === option.value
                ? 'border-primary bg-primary-soft font-semibold text-primary-strong'
                : 'border-line bg-surface text-muted hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="rounded-card border border-line bg-surface p-6">
        {state === 'first' && (
          <div className="text-center">
            <Inbox className="mx-auto h-10 w-10 text-muted" aria-hidden="true" />
            <p className="mt-2 font-semibold">아직 저장한 항목이 없어요</p>
            <p className="mt-1 text-sm text-muted">마음에 드는 항목의 별표를 누르면 여기에 모입니다.</p>
            <button
              type="button"
              onClick={() => setState('filled')}
              className="mt-3 min-h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              둘러보러 가기
            </button>
          </div>
        )}
        {state === 'no-result' && (
          <div className="text-center">
            <Mail className="mx-auto h-10 w-10 text-muted" aria-hidden="true" />
            <p className="mt-2 font-semibold">“체크박수”에 대한 결과가 없어요</p>
            <p className="mt-1 text-sm text-muted">철자를 바꾸거나 조건을 줄여 보세요.</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setState('filled')}
                className="min-h-11 rounded-lg border border-line px-4 text-sm font-semibold hover:bg-background"
              >
                ‘체크박스’로 검색
              </button>
              <button
                type="button"
                onClick={() => setState('first')}
                className="min-h-11 rounded-lg border border-line px-4 text-sm font-semibold hover:bg-background"
              >
                조건 초기화
              </button>
            </div>
          </div>
        )}
        {state === 'filled' && (
          <ul className="space-y-2">
            {['체크박스', '토글 스위치', '토스트'].map((row) => (
              <li key={row} className="flex items-center gap-2 rounded-md bg-background px-3 py-2.5 text-sm">
                <span aria-hidden="true">⭐</span>
                {row}
              </li>
            ))}
          </ul>
        )}
      </div>
      <DemoNote>
        {state === 'filled'
          ? '내용이 채워지면 빈 상태는 사라집니다.'
          : '빈 화면에는 이유와 다음에 할 일을 함께 적어 주는 게 좋아요.'}
      </DemoNote>
    </div>
  );
}

export function NotificationBadgeDemo() {
  const [count, setCount] = useState(3);
  const display = count > 99 ? '99+' : String(count);

  return (
    <div>
      <PhoneFrame label="모바일 앱 화면">
        <div className="flex h-52 flex-col bg-background">
          <div className="flex items-center justify-between border-b border-line bg-surface px-3 py-2.5">
            <span className="text-sm font-semibold">홈</span>
            <span className="relative">
              <Bell className="h-5 w-5 text-muted" aria-hidden="true" />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[9px] font-bold text-white">
                  {display}
                </span>
              )}
            </span>
          </div>
          <div className="flex-1 space-y-2 p-3">
            <Skeletonish className="h-3 w-2/3" />
            <Skeletonish className="h-3 w-full" />
            <Skeletonish className="h-3 w-1/2" />
          </div>
          <nav aria-label="하단 내비게이션" className="flex border-t border-line bg-surface">
            {[
              { label: '홈', icon: '🏠', badge: 0 },
              { label: '알림', icon: '🔔', badge: count },
              { label: '마이', icon: '👤', badge: 0 },
            ].map((tab) => (
              <span
                key={tab.label}
                className="relative flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] text-muted"
              >
                <span aria-hidden="true" className="text-base">
                  {tab.icon}
                </span>
                {tab.label}
                {tab.badge > 0 && (
                  <span className="absolute right-1/2 top-1 translate-x-3.5 rounded-full bg-error px-1 text-[8px] font-bold text-white">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </PhoneFrame>
      <p className="sr-only" role="status">
        읽지 않은 알림 {count}개
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="min-h-11 rounded-lg border border-line bg-surface px-4 text-sm font-semibold hover:bg-background"
        >
          알림 1개 늘리기
        </button>
        <button
          type="button"
          onClick={() => setCount(120)}
          className="min-h-11 rounded-lg border border-line bg-surface px-4 text-sm font-semibold hover:bg-background"
        >
          100개 넘겨 보기
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="min-h-11 rounded-lg border border-line bg-surface px-4 text-sm font-semibold hover:bg-background"
        >
          모두 읽음
        </button>
      </div>
      <DemoNote>
        {count === 0
          ? '읽을 알림이 없으면 배지를 아예 없애 화면을 조용하게 둡니다.'
          : `읽지 않은 알림 ${count}개. 100개가 넘으면 ‘99+’로 줄여서 보여 줘요.`}
      </DemoNote>
    </div>
  );
}
