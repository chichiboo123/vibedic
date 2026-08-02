import { useId, useRef, useState } from 'react';
import { Check, Minus, Plus, X } from 'lucide-react';
import { DemoNote } from './frames';

// 입력·조작 요소 중 별도 데모가 필요한 항목들입니다.

export function TextareaDemo() {
  const [value, setValue] = useState('');
  const areaId = useId();
  const countId = useId();
  const max = 200;
  const over = value.length > max;

  return (
    <div className="max-w-sm">
      <label htmlFor={areaId} className="text-sm font-semibold">
        후기 남기기
      </label>
      <textarea
        id={areaId}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-describedby={countId}
        aria-invalid={over}
        rows={4}
        placeholder="어떤 점이 좋았는지 편하게 적어 주세요."
        className={`mt-1.5 w-full resize-y rounded-lg border bg-surface p-3 text-sm leading-relaxed ${
          over ? 'border-error' : 'border-line'
        }`}
      />
      <p id={countId} className={`mt-1 text-right text-xs ${over ? 'text-error' : 'text-muted'}`}>
        {value.length} / {max}자
        {over && ' · 글자 수를 줄여 주세요'}
      </p>
      <DemoNote>
        오른쪽 아래 모서리를 끌면 높이를 늘릴 수 있어요. 글자 수는 입력하는 동안 함께 안내합니다.
      </DemoNote>
    </div>
  );
}

export function NumberInputDemo() {
  const [value, setValue] = useState('3');
  const inputId = useId();
  const helpId = useId();
  const numeric = Number(value);
  const invalid = value !== '' && (Number.isNaN(numeric) || numeric < 1 || numeric > 20);

  const nudge = (delta: number) => {
    const base = Number.isNaN(numeric) ? 0 : numeric;
    setValue(String(Math.min(20, Math.max(1, base + delta))));
  };

  return (
    <div className="max-w-xs">
      <label htmlFor={inputId} className="text-sm font-semibold">
        참석 인원
      </label>
      <div className="mt-1.5 flex items-center gap-2">
        <button
          type="button"
          aria-label="인원 줄이기"
          onClick={() => nudge(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:bg-background"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <input
          id={inputId}
          type="number"
          inputMode="numeric"
          min={1}
          max={20}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-describedby={helpId}
          aria-invalid={invalid}
          className={`min-h-11 w-full rounded-lg border bg-surface px-3 text-center text-sm tabular-nums ${
            invalid ? 'border-error' : 'border-line'
          }`}
        />
        <button
          type="button"
          aria-label="인원 늘리기"
          onClick={() => nudge(1)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:bg-background"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <p id={helpId} className={`mt-1.5 text-sm ${invalid ? 'text-error' : 'text-muted'}`}>
        {invalid ? '1명에서 20명 사이로 입력해 주세요.' : '1~20명까지 입력할 수 있어요.'}
      </p>
      <DemoNote>
        모바일에서 숫자 키패드가 바로 뜨도록 inputMode를 숫자로 지정해 두었어요.
      </DemoNote>
    </div>
  );
}

const hours = Array.from({ length: 12 }, (_, index) => index + 1);
const minutes = ['00', '10', '20', '30', '40', '50'];

export function TimePickerDemo() {
  const [meridiem, setMeridiem] = useState<'오전' | '오후'>('오후');
  const [hour, setHour] = useState(2);
  const [minute, setMinute] = useState('30');
  const hourId = useId();
  const minuteId = useId();

  return (
    <div className="max-w-sm">
      <p className="text-sm font-semibold">예약 시간</p>
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <div role="group" aria-label="오전 오후" className="inline-flex rounded-xl bg-background p-1">
          {(['오전', '오후'] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={meridiem === option}
              onClick={() => setMeridiem(option)}
              className={`min-h-10 rounded-lg px-3 text-sm font-medium ${
                meridiem === option ? 'bg-surface text-primary-strong shadow-card' : 'text-muted hover:text-ink'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor={hourId} className="sr-only">
            시
          </label>
          <select
            id={hourId}
            value={hour}
            onChange={(event) => setHour(Number(event.target.value))}
            className="min-h-11 rounded-lg border border-line bg-surface px-2 text-sm tabular-nums"
          >
            {hours.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span aria-hidden="true" className="font-semibold">
            :
          </span>
          <label htmlFor={minuteId} className="sr-only">
            분
          </label>
          <select
            id={minuteId}
            value={minute}
            onChange={(event) => setMinute(event.target.value)}
            className="min-h-11 rounded-lg border border-line bg-surface px-2 text-sm tabular-nums"
          >
            {minutes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {[
          { label: '지금부터 1시간 뒤', meridiem: '오후' as const, hour: 3, minute: '30' },
          { label: '내일 오전 9시', meridiem: '오전' as const, hour: 9, minute: '00' },
        ].map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setMeridiem(preset.meridiem);
              setHour(preset.hour);
              setMinute(preset.minute);
            }}
            className="min-h-10 rounded-full border border-line bg-surface px-3 text-xs text-muted hover:text-ink"
          >
            {preset.label}
          </button>
        ))}
      </div>
      <DemoNote>
        {meridiem} {hour}시 {minute}분으로 정했어요. 10분 단위로 끊어 두면 고르기가 훨씬 빨라집니다.
      </DemoNote>
    </div>
  );
}

const OTP_LENGTH = 6;

export function OtpInputDemo() {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const groupId = useId();
  const code = digits.join('');
  const complete = code.length === OTP_LENGTH;
  const correct = code === '482913';

  const setDigit = (index: number, value: string) => {
    setDigits((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  };

  const handleChange = (index: number, raw: string) => {
    const onlyDigits = raw.replaceAll(/\D/g, '');
    if (!onlyDigits) {
      setDigit(index, '');
      return;
    }
    if (onlyDigits.length > 1) {
      // 문자 메시지에서 복사해 붙여 넣은 경우 한 번에 채웁니다.
      setDigits((current) => {
        const next = [...current];
        for (let offset = 0; offset < onlyDigits.length && index + offset < OTP_LENGTH; offset += 1) {
          next[index + offset] = onlyDigits[offset];
        }
        return next;
      });
      const landing = Math.min(index + onlyDigits.length, OTP_LENGTH - 1);
      inputsRef.current[landing]?.focus();
      return;
    }
    setDigit(index, onlyDigits);
    inputsRef.current[index + 1]?.focus();
  };

  return (
    <div>
      <fieldset>
        <legend className="text-sm font-semibold">문자로 받은 인증번호 6자리</legend>
        <div className="mt-2 flex gap-1.5">
          {digits.map((digit, index) => (
            <input
              key={`${groupId}-${index}`}
              ref={(element) => {
                inputsRef.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? 'one-time-code' : undefined}
              maxLength={OTP_LENGTH}
              value={digit}
              aria-label={`인증번호 ${index + 1}번째 자리`}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Backspace' && !digit && index > 0) {
                  inputsRef.current[index - 1]?.focus();
                  setDigit(index - 1, '');
                } else if (event.key === 'ArrowLeft') {
                  inputsRef.current[index - 1]?.focus();
                } else if (event.key === 'ArrowRight') {
                  inputsRef.current[index + 1]?.focus();
                }
              }}
              className={`h-12 w-10 rounded-lg border bg-surface text-center text-lg font-semibold tabular-nums ${
                complete ? (correct ? 'border-success' : 'border-error') : 'border-line'
              }`}
            />
          ))}
        </div>
      </fieldset>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setDigits(Array(OTP_LENGTH).fill(''));
            inputsRef.current[0]?.focus();
          }}
          className="min-h-11 rounded-lg border border-line bg-surface px-4 text-sm font-semibold hover:bg-background"
        >
          지우고 다시 입력
        </button>
        <span className="text-xs text-muted">연습용 번호: 482913</span>
      </div>
      <DemoNote>
        {!complete
          ? '숫자를 넣으면 다음 칸으로 저절로 넘어가고, Backspace로는 앞 칸으로 돌아가요.'
          : correct
            ? '✓ 인증번호가 맞아요. 여기서는 버튼을 누르지 않아도 바로 확인합니다.'
            : '인증번호가 달라요. 문자로 받은 6자리를 다시 확인해 주세요.'}
      </DemoNote>
    </div>
  );
}

const filterGroups = [
  { name: '가격', options: ['3만원 이하', '3~7만원', '7만원 이상'] },
  { name: '배송', options: ['무료 배송', '오늘 출발'] },
];

export function FilterChipDemo() {
  const [selected, setSelected] = useState<string[]>(['무료 배송']);
  const total = 128;
  const remaining = Math.max(3, total - selected.length * 37);

  const toggle = (option: string) => {
    setSelected((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
    );
  };

  return (
    <div>
      {filterGroups.map((group) => (
        <div key={group.name} className="mb-3">
          <p className="text-xs font-semibold text-muted">{group.name}</p>
          <div role="group" aria-label={`${group.name} 필터`} className="mt-1.5 flex flex-wrap gap-2">
            {group.options.map((option) => {
              const active = selected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(option)}
                  className={`inline-flex min-h-10 items-center gap-1 rounded-full border px-3.5 text-sm transition-colors ${
                    active
                      ? 'border-primary bg-primary-soft font-semibold text-primary-strong'
                      : 'border-line bg-surface text-muted hover:text-ink'
                  }`}
                >
                  {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {selected.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-card border border-line bg-background p-2.5">
          <span className="text-xs text-muted">적용됨</span>
          {selected.map((option) => (
            <span
              key={option}
              className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary-strong"
            >
              {option}
              <button
                type="button"
                aria-label={`${option} 조건 해제`}
                onClick={() => toggle(option)}
                className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-primary/20"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => setSelected([])}
            className="ml-auto min-h-9 rounded-md px-2 text-xs font-semibold text-muted underline-offset-2 hover:underline"
          >
            전체 해제
          </button>
        </div>
      )}
      <DemoNote>
        조건 {selected.length}개 적용 · 상품 {selected.length === 0 ? total : remaining}개가 남았어요. 결과 개수를 바로
        보여 주면 조건을 조절하기 쉬워집니다.
      </DemoNote>
    </div>
  );
}
