import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Search, Smartphone, Tablet } from 'lucide-react';
import { uxCategories } from '../../data/categories';
import { uxPatterns } from '../../data/uxPatterns';
import { uxCategoryVisuals } from '../dictionary/categoryVisuals';
import { onScrollFrame, prefersReducedMotion, useElementProgress } from '../../hooks/useScrollEffects';

/* ────────────────────────────────────────────────────────────
 * 1) 스크롤 텍스트 리빌: 화면에 고정된 문장이 스크롤에 맞춰 한 단어씩 또렷해집니다.
 * ──────────────────────────────────────────────────────────── */
const statement: { text: string; accent?: boolean }[] = [
  { text: '화면에서' },
  { text: '본' },
  { text: '“그거”,' },
  { text: '이름을', accent: true },
  { text: '알면', accent: true },
  { text: 'AI에게' },
  { text: '정확하게' },
  { text: '말할' },
  { text: '수' },
  { text: '있어요.' },
  { text: '이름을' },
  { text: '찾고,' },
  { text: '차이를' },
  { text: '이해하고,' },
  { text: '바로' },
  { text: '쓰는' },
  { text: '프롬프트로', accent: true },
  { text: '가져가세요.' },
];

export function ScrollStatement() {
  const ref = useElementProgress<HTMLElement>('pinned');
  return (
    <section ref={ref} aria-label="VibeDic이 하는 일" className="relative h-[130vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div>
          <p className="eyebrow">왜 이름이 중요할까요?</p>
          <p
            className="scroll-words mt-5 max-w-5xl text-[2rem] font-extrabold leading-[1.2] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
            style={{ '--n': statement.length } as CSSProperties}
          >
            {statement.map((word, index) => (
              <span key={index}>
                <span
                  className={`word ${word.accent ? 'text-gradient' : ''}`}
                  style={{ '--i': index } as CSSProperties}
                >
                  {word.text}
                </span>{' '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
 * 2) 겹쳐 쌓이는 카드: 단계 카드가 위에 붙으며 차례로 쌓이고, 뒤에 깔린 카드는 작아집니다.
 * ──────────────────────────────────────────────────────────── */
const steps = [
  {
    title: '그거, 검색하세요',
    body: '“아래에서 올라오는 창”처럼 생긴 대로 검색해도 정확한 이름을 찾아 줘요.',
    to: '/search',
    cta: '통합 검색',
    visual: 'search' as const,
  },
  {
    title: '헷갈리는 차이를 이해해요',
    body: '모달과 바텀 시트, 칩과 태그처럼 비슷한 요소를 같은 기준으로 나란히 비교해요.',
    to: '/versus',
    cta: '헷갈리는 UI 구분하기',
    visual: 'versus' as const,
  },
  {
    title: '사례와 기기별 차이를 확인해요',
    body: '유명 서비스에서 어떻게 쓰는지, PC·태블릿·모바일에서 어떻게 달라지는지 살펴봐요.',
    to: '/compare',
    cta: '기기별 비교',
    visual: 'devices' as const,
  },
  {
    title: '프롬프트로 가져가요',
    body: '기술 스택과 반응형·접근성 조건을 골라 덧붙인 뒤, AI에게 바로 붙여 넣어요.',
    to: '/guide',
    cta: '프롬프트 가이드',
    visual: 'prompt' as const,
  },
];

const STACK_TOP_REM = 6;
const STACK_STEP_REM = 1.25;

export function StackingSteps() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    const cards = Array.from(list.querySelectorAll<HTMLElement>('.stack-card'));
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return onScrollFrame(() => {
      // 각 카드 위로 이미 겹쳐 붙은 뒤 카드 수를 세어 --depth로 넘깁니다.
      const stuck = cards.map(
        (card, index) => card.getBoundingClientRect().top <= (STACK_TOP_REM + index * STACK_STEP_REM) * rem + 1,
      );
      cards.forEach((card, index) => {
        const depth = stuck.slice(index + 1).filter(Boolean).length;
        card.style.setProperty('--depth', String(depth));
      });
    });
  }, []);

  return (
    <ol ref={listRef} className="space-y-6 pb-8">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="sticky"
          style={{ top: `${STACK_TOP_REM + index * STACK_STEP_REM}rem` }}
        >
          <div className="stack-card grid min-h-[20rem] gap-6 overflow-hidden rounded-[1.75rem] border border-line bg-surface p-6 shadow-raised sm:p-10 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <p className="font-mono text-sm text-muted">0{index + 1} / 0{steps.length}</p>
              <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] sm:text-4xl">{step.title}</h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{step.body}</p>
              <Link to={step.to} className="btn-secondary mt-6">
                {step.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <StepVisual kind={step.visual} />
          </div>
        </li>
      ))}
    </ol>
  );
}

function StepVisual({ kind }: { kind: (typeof steps)[number]['visual'] }) {
  return (
    <div aria-hidden="true" className="dot-grid flex min-h-56 items-center justify-center rounded-2xl border border-line p-6">
      {kind === 'search' && (
        <div className="w-full max-w-xs space-y-3">
          <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-3 text-sm shadow-card">
            <Search className="h-4 w-4 text-muted" />
            아래에서 올라오는 창
            <span className="ml-auto h-4 w-px animate-pulse bg-ink" />
          </div>
          <div className="rounded-2xl border border-line bg-surface p-2 shadow-raised">
            <p className="rounded-xl bg-ink/[0.05] px-3 py-2 text-sm">
              <span className="font-bold">바텀 시트</span>
              <span className="ml-2 font-mono text-xs text-muted">Bottom Sheet</span>
            </p>
            <p className="px-3 py-2 text-sm text-muted">드로어 · Drawer</p>
          </div>
        </div>
      )}
      {kind === 'versus' && (
        <div className="flex items-center gap-4">
          <div className="flex h-28 w-24 items-center justify-center rounded-xl border border-line bg-surface shadow-card">
            <div className="h-10 w-16 rounded-md border border-line bg-background shadow-card" />
          </div>
          <span className="font-serif text-4xl italic text-primary">vs</span>
          <div className="flex h-28 w-24 items-end justify-center overflow-hidden rounded-xl border border-line bg-surface shadow-card">
            <div className="h-12 w-full rounded-t-lg border-t border-line bg-background" />
          </div>
        </div>
      )}
      {kind === 'devices' && (
        <div className="flex items-end gap-4 text-muted">
          <Monitor className="h-20 w-20" strokeWidth={1.2} />
          <Tablet className="h-14 w-14" strokeWidth={1.2} />
          <Smartphone className="h-10 w-10 text-primary" strokeWidth={1.4} />
        </div>
      )}
      {kind === 'prompt' && (
        <div className="w-full max-w-sm overflow-hidden rounded-xl bg-[#0d0d12] text-left font-mono text-[12px] leading-relaxed text-[#e9e9ef] ring-1 ring-white/10">
          <div className="flex gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </div>
          <p className="p-3">
            공유 버튼을 누르면 <span className="text-[#d9ff43]">모달</span>을 열어줘.
            <br />
            React와 Tailwind로, <span className="text-[#a998ff]">반응형·접근성</span>까지.
          </p>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * 3) 가로 스크롤 고정 구간: 세로로 내리는 동안 UX 분류 카드가 옆으로 흘러갑니다.
 *    좁은 화면이나 움직임 줄이기 설정에서는 손으로 넘기는 가로 목록으로 바뀝니다.
 * ──────────────────────────────────────────────────────────── */
function usePinnedHorizontal() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => setEnabled(query.matches && !prefersReducedMotion());
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);
  return enabled;
}

export function UXJourneyRail() {
  const pinned = usePinnedHorizontal();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!pinned || !section || !track) {
      setHeight(undefined);
      return;
    }
    // 가로로 넘겨야 할 거리만큼 세로 구간을 늘려, 스크롤 양과 가로 이동 양을 맞춥니다.
    const measure = () => {
      const distance = Math.max(0, track.scrollWidth - track.clientWidth);
      setHeight(window.innerHeight + distance);
      return distance;
    };
    let distance = measure();
    const handleResize = () => {
      distance = measure();
    };
    window.addEventListener('resize', handleResize);
    const stop = onScrollFrame(() => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
    });
    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
      track.style.transform = '';
    };
  }, [pinned]);

  const cards = uxCategories.map((category) => ({
    category,
    visual: uxCategoryVisuals[category.id],
    patterns: uxPatterns.filter((pattern) => pattern.category === category.id),
  }));

  return (
    <section ref={sectionRef} aria-labelledby="journey-heading" style={{ height }} className="relative">
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : ''}>
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-4">
          <div>
            <p className="eyebrow">UX 분류</p>
            <h2 id="journey-heading" className="mt-1.5 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
              사용자는 무엇을 하고 싶을까요?
            </h2>
          </div>
          <p className="hidden text-xs text-muted sm:block">
            {pinned ? '아래로 내리면 옆으로 흘러가요 →' : '옆으로 넘겨 보세요 →'}
          </p>
        </div>
        {/* 고정 구간에서는 양 끝을 흐리게 처리해 카드가 화면 밖에서 흘러 들어오는 느낌을 줍니다. */}
        <div className={pinned ? 'fade-x -mx-4 px-4' : ''}>
        <ul
          ref={trackRef}
          className={`flex gap-4 ${
            pinned ? 'will-change-transform' : 'scrollbar-none -mx-4 snap-x snap-mandatory overflow-x-auto px-4 pb-2'
          }`}
        >
          {cards.map(({ category, visual: { Icon, tone }, patterns }, index) => (
            <li key={category.id} className="w-[17rem] shrink-0 snap-start sm:w-[20rem]">
              <Link
                to={`/ux?category=${category.id}`}
                className={`tone-${tone} spotlight group flex h-[22rem] flex-col rounded-[1.5rem] border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-raised`}
              >
                <span className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tone text-tone-fg transition-transform group-hover:rotate-[-8deg] group-hover:scale-110">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                </span>
                <span className="mt-6 text-xl font-bold leading-snug tracking-tight">{category.easyName}</span>
                <span className="mt-1 text-xs text-muted">
                  {category.name} · 패턴 {patterns.length}개
                </span>
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {patterns.slice(0, 4).map((pattern) => (
                    <span key={pattern.id} className="rounded-full px-2.5 py-1 text-xs text-muted ring-1 ring-line">
                      {pattern.koreanName}
                    </span>
                  ))}
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold">
                  살펴보기
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}
