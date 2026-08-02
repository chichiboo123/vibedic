import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Check, ChevronLeft, ChevronRight, Copy, X } from 'lucide-react';
import { useToast } from '../common/ToastProvider';
import { DemoNote } from './frames';

// 보여주기(display) 요소 데모 — 정보를 어떤 모양으로 늘어놓는지 직접 바꿔 볼 수 있습니다.

const listPeople = [
  { name: '김지수', role: '기획', emoji: '🧑‍💼', unread: 2 },
  { name: '박서준', role: '디자인', emoji: '🧑‍🎨', unread: 0 },
  { name: '이하늘', role: '개발', emoji: '🧑‍💻', unread: 5 },
  { name: '최민아', role: '마케팅', emoji: '🧑‍🏫', unread: 0 },
];

export function ListDemo() {
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [selected, setSelected] = useState('');

  return (
    <div>
      <div className="mb-3 inline-flex rounded-xl bg-background p-1">
        {[
          { label: '넉넉하게', value: 'comfortable' as const },
          { label: '촘촘하게', value: 'compact' as const },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={density === option.value}
            onClick={() => setDensity(option.value)}
            className={`min-h-10 rounded-lg px-4 text-sm font-medium ${
              density === option.value ? 'bg-surface text-primary-strong shadow-card' : 'text-muted hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <ul className="max-w-sm divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
        {listPeople.map((person) => (
          <li key={person.name}>
            <button
              type="button"
              onClick={() => setSelected(person.name)}
              className={`flex w-full items-center gap-3 px-4 text-left hover:bg-background ${
                density === 'comfortable' ? 'min-h-16 py-3' : 'min-h-11 py-1.5'
              } ${selected === person.name ? 'bg-primary-soft' : ''}`}
            >
              <span
                aria-hidden="true"
                className={`flex shrink-0 items-center justify-center rounded-full bg-background ${
                  density === 'comfortable' ? 'h-10 w-10 text-lg' : 'h-7 w-7 text-sm'
                }`}
              >
                {person.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{person.name}</span>
                {density === 'comfortable' && (
                  <span className="block truncate text-xs text-muted">{person.role} 팀</span>
                )}
              </span>
              {person.unread > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                  {person.unread}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <DemoNote>
        {selected
          ? `${selected} 님을 선택했어요.`
          : '한 줄이 항목 하나예요. 밀도를 바꾸면 한 화면에 보이는 개수가 달라집니다.'}
      </DemoNote>
    </div>
  );
}

type TableRow = { product: string; price: number; stock: number };

const tableRows: TableRow[] = [
  { product: '무선 마우스', price: 29000, stock: 12 },
  { product: '기계식 키보드', price: 118000, stock: 3 },
  { product: '모니터 받침대', price: 45000, stock: 0 },
  { product: 'USB 허브', price: 22000, stock: 27 },
];

export function TableDemo() {
  const [sortKey, setSortKey] = useState<keyof TableRow>('product');
  const [ascending, setAscending] = useState(true);

  const sorted = useMemo(() => {
    const copy = [...tableRows];
    copy.sort((a, b) => {
      const left = a[sortKey];
      const right = b[sortKey];
      const result = typeof left === 'number' && typeof right === 'number'
        ? left - right
        : String(left).localeCompare(String(right), 'ko');
      return ascending ? result : -result;
    });
    return copy;
  }, [sortKey, ascending]);

  const columns: { key: keyof TableRow; label: string; numeric?: boolean }[] = [
    { key: 'product', label: '상품' },
    { key: 'price', label: '가격', numeric: true },
    { key: 'stock', label: '재고', numeric: true },
  ];

  const toggleSort = (key: keyof TableRow) => {
    if (key === sortKey) setAscending((value) => !value);
    else {
      setSortKey(key);
      setAscending(true);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-card border border-line">
        <table className="w-full min-w-[20rem] border-collapse text-sm">
          <caption className="sr-only">상품별 가격과 재고</caption>
          <thead>
            <tr className="bg-background">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={sortKey === column.key ? (ascending ? 'ascending' : 'descending') : 'none'}
                  className={`p-0 ${column.numeric ? 'text-right' : 'text-left'}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(column.key)}
                    className={`flex min-h-11 w-full items-center gap-1 px-3 text-xs font-bold hover:text-primary-strong ${
                      column.numeric ? 'justify-end' : ''
                    }`}
                  >
                    {column.label}
                    {sortKey === column.key &&
                      (ascending ? (
                        <ArrowUp className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        <ArrowDown className="h-3 w-3" aria-hidden="true" />
                      ))}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.product} className="border-t border-line bg-surface">
                <th scope="row" className="px-3 py-2.5 text-left font-medium">
                  {row.product}
                </th>
                <td className="px-3 py-2.5 text-right tabular-nums">{row.price.toLocaleString()}원</td>
                <td className={`px-3 py-2.5 text-right tabular-nums ${row.stock === 0 ? 'text-error' : ''}`}>
                  {row.stock === 0 ? '품절' : `${row.stock}개`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DemoNote>
        {columns.find((column) => column.key === sortKey)?.label} 기준 {ascending ? '오름차순' : '내림차순'}으로
        정렬했어요. 머리글을 눌러 바꿔 보세요.
      </DemoNote>
    </div>
  );
}

const avatarPeople = [
  { name: '김지수', color: 'bg-indigo-400' },
  { name: '박서준', color: 'bg-emerald-400' },
  { name: '이하늘', color: 'bg-amber-400' },
  { name: '최민아', color: 'bg-rose-400' },
  { name: '정우성', color: 'bg-sky-400' },
];

export function AvatarDemo() {
  const [imageBroken, setImageBroken] = useState(true);
  const visible = avatarPeople.slice(0, 3);
  const rest = avatarPeople.length - visible.length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-6">
        <div>
          <p className="mb-2 text-xs font-semibold text-muted">단독</p>
          <div className="flex items-center gap-2">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold text-white ${
                imageBroken ? 'bg-indigo-400' : 'bg-primary-soft'
              }`}
              role="img"
              aria-label="김지수 프로필"
            >
              {imageBroken ? '김' : '🧑'}
            </span>
            <span className="text-sm">김지수</span>
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-muted">여러 명 겹치기</p>
          <ul className="flex -space-x-2.5">
            {visible.map((person) => (
              <li key={person.name}>
                <span
                  role="img"
                  aria-label={`${person.name} 프로필`}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-surface text-sm font-semibold text-white ${person.color}`}
                >
                  {person.name.slice(0, 1)}
                </span>
              </li>
            ))}
            <li>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-surface bg-background text-xs font-semibold text-muted">
                +{rest}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <label className="mt-4 flex min-h-11 w-fit cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={imageBroken}
          onChange={(event) => setImageBroken(event.target.checked)}
          className="h-4 w-4 accent-[var(--color-primary)]"
        />
        사진이 없을 때(이니셜로 대체)
      </label>
      <DemoNote>
        {imageBroken
          ? '사진이 없으면 이름 첫 글자로 대신해 빈 동그라미를 남기지 않아요.'
          : '사진이 있으면 그대로 보여 주고, 대체 텍스트로 누구인지 읽어 줍니다.'}
      </DemoNote>
    </div>
  );
}

const badgeStates = [
  { label: '결제 완료', tone: 'bg-emerald-100 text-emerald-700', icon: '●' },
  { label: '배송 중', tone: 'bg-sky-100 text-sky-700', icon: '●' },
  { label: '검수 대기', tone: 'bg-amber-100 text-amber-700', icon: '●' },
  { label: '취소됨', tone: 'bg-rose-100 text-rose-700', icon: '●' },
];

export function BadgeDemo() {
  const [step, setStep] = useState(0);
  const current = badgeStates[step];

  return (
    <div>
      <ul className="space-y-2">
        {['주문 #20260731-01', '주문 #20260730-14'].map((order, index) => {
          const state = index === 0 ? current : badgeStates[2];
          return (
            <li
              key={order}
              className="flex items-center justify-between gap-3 rounded-card border border-line bg-surface px-4 py-3"
            >
              <span className="text-sm">{order}</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${state.tone}`}
              >
                <span aria-hidden="true" className="text-[8px]">
                  {state.icon}
                </span>
                {state.label}
              </span>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={() => setStep((value) => (value + 1) % badgeStates.length)}
        className="mt-3 min-h-11 rounded-lg border border-line bg-surface px-4 text-sm font-semibold hover:bg-background"
      >
        첫 주문 상태 바꾸기
      </button>
      <DemoNote>
        첫 주문은 지금 ‘{current.label}’ 상태예요. 색만으로 구분하지 않도록 글자를 함께 넣었습니다.
      </DemoNote>
    </div>
  );
}

const tagPool = ['교육', '디자인', 'React', '접근성', '글쓰기', '데이터'];

export function TagDemo() {
  const [tags, setTags] = useState(['교육', '디자인']);
  const [draft, setDraft] = useState('');
  const inputId = useId();

  const add = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((current) => [...current, trimmed]);
    setDraft('');
  };

  return (
    <div className="max-w-sm">
      <label htmlFor={inputId} className="text-sm font-semibold">
        글에 붙일 태그
      </label>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 rounded-lg border border-line bg-surface p-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary-strong"
          >
            #{tag}
            <button
              type="button"
              aria-label={`${tag} 태그 지우기`}
              onClick={() => setTags((current) => current.filter((item) => item !== tag))}
              className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-primary/20"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          id={inputId}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              add(draft);
            } else if (event.key === 'Backspace' && !draft) {
              setTags((current) => current.slice(0, -1));
            }
          }}
          placeholder="입력 후 Enter"
          className="min-h-9 min-w-24 flex-1 bg-transparent px-1 text-sm outline-none"
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {tagPool
          .filter((tag) => !tags.includes(tag))
          .map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => add(tag)}
              className="min-h-9 rounded-full border border-line bg-surface px-2.5 text-xs text-muted hover:text-ink"
            >
              + {tag}
            </button>
          ))}
      </div>
      <DemoNote>
        태그 {tags.length}개를 붙였어요. Backspace로 마지막 태그를 지울 수도 있습니다.
      </DemoNote>
    </div>
  );
}

const slides = [
  { title: '오늘의 추천', emoji: '🍜', tone: 'bg-amber-100' },
  { title: '새로 나온 상품', emoji: '🧴', tone: 'bg-sky-100' },
  { title: '한정 특가', emoji: '🎁', tone: 'bg-rose-100' },
];

export function CarouselDemo() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [playing]);

  const go = (next: number) => setIndex((next + slides.length) % slides.length);

  return (
    <div className="max-w-sm">
      <div className="relative overflow-hidden rounded-card border border-line" aria-roledescription="캐러셀">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.title}
              role="group"
              aria-roledescription="슬라이드"
              aria-label={`${slideIndex + 1} / ${slides.length} ${slide.title}`}
              aria-hidden={slideIndex !== index}
              className={`flex h-32 w-full shrink-0 flex-col items-center justify-center gap-1 ${slide.tone}`}
            >
              <span aria-hidden="true" className="text-3xl">
                {slide.emoji}
              </span>
              <span className="text-sm font-semibold text-zinc-700">{slide.title}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          aria-label="이전 슬라이드"
          onClick={() => go(index - 1)}
          className="absolute left-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-muted shadow-card"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="다음 슬라이드"
          onClick={() => go(index + 1)}
          className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-muted shadow-card"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-1.5" role="tablist" aria-label="슬라이드 선택">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.title}
              type="button"
              role="tab"
              aria-selected={slideIndex === index}
              aria-label={`${slideIndex + 1}번 슬라이드`}
              onClick={() => setIndex(slideIndex)}
              className={`h-2.5 rounded-full transition-all ${
                slideIndex === index ? 'w-6 bg-primary' : 'w-2.5 bg-line'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-pressed={playing}
          onClick={() => setPlaying((value) => !value)}
          className="min-h-10 rounded-lg border border-line bg-surface px-3 text-xs font-semibold hover:bg-background"
        >
          {playing ? '자동 넘김 멈추기' : '자동 넘김 시작'}
        </button>
      </div>
      <DemoNote>
        {index + 1}번째 슬라이드예요.{' '}
        {playing ? '자동으로 넘어가는 중이라 멈춤 버튼이 꼭 필요합니다.' : '멈춰 있어 천천히 읽을 수 있어요.'}
      </DemoNote>
    </div>
  );
}

const monthEvents: Record<number, string> = {
  3: '건강검진',
  11: '팀 워크숍',
  18: '월간 회고',
  24: '가족 여행',
};

export function CalendarDemo() {
  const [selected, setSelected] = useState<number | null>(11);
  const weekLabels = ['일', '월', '화', '수', '목', '금', '토'];
  const firstWeekday = 3;
  const daysInMonth = 31;

  return (
    <div className="max-w-xs">
      <div className="rounded-card border border-line bg-surface p-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="이전 달"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-background"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="text-sm font-semibold">2026년 7월</p>
          <button
            type="button"
            aria-label="다음 달"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-background"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1 text-center text-xs text-muted">
          {weekLabels.map((label) => (
            <span key={label} aria-hidden="true">
              {label}
            </span>
          ))}
        </div>
        <div role="grid" aria-label="2026년 7월" className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: firstWeekday }, (_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const event = monthEvents[day];
            return (
              <button
                key={day}
                type="button"
                aria-pressed={selected === day}
                aria-label={`7월 ${day}일${event ? ` · ${event}` : ''}`}
                onClick={() => setSelected(day)}
                className={`relative flex h-9 flex-col items-center justify-center rounded-md text-sm ${
                  selected === day ? 'bg-primary font-semibold text-white' : 'hover:bg-background'
                }`}
              >
                {day}
                {event && (
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-1 h-1 w-1 rounded-full ${
                      selected === day ? 'bg-white' : 'bg-primary'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
      <DemoNote>
        {selected
          ? monthEvents[selected]
            ? `7월 ${selected}일 · ${monthEvents[selected]} 일정이 있어요.`
            : `7월 ${selected}일에는 일정이 없어요.`
          : '날짜를 눌러 그날 일정을 확인해 보세요.'}
      </DemoNote>
    </div>
  );
}

const timelineSteps = [
  { title: '주문 접수', detail: '7월 28일 21:14', done: true },
  { title: '결제 완료', detail: '7월 28일 21:15', done: true },
  { title: '상품 준비 중', detail: '7월 29일 09:02', done: true },
  { title: '배송 시작', detail: '예정', done: false },
  { title: '배송 완료', detail: '예정', done: false },
];

export function TimelineDemo() {
  const [progress, setProgress] = useState(3);

  return (
    <div className="max-w-sm">
      <ol className="relative ml-2 border-l-2 border-line pl-5">
        {timelineSteps.map((step, index) => {
          const done = index < progress;
          const current = index === progress - 1;
          return (
            <li key={step.title} className="relative pb-5 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[1.6rem] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                  done ? 'border-primary bg-primary text-white' : 'border-line bg-surface'
                }`}
              >
                {done && <Check className="h-2.5 w-2.5" aria-hidden="true" />}
              </span>
              <p className={`text-sm ${current ? 'font-bold text-primary-strong' : done ? 'font-medium' : 'text-muted'}`}>
                {step.title}
                {current && <span className="ml-1.5 text-xs font-semibold">진행 중</span>}
              </p>
              <p className="text-xs text-muted">{done ? step.detail : '예정'}</p>
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        disabled={progress >= timelineSteps.length}
        onClick={() => setProgress((value) => Math.min(timelineSteps.length, value + 1))}
        className="mt-3 min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50"
      >
        다음 단계로 진행
      </button>
      <DemoNote>
        {progress >= timelineSteps.length
          ? '모든 단계가 끝났어요. 지나온 기록이 그대로 남습니다.'
          : `${timelineSteps[progress - 1].title}까지 왔어요. 다음은 ‘${timelineSteps[progress].title}’입니다.`}
      </DemoNote>
    </div>
  );
}

const codeSample = `function greet(name) {
  const message = \`안녕하세요, \${name}님\`;
  console.log(message);
  return message;
}

greet('지수');`;

export function CodeBlockDemo() {
  const [wrap, setWrap] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const { showToast } = useToast();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(codeSample);
      showToast('코드를 복사했어요.');
    } catch {
      showToast('복사에 실패했어요. 직접 선택해 복사해 주세요.');
    }
  };

  return (
    <div className="max-w-lg">
      <div className="overflow-hidden rounded-card border border-line">
        <div className="flex items-center justify-between gap-2 border-b border-line bg-background px-3 py-2">
          <span className="font-mono text-xs text-muted">greet.js</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-pressed={wrap}
              onClick={() => setWrap((value) => !value)}
              className="min-h-9 rounded-md border border-line bg-surface px-2 text-xs hover:bg-background"
            >
              {wrap ? '줄바꿈 끄기' : '줄바꿈 켜기'}
            </button>
            <button
              type="button"
              onClick={copy}
              className="flex min-h-9 items-center gap-1 rounded-md border border-line bg-surface px-2 text-xs font-semibold hover:bg-background"
            >
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              복사
            </button>
          </div>
        </div>
        <pre
          ref={preRef}
          tabIndex={0}
          aria-label="자바스크립트 예제 코드"
          className={`bg-surface p-3 font-mono text-xs leading-relaxed ${
            wrap ? 'whitespace-pre-wrap break-all' : 'overflow-x-auto'
          }`}
        >
          {codeSample}
        </pre>
      </div>
      <DemoNote>
        {wrap
          ? '줄바꿈을 켜면 가로 스크롤 없이 다 보이지만 줄 번호 감각이 흐려져요.'
          : '기본은 가로 스크롤이에요. 키보드로도 스크롤할 수 있게 pre에 포커스를 줍니다.'}
      </DemoNote>
    </div>
  );
}
