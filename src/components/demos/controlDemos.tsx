import { useId, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Heart, Minus, Plus, Search, X, Eye, EyeOff, Upload } from 'lucide-react';
import { useToast } from '../common/ToastProvider';

export function ButtonDemo() {
  const [loading, setLoading] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const { showToast } = useToast();

  const handleSave = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSavedCount((count) => count + 1);
      showToast('저장했어요.');
    }, 900);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-strong disabled:opacity-60"
      >
        {loading && (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            aria-hidden="true"
          />
        )}
        {loading ? '저장 중…' : '저장'}
      </button>
      <button
        type="button"
        className="min-h-11 rounded-lg border border-line bg-surface px-5 text-sm font-semibold text-ink hover:bg-background"
      >
        취소
      </button>
      <button
        type="button"
        disabled
        className="min-h-11 rounded-lg border border-line bg-background px-5 text-sm font-semibold text-muted opacity-60"
      >
        비활성
      </button>
      {savedCount > 0 && (
        <span className="text-sm text-muted" role="status">
          지금까지 {savedCount}번 저장했어요.
        </span>
      )}
    </div>
  );
}

export function IconButtonDemo() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? '좋아요 취소' : '좋아요'}
        onClick={() => setLiked((value) => !value)}
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
          liked ? 'border-rose-300 bg-rose-50 text-rose-500' : 'border-line bg-surface text-muted hover:text-ink'
        }`}
      >
        <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} aria-hidden="true" />
      </button>
      <span className="text-sm text-muted" role="status">
        {liked ? '좋아요를 눌렀어요.' : '하트를 눌러 보세요.'}
      </span>
    </div>
  );
}

export function FabDemo() {
  const { showToast } = useToast();
  return (
    <div className="relative h-40 overflow-hidden rounded-card border border-line bg-background">
      <div className="space-y-2 p-3">
        {['첫 번째 메모', '두 번째 메모', '세 번째 메모'].map((memo) => (
          <div key={memo} className="rounded-md bg-surface px-3 py-2 text-sm text-muted shadow-card">
            {memo}
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="새 메모 작성"
        onClick={() => showToast('새 메모 작성을 시작해요.')}
        className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-raised hover:bg-primary-strong"
      >
        <Plus className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}

const checkboxTopics = ['버튼', '검색', '모달', '반응형'];

export function CheckboxDemo() {
  const [checked, setChecked] = useState<string[]>(['버튼']);
  const groupId = useId();

  const toggle = (topic: string) => {
    setChecked((current) =>
      current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic],
    );
  };

  return (
    <fieldset>
      <legend className="text-sm font-semibold">관심 있는 주제를 모두 골라 보세요.</legend>
      <div className="mt-2 space-y-1">
        {checkboxTopics.map((topic, index) => (
          <label
            key={topic}
            htmlFor={`${groupId}-${index}`}
            className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-2 hover:bg-background"
          >
            <input
              id={`${groupId}-${index}`}
              type="checkbox"
              checked={checked.includes(topic)}
              onChange={() => toggle(topic)}
              className="h-4.5 w-4.5 accent-[var(--color-primary)]"
            />
            <span className="text-sm">{topic}</span>
          </label>
        ))}
      </div>
      <p className="mt-1 text-sm text-muted" role="status">
        {checked.length}개 선택했어요.
      </p>
    </fieldset>
  );
}

const shippingOptions = [
  { value: 'normal', label: '일반 배송 (2~3일)' },
  { value: 'fast', label: '빠른 배송 (내일 도착)' },
  { value: 'pickup', label: '매장 픽업' },
];

export function RadioDemo() {
  const [selected, setSelected] = useState('normal');
  const groupId = useId();
  return (
    <fieldset>
      <legend className="text-sm font-semibold">배송 방법을 하나 골라 보세요.</legend>
      <div className="mt-2 space-y-1">
        {shippingOptions.map((option, index) => (
          <label
            key={option.value}
            htmlFor={`${groupId}-${index}`}
            className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md border px-3 ${
              selected === option.value ? 'border-primary bg-primary-soft' : 'border-line hover:bg-background'
            }`}
          >
            <input
              id={`${groupId}-${index}`}
              type="radio"
              name={groupId}
              value={option.value}
              checked={selected === option.value}
              onChange={() => setSelected(option.value)}
              className="h-4 w-4 accent-[var(--color-primary)]"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ToggleDemo() {
  const [on, setOn] = useState(false);
  const labelId = useId();
  return (
    <div className="flex items-center justify-between rounded-card border border-line bg-surface px-4 py-3">
      <span id={labelId} className="text-sm font-medium">
        알림 받기
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby={labelId}
        onClick={() => setOn((value) => !value)}
        className={`flex h-7 w-[52px] items-center rounded-full p-0.5 transition-colors ${
          on ? 'bg-primary' : 'bg-line'
        }`}
      >
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] shadow transition-transform ${
            on ? 'translate-x-[22px] text-primary-strong' : 'translate-x-0 text-muted'
          }`}
        >
          {on ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <X className="h-3.5 w-3.5" aria-hidden="true" />}
        </span>
      </button>
      <span className="sr-only" role="status">
        알림 {on ? '켜짐' : '꺼짐'}
      </span>
    </div>
  );
}

export function SelectDemo() {
  const [value, setValue] = useState('');
  const selectId = useId();
  return (
    <div className="max-w-xs">
      <label htmlFor={selectId} className="text-sm font-semibold">
        거주 지역
      </label>
      <div className="relative mt-1.5">
        <select
          id={selectId}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="min-h-11 w-full appearance-none rounded-lg border border-line bg-surface px-3 pr-9 text-sm"
        >
          <option value="">지역을 선택하세요</option>
          <option value="seoul">서울</option>
          <option value="busan">부산</option>
          <option value="daegu">대구</option>
          <option value="jeju">제주</option>
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </div>
      {value && (
        <p className="mt-1.5 text-sm text-muted" role="status">
          선택한 지역: {value === 'seoul' ? '서울' : value === 'busan' ? '부산' : value === 'daegu' ? '대구' : '제주'}
        </p>
      )}
    </div>
  );
}

const countries = ['대한민국', '일본', '미국', '캐나다', '독일', '프랑스', '베트남', '태국', '호주', '영국'];

export function ComboBoxDemo() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const inputId = useId();
  const listId = useId();

  const filtered = useMemo(
    () => countries.filter((country) => country.includes(query.trim())),
    [query],
  );

  const choose = (country: string) => {
    setSelected(country);
    setQuery(country);
    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      setOpen(true);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlighted((index) => Math.min(index + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter' && open && filtered[highlighted]) {
      event.preventDefault();
      choose(filtered[highlighted]);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className="max-w-xs">
      <label htmlFor={inputId} className="text-sm font-semibold">
        국가 선택
      </label>
      <div className="relative mt-1.5">
        <input
          id={inputId}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setHighlighted(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="국가 이름을 입력하세요"
          className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
        />
        {open && (
          <ul
            id={listId}
            role="listbox"
            aria-label="국가 후보"
            className="absolute z-10 mt-1 max-h-44 w-full overflow-auto rounded-lg border border-line bg-surface py-1 shadow-raised"
          >
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted">일치하는 국가가 없어요.</li>
            )}
            {filtered.map((country, index) => (
              <li key={country} role="option" aria-selected={country === selected}>
                <button
                  type="button"
                  onClick={() => choose(country)}
                  onMouseEnter={() => setHighlighted(index)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${
                    index === highlighted ? 'bg-primary-soft text-primary-strong' : ''
                  }`}
                >
                  {country}
                  {country === selected && <Check className="h-4 w-4" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function SearchFieldDemo() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState('');
  const inputId = useId();
  return (
    <form
      role="search"
      className="max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(value.trim());
      }}
    >
      <label htmlFor={inputId} className="sr-only">
        검색어
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="검색어를 입력하세요"
          className="min-h-11 w-full rounded-full border border-line bg-surface pl-9 pr-10 text-sm [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => {
              setValue('');
              setSubmitted('');
            }}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-background"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      <p className="mt-1.5 min-h-5 text-sm text-muted" role="status">
        {submitted ? `"${submitted}" 검색을 실행했어요.` : 'Enter를 눌러 검색을 실행해 보세요.'}
      </p>
    </form>
  );
}

const suggestions = ['버튼', '버튼 그룹', '바텀 시트', '배지', '배너', '브레드크럼', '검색창', '체크박스'];

export function AutocompleteDemo() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [chosen, setChosen] = useState('');
  const inputId = useId();
  const listId = useId();

  const matches = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    return suggestions.filter((word) => word.includes(trimmed)).slice(0, 6);
  }, [query]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlighted((index) => Math.min(index + 1, matches.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter' && open && matches[highlighted]) {
      event.preventDefault();
      setChosen(matches[highlighted]);
      setQuery(matches[highlighted]);
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className="max-w-sm">
      <label htmlFor={inputId} className="text-sm font-semibold">
        UI 이름 검색
      </label>
      <div className="relative mt-1.5">
        <input
          id={inputId}
          role="combobox"
          aria-expanded={open && matches.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setHighlighted(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="예: 버, 배, 체"
          className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
        />
        {open && matches.length > 0 && (
          <ul
            id={listId}
            role="listbox"
            aria-label="추천 검색어"
            className="absolute z-10 mt-1 w-full rounded-lg border border-line bg-surface py-1 shadow-raised"
          >
            {matches.map((word, index) => (
              <li key={word} role="option" aria-selected={index === highlighted}>
                <button
                  type="button"
                  onMouseEnter={() => setHighlighted(index)}
                  onClick={() => {
                    setChosen(word);
                    setQuery(word);
                    setOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm ${
                    index === highlighted ? 'bg-primary-soft text-primary-strong' : ''
                  }`}
                >
                  <Highlight word={word} query={query.trim()} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="mt-1.5 min-h-5 text-sm text-muted" role="status">
        {chosen ? `"${chosen}"을(를) 선택했어요.` : ''}
      </p>
    </div>
  );
}

function Highlight({ word, query }: { word: string; query: string }) {
  if (!query) return <>{word}</>;
  const index = word.indexOf(query);
  if (index < 0) return <>{word}</>;
  return (
    <>
      {word.slice(0, index)}
      <strong className="text-primary-strong">{word.slice(index, index + query.length)}</strong>
      {word.slice(index + query.length)}
    </>
  );
}

export function TextFieldDemo() {
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);
  const inputId = useId();
  const errorId = useId();
  const hasError = touched && name.trim() === '';
  return (
    <div className="max-w-xs">
      <label htmlFor={inputId} className="text-sm font-semibold">
        이름 <span aria-hidden="true" className="text-error">*</span>
        <span className="sr-only">(필수)</span>
      </label>
      <input
        id={inputId}
        value={name}
        onChange={(event) => setName(event.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        placeholder="예: 김지수"
        className={`mt-1.5 min-h-11 w-full rounded-lg border bg-surface px-3 text-sm ${
          hasError ? 'border-error' : 'border-line'
        }`}
      />
      {hasError && (
        <p id={errorId} className="mt-1.5 text-sm text-error">
          이름을 입력해 주세요.
        </p>
      )}
    </div>
  );
}

export function PasswordFieldDemo() {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const inputId = useId();
  const ruleId = useId();
  const passes = value.length >= 8;
  return (
    <div className="max-w-xs">
      <label htmlFor={inputId} className="text-sm font-semibold">
        비밀번호
      </label>
      <div className="relative mt-1.5">
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-describedby={ruleId}
          autoComplete="new-password"
          className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 pr-11 text-sm"
        />
        <button
          type="button"
          aria-label={visible ? '비밀번호 가리기' : '비밀번호 보기'}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
          className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:bg-background"
        >
          {visible ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
      <p id={ruleId} className={`mt-1.5 text-sm ${passes ? 'text-success' : 'text-muted'}`}>
        {passes ? '✓ 8자 이상 조건을 충족했어요.' : '8자 이상 입력해 주세요.'}
      </p>
    </div>
  );
}

export function RangeSliderDemo() {
  const [value, setValue] = useState(50000);
  const sliderId = useId();
  return (
    <div className="max-w-sm">
      <div className="flex items-center justify-between">
        <label htmlFor={sliderId} className="text-sm font-semibold">
          최대 가격
        </label>
        <output htmlFor={sliderId} className="text-sm font-semibold text-primary-strong">
          {value.toLocaleString()}원
        </output>
      </div>
      <input
        id={sliderId}
        type="range"
        min={10000}
        max={100000}
        step={5000}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="mt-2 w-full accent-[var(--color-primary)]"
      />
      <div className="flex justify-between text-xs text-muted">
        <span>1만원</span>
        <span>10만원</span>
      </div>
    </div>
  );
}

export function StepperDemo() {
  const [count, setCount] = useState(1);
  const min = 1;
  const max = 9;
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-lg border border-line bg-surface">
        <button
          type="button"
          aria-label="수량 줄이기"
          disabled={count <= min}
          onClick={() => setCount((current) => Math.max(min, current - 1))}
          className="flex h-11 w-11 items-center justify-center text-muted disabled:opacity-40"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="w-10 border-x border-line py-2.5 text-center text-sm font-semibold" role="status" aria-label={`수량 ${count}개`}>
          {count}
        </span>
        <button
          type="button"
          aria-label="수량 늘리기"
          disabled={count >= max}
          onClick={() => setCount((current) => Math.min(max, current + 1))}
          className="flex h-11 w-11 items-center justify-center text-muted disabled:opacity-40"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <span className="text-sm text-muted">최소 {min}개, 최대 {max}개</span>
    </div>
  );
}

const chipFilters = ['전체', '무료 배송', '오늘 출발', '리뷰 좋은 순'];

export function ChipDemo() {
  const [active, setActive] = useState<string[]>(['전체']);
  const toggle = (chip: string) => {
    setActive((current) =>
      current.includes(chip) ? current.filter((item) => item !== chip) : [...current, chip],
    );
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {chipFilters.map((chip) => {
          const selected = active.includes(chip);
          return (
            <button
              key={chip}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(chip)}
              className={`inline-flex min-h-10 items-center gap-1 rounded-full border px-3.5 text-sm transition-colors ${
                selected
                  ? 'border-primary bg-primary-soft font-semibold text-primary-strong'
                  : 'border-line bg-surface text-muted hover:text-ink'
              }`}
            >
              {selected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
              {chip}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-sm text-muted" role="status">
        {active.length}개 조건이 켜져 있어요.
      </p>
    </div>
  );
}

const segments = ['목록', '격자', '지도'];

export function SegmentedControlDemo() {
  const [selected, setSelected] = useState('목록');
  return (
    <div>
      <div role="group" aria-label="보기 방식" className="inline-flex rounded-xl bg-background p-1">
        {segments.map((segment) => (
          <button
            key={segment}
            type="button"
            aria-pressed={selected === segment}
            onClick={() => setSelected(segment)}
            className={`min-h-10 rounded-lg px-4 text-sm font-medium transition-colors ${
              selected === segment ? 'bg-surface text-primary-strong shadow-card' : 'text-muted hover:text-ink'
            }`}
          >
            {segment}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-muted" role="status">
        {selected} 보기로 표시 중이에요.
      </p>
    </div>
  );
}

export function DatePickerDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const today = 11;
  const daysInMonth = 31;
  const firstWeekday = 3; // 수요일 시작 예시
  const weekLabels = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="max-w-xs rounded-card border border-line bg-surface p-4">
      <p className="text-sm font-semibold">2026년 7월</p>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-xs text-muted">
        {weekLabels.map((label) => (
          <span key={label} aria-hidden="true">
            {label}
          </span>
        ))}
      </div>
      <div role="group" aria-label="날짜 선택" className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: firstWeekday }, (_, index) => (
          <span key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const isPast = day < today;
          const isSelected = selected === day;
          return (
            <button
              key={day}
              type="button"
              disabled={isPast}
              aria-pressed={isSelected}
              aria-label={`7월 ${day}일${isPast ? ' (선택 불가)' : ''}`}
              onClick={() => setSelected(day)}
              className={`flex h-9 items-center justify-center rounded-md text-sm ${
                isSelected
                  ? 'bg-primary font-semibold text-white'
                  : isPast
                    ? 'text-muted/40'
                    : day === today
                      ? 'border border-primary text-primary-strong'
                      : 'hover:bg-background'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <p className="mt-2 min-h-5 text-sm text-muted" role="status">
        {selected ? `7월 ${selected}일을 선택했어요.` : '오늘(11일) 이전은 선택할 수 없어요.'}
      </p>
    </div>
  );
}

type UploadState = 'idle' | 'uploading' | 'done';

export function FileUploadDemo() {
  const [state, setState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const timerRef = useRef<number | null>(null);
  const inputId = useId();

  const startUpload = (name: string) => {
    setFileName(name);
    setState('uploading');
    setProgress(0);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setProgress((current) => {
        const next = current + 20;
        if (next >= 100) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          setState('done');
          return 100;
        }
        return next;
      });
    }, 350);
  };

  return (
    <div className="max-w-sm">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          const dropped = event.dataTransfer.files[0];
          startUpload(dropped ? dropped.name : '끌어다 놓은 파일.png');
        }}
        className={`flex flex-col items-center gap-2 rounded-card border-2 border-dashed p-6 text-center transition-colors ${
          dragOver ? 'border-primary bg-primary-soft' : 'border-line bg-background'
        }`}
      >
        <Upload className="h-6 w-6 text-muted" aria-hidden="true" />
        <p className="text-sm">파일을 끌어다 놓거나 버튼으로 선택하세요.</p>
        <p className="text-xs text-muted">PNG, JPG · 최대 10MB (데모라 실제 전송은 없어요)</p>
        <label
          htmlFor={inputId}
          className="mt-1 inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-line bg-surface px-4 text-sm font-semibold hover:bg-background"
        >
          파일 선택
        </label>
        <input
          id={inputId}
          type="file"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) startUpload(file.name);
          }}
        />
      </div>
      {state !== 'idle' && (
        <div className="mt-3 rounded-card border border-line bg-surface p-3">
          <p className="truncate text-sm font-medium">{fileName}</p>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="업로드 진행률"
            className="mt-2 h-2 overflow-hidden rounded-full bg-line"
          >
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1.5 text-sm text-muted" role="status">
            {state === 'done' ? '✓ 업로드 완료!' : `업로드 중… ${progress}%`}
          </p>
        </div>
      )}
    </div>
  );
}
