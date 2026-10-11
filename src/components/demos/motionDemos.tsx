import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUp, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { prefersReducedMotion } from '../../hooks/useScrollEffects';
import { BrowserFrame, DemoNote, PhoneFrame, Skeletonish } from './frames';

// 움직임·스크롤 데모 — 데모 상자 "안쪽"을 스크롤하면 효과가 실제로 동작합니다.
// 모두 움직임 줄이기 설정을 존중하고, 스크롤 영역은 키보드로도 스크롤할 수 있게 포커스를 받습니다.

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function scrollRatio(element: HTMLElement): number {
  const max = element.scrollHeight - element.clientHeight;
  return max > 0 ? clamp01(element.scrollTop / max) : 0;
}

// 데모 안의 스크롤 영역. 키보드 사용자를 위해 tabIndex와 이름을 붙입니다.
function ScrollArea({
  label,
  className = 'h-56',
  onScroll,
  innerRef,
  children,
}: {
  label: string;
  className?: string;
  onScroll?: (element: HTMLDivElement) => void;
  innerRef?: React.RefObject<HTMLDivElement>;
  children: ReactNode;
}) {
  return (
    <div
      ref={innerRef}
      tabIndex={0}
      role="region"
      aria-label={label}
      onScroll={(event) => onScroll?.(event.currentTarget)}
      className={`relative overflow-y-auto overscroll-contain focus-visible:outline-offset-[-2px] ${className}`}
    >
      {children}
    </div>
  );
}

function OptionButtons<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="mb-3 flex flex-wrap gap-1.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className="pill min-h-9 px-3 text-xs"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/* ── 1. 스크롤 나타나기 ─────────────────────────────────────── */
type RevealStyle = 'up' | 'blur' | 'scale';
const revealHidden: Record<RevealStyle, string> = {
  up: 'translate-y-6 opacity-0',
  blur: 'translate-y-2 opacity-0 blur-md',
  scale: 'scale-90 opacity-0',
};

export function ScrollRevealDemo() {
  const [style, setStyle] = useState<RevealStyle>('up');
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [round, setRound] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const supported = typeof IntersectionObserver !== 'undefined' && !prefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !supported) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const shown = entries.filter((entry) => entry.isIntersecting).map((entry) => Number((entry.target as HTMLElement).dataset.index));
        if (shown.length) setRevealed((current) => new Set([...current, ...shown]));
      },
      { root, threshold: 0.3 },
    );
    root.querySelectorAll('[data-index]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [supported, round]);

  const replay = () => {
    rootRef.current?.scrollTo({ top: 0 });
    setRevealed(new Set());
    setRound((value) => value + 1);
  };

  return (
    <div>
      <OptionButtons
        label="나타나는 방식"
        value={style}
        onChange={(next) => {
          setStyle(next);
          replay();
        }}
        options={[
          { value: 'up', label: '아래에서 떠오르기' },
          { value: 'blur', label: '흐림에서 선명하게' },
          { value: 'scale', label: '작게에서 크게' },
        ]}
      />
      <BrowserFrame label="example.com/features">
        <ScrollArea label="나타나기 데모 스크롤 영역" innerRef={rootRef}>
          <div className="space-y-3 p-4">
            <p className="text-sm font-semibold">아래로 스크롤해 보세요 ↓</p>
            <div className="h-24" />
            {Array.from({ length: 6 }, (_, index) => {
              const visible = !supported || revealed.has(index);
              return (
                <div
                  key={`${round}-${index}`}
                  data-index={index}
                  style={{ transitionDelay: `${(index % 2) * 80}ms` }}
                  className={`rounded-xl border border-line bg-surface p-3 shadow-card transition-all duration-700 ease-out ${
                    visible ? 'translate-y-0 scale-100 opacity-100 blur-0' : revealHidden[style]
                  }`}
                >
                  <p className="text-sm font-semibold">기능 {index + 1}</p>
                  <Skeletonish className="mt-2 h-2 w-3/4" />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </BrowserFrame>
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        <DemoNote>
          {supported ? `카드 6개 중 ${revealed.size}개가 나타났어요.` : '움직임 줄이기 설정이라 처음부터 모두 보여요.'}
        </DemoNote>
        <button type="button" onClick={replay} className="btn-secondary min-h-9 px-3 text-xs">
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          다시 보기
        </button>
      </div>
    </div>
  );
}

/* ── 2. 패럴랙스 스크롤 ─────────────────────────────────────── */
export function ParallaxDemo() {
  const [enabled, setEnabled] = useState(!prefersReducedMotion());
  const [offset, setOffset] = useState(0);

  const layers = [
    { speed: 0.15, className: 'top-10 left-6 h-10 w-10 rounded-full bg-amber-300/80', label: '해' },
    { speed: 0.35, className: '-left-6 top-36 h-24 w-48 rounded-t-full bg-primary/25', label: '먼 산' },
    { speed: 0.6, className: '-right-8 top-40 h-28 w-56 rounded-t-full bg-primary/45', label: '가까운 산' },
  ];

  return (
    <div>
      <OptionButtons
        label="패럴랙스 켜기"
        value={enabled ? 'on' : 'off'}
        onChange={(next) => setEnabled(next === 'on')}
        options={[
          { value: 'on', label: '패럴랙스 켜기' },
          { value: 'off', label: '끄고 비교하기' },
        ]}
      />
      <BrowserFrame label="example.com">
        <ScrollArea label="패럴랙스 데모 스크롤 영역" onScroll={(element) => setOffset(element.scrollTop)}>
          <div className="relative h-[34rem] overflow-hidden bg-gradient-to-b from-primary-soft to-background">
            {layers.map((layer) => (
              <span
                key={layer.label}
                aria-hidden="true"
                className={`absolute ${layer.className}`}
                style={{ transform: `translateY(${enabled ? offset * layer.speed : 0}px)` }}
              />
            ))}
            <div className="relative z-10 p-5 pt-24 text-center">
              <p className="text-lg font-extrabold">스크롤해 보세요</p>
              <p className="mt-1 text-xs text-muted">해·먼 산·가까운 산이 서로 다른 속도로 움직여요.</p>
            </div>
            <div className="absolute inset-x-4 top-[22rem] z-10 rounded-xl border border-line bg-surface p-3 shadow-card">
              <p className="text-sm font-semibold">본문은 평소 속도로 올라와요</p>
              <Skeletonish className="mt-2 h-2 w-4/5" />
              <Skeletonish className="mt-1.5 h-2 w-2/3" />
            </div>
          </div>
        </ScrollArea>
      </BrowserFrame>
      <DemoNote>
        {enabled
          ? '켜짐: 뒤에 있는 층일수록 천천히 움직여 깊이감이 생겨요.'
          : '꺼짐: 모든 층이 함께 움직여 평평하게 느껴져요. 다시 켜서 비교해 보세요.'}
      </DemoNote>
    </div>
  );
}

/* ── 3. 스크롤 진행률 표시 ──────────────────────────────────── */
export function ScrollProgressDemo() {
  const [progress, setProgress] = useState(0);
  const [shape, setShape] = useState<'bar' | 'ring'>('bar');
  const radius = 14;
  const length = 2 * Math.PI * radius;

  return (
    <div>
      <OptionButtons
        label="표시 모양"
        value={shape}
        onChange={setShape}
        options={[
          { value: 'bar', label: '위쪽 막대' },
          { value: 'ring', label: '구석 고리' },
        ]}
      />
      <BrowserFrame label="blog.example.com/long-article">
        <div className="relative">
          {shape === 'bar' ? (
            <div aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1 bg-line/50">
              <div
                className="h-full origin-left bg-gradient-to-r from-primary to-[#ff5fae]"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 36 36" className="absolute bottom-3 right-4 z-10 h-10 w-10 -rotate-90">
              <circle cx="18" cy="18" r={radius} fill="none" strokeWidth="3" className="stroke-line" />
              <circle
                cx="18"
                cy="18"
                r={radius}
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={length}
                strokeDashoffset={length * (1 - progress)}
                className="stroke-primary"
              />
            </svg>
          )}
          <ScrollArea label="긴 글 스크롤 영역" onScroll={(element) => setProgress(scrollRatio(element))}>
            <article className="space-y-3 p-4 pt-5">
              <p className="text-base font-bold">긴 글을 읽는 중이에요</p>
              {Array.from({ length: 9 }, (_, index) => (
                <div key={index} className="space-y-1.5">
                  <Skeletonish className="h-2 w-full" />
                  <Skeletonish className="h-2 w-11/12" />
                  <Skeletonish className={`h-2 ${index % 2 ? 'w-2/3' : 'w-4/5'}`} />
                </div>
              ))}
            </article>
          </ScrollArea>
        </div>
      </BrowserFrame>
      <DemoNote>{`${Math.round(progress * 100)}% 읽었어요. ${progress >= 0.99 ? '끝까지 다 읽었어요!' : '글 영역을 스크롤해 보세요.'}`}</DemoNote>
    </div>
  );
}

/* ── 4. 맨 위로 버튼 ──────────────────────────────────────── */
export function BackToTopDemo() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [jumped, setJumped] = useState(false);
  const visible = scrollTop > 200;

  return (
    <div>
      <PhoneFrame label="쇼핑 앱 목록">
        <div className="relative">
          <ScrollArea
            label="상품 목록 스크롤 영역"
            className="h-80"
            innerRef={areaRef}
            onScroll={(element) => setScrollTop(element.scrollTop)}
          >
            <div className="sticky top-0 z-10 border-b border-line bg-surface px-3 py-2 text-xs font-semibold">
              검색: 운동화
            </div>
            <ul className="space-y-2 p-3">
              {Array.from({ length: 14 }, (_, index) => (
                <li key={index} className="flex items-center gap-2 rounded-lg border border-line bg-surface p-2">
                  <span aria-hidden="true" className="h-9 w-9 shrink-0 rounded-md bg-line/70" />
                  <span className="text-xs">상품 {index + 1}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <button
            type="button"
            aria-label="맨 위로 이동(데모)"
            tabIndex={visible ? 0 : -1}
            aria-hidden={visible ? undefined : true}
            onClick={() => {
              areaRef.current?.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
              setJumped(true);
            }}
            className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-background shadow-raised transition-all duration-300 ${
              visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
            }`}
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </PhoneFrame>
      <DemoNote>
        {visible
          ? '버튼이 나타났어요. 눌러서 맨 위로 돌아가 보세요.'
          : jumped
            ? '맨 위로 돌아왔어요. 다시 내려가면 버튼이 나타나요.'
            : '목록을 아래로 내려 보세요. 200px쯤 내려가면 버튼이 나타나요.'}
      </DemoNote>
    </div>
  );
}

/* ── 5. 스크롤 반응 헤더 ──────────────────────────────────── */
export function HideOnScrollHeaderDemo() {
  const [hidden, setHidden] = useState(false);
  const lastTop = useRef(0);

  const handleScroll = useCallback((element: HTMLDivElement) => {
    const top = element.scrollTop;
    const delta = top - lastTop.current;
    if (top < 40) setHidden(false);
    else if (delta > 4) setHidden(true);
    else if (delta < -4) setHidden(false);
    lastTop.current = top;
  }, []);

  return (
    <div>
      <PhoneFrame label="피드 앱">
        <div className="relative overflow-hidden">
          <header
            className={`absolute inset-x-0 top-0 z-10 flex h-11 items-center justify-between border-b border-line bg-surface px-3 transition-transform duration-300 ${
              hidden ? '-translate-y-full' : 'translate-y-0'
            }`}
          >
            <span className="text-sm font-extrabold">피드</span>
            <span className="text-xs text-muted">🔔 ✉️</span>
          </header>
          <ScrollArea label="피드 스크롤 영역" className="h-80" onScroll={handleScroll}>
            <div className="space-y-3 p-3 pt-14">
              {Array.from({ length: 8 }, (_, index) => (
                <div key={index} className="rounded-lg border border-line bg-surface p-2">
                  <div aria-hidden="true" className="h-16 rounded-md bg-line/60" />
                  <Skeletonish className="mt-2 h-2 w-2/3" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PhoneFrame>
      <DemoNote>
        {hidden
          ? '아래로 내리는 중이라 헤더가 숨었어요. 살짝 위로 올려 보세요.'
          : '헤더가 보여요. 피드를 아래로 내리면 위로 숨어요.'}
      </DemoNote>
    </div>
  );
}

/* ── 6. 스크롤 텍스트 리빌 ────────────────────────────────── */
const revealWords = '화면에서 본 그거, 이름을 알면 AI에게 정확하게 말할 수 있어요.'.split(' ');

export function ScrollTextRevealDemo() {
  const reduced = prefersReducedMotion();
  const [progress, setProgress] = useState(reduced ? 1 : 0);

  return (
    <div>
      <BrowserFrame label="example.com/story">
        <ScrollArea
          label="텍스트 리빌 스크롤 영역"
          onScroll={(element) => !reduced && setProgress(scrollRatio(element))}
        >
          <div className="h-[36rem]">
            <div className="sticky top-0 flex h-56 items-center px-5">
              <p className="text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">
                {revealWords.map((word, index) => (
                  <span key={index}>
                    <span
                      className="transition-opacity duration-150"
                      style={{ opacity: Math.min(1, Math.max(0.15, progress * (revealWords.length + 2) - index)) }}
                    >
                      {word}
                    </span>{' '}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </ScrollArea>
      </BrowserFrame>
      <DemoNote>
        {progress >= 0.99
          ? '문장이 모두 또렷해졌어요. 다시 위로 올려 보세요.'
          : '문장은 그대로 멈춰 있고, 스크롤한 만큼 단어가 한 개씩 진해져요.'}
      </DemoNote>
    </div>
  );
}

/* ── 7. 겹쳐 쌓이는 카드 ──────────────────────────────────── */
const stackSteps = ['검색하기', '이름 확인하기', '차이 비교하기', '프롬프트 복사하기'];
const STACK_TOP = 12;
const STACK_STEP = 12;

export function StackingCardsDemo() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [depths, setDepths] = useState<number[]>(stackSteps.map(() => 0));
  const reduced = prefersReducedMotion();

  const handleScroll = useCallback((element: HTMLDivElement) => {
    const cards = Array.from(element.querySelectorAll<HTMLElement>('[data-stack]'));
    const areaTop = element.getBoundingClientRect().top;
    const stuck = cards.map((card, index) => card.getBoundingClientRect().top - areaTop <= STACK_TOP + index * STACK_STEP + 1);
    setDepths(cards.map((_, index) => stuck.slice(index + 1).filter(Boolean).length));
  }, []);

  const stacked = depths[0];

  return (
    <div>
      <BrowserFrame label="example.com/how-it-works">
        <ScrollArea label="쌓이는 카드 스크롤 영역" className="h-64" innerRef={areaRef} onScroll={handleScroll}>
          <ol className="space-y-4 p-3 pb-40">
            {stackSteps.map((step, index) => (
              <li
                key={step}
                data-stack
                className="sticky"
                style={{ top: STACK_TOP + index * STACK_STEP }}
              >
                <div
                  className="flex h-28 items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-raised transition-transform duration-200"
                  style={{ transform: reduced ? undefined : `scale(${1 - depths[index] * 0.05})`, transformOrigin: '50% 0' }}
                >
                  <span className="font-mono text-2xl font-bold text-primary">0{index + 1}</span>
                  <span className="text-sm font-bold">{step}</span>
                </div>
              </li>
            ))}
          </ol>
        </ScrollArea>
      </BrowserFrame>
      <DemoNote>
        {stacked > 0
          ? `카드 ${stacked + 1}장이 쌓였어요. 뒤에 깔린 카드일수록 작아져요.`
          : '아래로 스크롤하면 카드가 위에 붙으며 차례로 쌓여요.'}
      </DemoNote>
    </div>
  );
}

/* ── 8. 가로 스크롤 구간 ──────────────────────────────────── */
const shelfItems = ['신상품', '베스트', '세일', '추천', '오늘만', '무료배송', '리뷰 많은', '새로 입고'];

export function HorizontalScrollDemo() {
  const [mode, setMode] = useState<'swipe' | 'pinned'>('swipe');
  const [pinnedProgress, setPinnedProgress] = useState(0);
  const [index, setIndex] = useState(0);
  const shelfRef = useRef<HTMLUListElement>(null);

  const scrollShelf = (direction: 1 | -1) => {
    const shelf = shelfRef.current;
    if (!shelf) return;
    shelf.scrollBy({ left: direction * 140, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const cards = (
    <>
      {shelfItems.map((item, cardIndex) => (
        <li key={item} className="w-32 shrink-0 snap-start">
          <div className="rounded-xl border border-line bg-surface p-2 shadow-card">
            <div aria-hidden="true" className={`h-16 rounded-lg ${cardIndex % 2 ? 'bg-line/60' : 'bg-primary-soft'}`} />
            <p className="mt-2 text-xs font-semibold">{item}</p>
          </div>
        </li>
      ))}
    </>
  );

  return (
    <div>
      <OptionButtons
        label="가로 스크롤 방식"
        value={mode}
        onChange={(next) => {
          setMode(next);
          setPinnedProgress(0);
        }}
        options={[
          { value: 'swipe', label: '옆으로 넘기기' },
          { value: 'pinned', label: '세로 스크롤 → 가로 이동' },
        ]}
      />
      <BrowserFrame label="shop.example.com">
        {mode === 'swipe' ? (
          <div className="p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold">오늘의 추천</p>
              <div className="flex gap-1">
                <button type="button" aria-label="이전 상품들" onClick={() => scrollShelf(-1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-line">
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" aria-label="다음 상품들" onClick={() => scrollShelf(1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-line">
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <ul
              ref={shelfRef}
              tabIndex={0}
              aria-label="추천 상품 가로 목록"
              onScroll={(event) => setIndex(Math.round(event.currentTarget.scrollLeft / 136))}
              className="scrollbar-none flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1"
            >
              {cards}
            </ul>
          </div>
        ) : (
          <ScrollArea label="세로 스크롤을 가로 이동으로 바꾸는 영역" onScroll={(element) => setPinnedProgress(scrollRatio(element))}>
            <div className="h-[40rem]">
              <div className="sticky top-0 flex h-56 flex-col justify-center overflow-hidden p-3">
                <p className="mb-2 text-sm font-semibold">세로로 내려 보세요 ↓</p>
                <ul
                  className="flex gap-2"
                  style={{ transform: `translateX(${-pinnedProgress * (shelfItems.length * 136 - 300)}px)` }}
                >
                  {cards}
                </ul>
              </div>
            </div>
          </ScrollArea>
        )}
      </BrowserFrame>
      <DemoNote>
        {mode === 'swipe'
          ? `옆으로 밀거나 화살표를 눌러 넘겨 보세요. 지금 ${Math.min(index + 1, shelfItems.length)}번째 카드부터 보여요.`
          : `세로 스크롤 ${Math.round(pinnedProgress * 100)}% — 아래로 내린 만큼 카드 줄이 옆으로 흘러가요.`}
      </DemoNote>
    </div>
  );
}

/* ── 9. 숫자 카운트업 ─────────────────────────────────────── */
const stats = [
  { label: '누적 학습자', value: 12840, suffix: '명' },
  { label: '완료한 레슨', value: 356, suffix: '개' },
  { label: '연속 학습', value: 42, suffix: '일' },
];

export function CountUpDemo() {
  const [values, setValues] = useState(stats.map((stat) => stat.value));
  const [running, setRunning] = useState(false);
  const frameRef = useRef(0);

  const run = useCallback(() => {
    window.cancelAnimationFrame(frameRef.current);
    if (prefersReducedMotion()) {
      setValues(stats.map((stat) => stat.value));
      return;
    }
    setRunning(true);
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const t = clamp01((now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValues(stats.map((stat) => Math.round(stat.value * eased)));
      if (t < 1) frameRef.current = window.requestAnimationFrame(tick);
      else setRunning(false);
    };
    frameRef.current = window.requestAnimationFrame(tick);
  }, []);

  // 데모가 화면에 들어왔을 때 한 번 셉니다(관찰 기능이 없으면 바로 셉니다).
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || typeof IntersectionObserver === 'undefined') {
      run();
      return () => window.cancelAnimationFrame(frameRef.current);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.5 },
    );
    observer.observe(grid);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameRef.current);
    };
  }, [run]);

  return (
    <div>
      <div ref={gridRef} className="grid grid-cols-3 gap-2">
        {stats.map((stat, index) => (
          <div key={stat.label} className="rounded-2xl border border-line bg-surface p-3 text-center shadow-card">
            {/* 보조기기에는 세는 중간값 대신 최종 값을 알려 줍니다. */}
            <p className="font-mono text-xl font-bold tracking-tighter sm:text-2xl" aria-label={`${stat.value.toLocaleString('ko-KR')}${stat.suffix}`}>
              <span aria-hidden="true">
                {values[index].toLocaleString('ko-KR')}
                <span className="ml-0.5 text-sm">{stat.suffix}</span>
              </span>
            </p>
            <p className="mt-1 text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        <DemoNote>{running ? '숫자가 0부터 세어 올라가는 중이에요.' : '화면에 들어오면 0부터 세어요. 다시 세기를 눌러 한 번 더 보세요.'}</DemoNote>
        <button type="button" onClick={run} className="btn-secondary min-h-9 px-3 text-xs">
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          다시 세기
        </button>
      </div>
    </div>
  );
}
