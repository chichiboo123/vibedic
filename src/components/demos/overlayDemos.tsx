import { useId, useRef, useState, type ReactNode } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useToast } from '../common/ToastProvider';
import { useFocusTrap } from '../../hooks/useFocusTrap';

function Overlay({ onClose, children, align }: { onClose: () => void; children: ReactNode; align: 'center' | 'bottom' }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center bg-ink/50 p-4 ${
        align === 'center' ? 'items-center' : 'items-end p-0'
      }`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </div>
  );
}

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const trapRef = useFocusTrap<HTMLDivElement>(open, () => setOpen(false));
  const { showToast } = useToast();

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="min-h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-strong"
      >
        공유 설정 열기
      </button>
      {open && (
        <Overlay onClose={() => setOpen(false)} align="center">
          <div
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-sm rounded-card bg-surface p-5 shadow-raised"
          >
            <div className="flex items-start justify-between">
              <h3 id={titleId} className="text-base font-bold">
                공유 설정
              </h3>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-background"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">
              링크가 있는 모든 사람이 이 문서를 볼 수 있어요. ESC나 바깥을 눌러도 닫혀요.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-11 rounded-lg border border-line px-4 text-sm font-semibold hover:bg-background"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  showToast('링크를 복사했어요.');
                }}
                className="min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-strong"
              >
                링크 복사
              </button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
}

export function AlertDialogDemo() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(['여행 계획.md', '가계부.xlsx']);
  const titleId = useId();
  const descId = useId();
  const trapRef = useFocusTrap<HTMLDivElement>(open, () => setOpen(false));
  const { showToast } = useToast();

  const target = items[0];

  return (
    <div>
      <ul className="max-w-xs space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-center justify-between rounded-md border border-line bg-surface px-3 py-2 text-sm">
            {item}
          </li>
        ))}
        {items.length === 0 && <li className="text-sm text-muted">모든 파일을 삭제했어요.</li>}
      </ul>
      {items.length > 0 && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 min-h-11 rounded-lg border border-error px-4 text-sm font-semibold text-error hover:bg-red-50"
        >
          첫 번째 파일 삭제
        </button>
      )}
      {open && target && (
        <Overlay onClose={() => setOpen(false)} align="center">
          <div
            ref={trapRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="w-full max-w-sm rounded-card bg-surface p-5 shadow-raised"
          >
            <h3 id={titleId} className="text-base font-bold">
              파일을 삭제할까요?
            </h3>
            <p id={descId} className="mt-2 text-sm text-muted">
              “{target}” 파일이 삭제되며 되돌릴 수 없어요.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-11 rounded-lg border border-line px-4 text-sm font-semibold hover:bg-background"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => {
                  setItems((current) => current.slice(1));
                  setOpen(false);
                  showToast(`삭제했어요: ${target}`);
                }}
                className="min-h-11 rounded-lg bg-error px-4 text-sm font-semibold text-white hover:opacity-90"
              >
                삭제
              </button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
}

export function BottomSheetDemo() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const trapRef = useFocusTrap<HTMLDivElement>(open, () => setOpen(false));
  const { showToast } = useToast();

  const options = ['링크 복사', '메시지로 보내기', '저장함에 담기'];

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="min-h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-strong"
      >
        공유 시트 열기
      </button>
      {open && (
        <Overlay onClose={() => setOpen(false)} align="bottom">
          <div
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-md rounded-t-card bg-surface p-4 pb-6 shadow-raised"
          >
            <span aria-hidden="true" className="mx-auto block h-1 w-10 rounded-full bg-line" />
            <div className="mt-3 flex items-center justify-between">
              <h3 id={titleId} className="text-base font-bold">
                공유하기
              </h3>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-background"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <ul className="mt-2">
              {options.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      showToast(`${option}를 실행했어요.`);
                    }}
                    className="w-full rounded-md px-2 py-3 text-left text-sm hover:bg-background"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Overlay>
      )}
    </div>
  );
}

export function TooltipDemo() {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();
  return (
    <div className="flex items-center gap-3">
      <span className="relative inline-block">
        <button
          type="button"
          aria-describedby={visible ? tooltipId : undefined}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          onFocus={() => setVisible(true)}
          onBlur={() => setVisible(false)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-sm font-bold text-muted hover:text-ink"
        >
          ?
        </button>
        {visible && (
          <span
            id={tooltipId}
            role="tooltip"
            className="absolute bottom-full left-1/2 mb-2 w-max max-w-[200px] -translate-x-1/2 rounded-md bg-ink px-2.5 py-1.5 text-xs text-white"
          >
            도움말 버튼이에요. 포커스해도 보여요.
          </span>
        )}
      </span>
      <span className="text-sm text-muted">마우스를 올리거나 Tab으로 포커스해 보세요.</span>
    </div>
  );
}

const faqs = [
  { q: '저장한 항목은 어디에 보관되나요?', a: '브라우저의 localStorage에 저장되어 같은 기기에서 다시 볼 수 있어요.' },
  { q: '로그인이 필요한가요?', a: '아니요. 모든 기능은 로그인 없이 사용할 수 있어요.' },
  { q: '프롬프트는 어떻게 쓰나요?', a: '복사한 프롬프트를 AI 코딩 도구에 붙여 넣어 UI 구현을 요청하면 돼요.' },
];

export function AccordionDemo() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  return (
    <div className="max-w-md divide-y divide-line rounded-card border border-line bg-surface">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.q}>
            <h4>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex min-h-12 w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold hover:bg-background"
              >
                {faq.q}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </h4>
            {isOpen && (
              <div id={`${baseId}-panel-${index}`} className="px-4 pb-4 text-sm text-muted">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function ToastDemo() {
  const { showToast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => showToast('저장했어요.')}
        className="min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-strong"
      >
        저장 토스트 띄우기
      </button>
      <button
        type="button"
        onClick={() => showToast('링크를 복사했어요.')}
        className="min-h-11 rounded-lg border border-line bg-surface px-4 text-sm font-semibold hover:bg-background"
      >
        복사 토스트 띄우기
      </button>
    </div>
  );
}

const tabContents = [
  { label: '상품 정보', body: '가볍고 튼튼한 소재로 만든 데모 상품이에요. 이 영역은 탭마다 다른 내용을 보여줘요.' },
  { label: '리뷰 12', body: '“배송이 빨라요!” 같은 리뷰가 이 탭에 모여 있어요.' },
  { label: '문의', body: '재입고 일정 같은 질문과 답변이 표시되는 탭이에요.' },
];

export function TabDemo() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    let next = -1;
    if (event.key === 'ArrowRight') next = (active + 1) % tabContents.length;
    if (event.key === 'ArrowLeft') next = (active - 1 + tabContents.length) % tabContents.length;
    if (next >= 0) {
      event.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="max-w-md">
      <div role="tablist" aria-label="상품 상세 탭" className="flex border-b border-line">
        {tabContents.map((tab, index) => (
          <button
            key={tab.label}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${index}`}
            aria-selected={active === index}
            aria-controls={`${baseId}-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={handleKeyDown}
            className={`min-h-11 px-4 text-sm font-medium transition-colors ${
              active === index
                ? 'border-b-2 border-primary font-semibold text-primary-strong'
                : 'text-muted hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="p-4 text-sm text-muted"
      >
        {tabContents[active].body}
      </div>
    </div>
  );
}

export function ProgressDemo() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const start = () => {
    setProgress(0);
    setRunning(true);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setProgress((current) => {
        const next = current + 10;
        if (next >= 100) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          setRunning(false);
          return 100;
        }
        return next;
      });
    }, 300);
  };

  return (
    <div className="max-w-sm">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label="작업 진행률"
        className="h-3 overflow-hidden rounded-full bg-line"
      >
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-muted" role="status">
          {progress === 100 ? '✓ 완료!' : running ? `진행 중 ${progress}%` : '버튼을 눌러 시작하세요.'}
        </span>
        <button
          type="button"
          onClick={start}
          disabled={running}
          className="min-h-10 rounded-lg border border-line bg-surface px-3.5 text-sm font-semibold hover:bg-background disabled:opacity-50"
        >
          {progress === 100 ? '다시 실행' : '시작'}
        </button>
      </div>
    </div>
  );
}

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  const total = 5;
  return (
    <nav aria-label="페이지 이동">
      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
            className="flex h-10 min-w-10 items-center justify-center rounded-md border border-line px-2 text-sm disabled:opacity-40"
          >
            이전
          </button>
        </li>
        {Array.from({ length: total }, (_, index) => index + 1).map((number) => (
          <li key={number}>
            <button
              type="button"
              aria-current={page === number ? 'page' : undefined}
              onClick={() => setPage(number)}
              className={`flex h-10 w-10 items-center justify-center rounded-md text-sm ${
                page === number ? 'bg-primary font-semibold text-white' : 'border border-line hover:bg-background'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            disabled={page === total}
            onClick={() => setPage((current) => current + 1)}
            className="flex h-10 min-w-10 items-center justify-center rounded-md border border-line px-2 text-sm disabled:opacity-40"
          >
            다음
          </button>
        </li>
      </ul>
      <p className="mt-2 text-sm text-muted" role="status">
        {total}쪽 중 {page}쪽을 보고 있어요.
      </p>
    </nav>
  );
}

export function SkeletonDemo() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="max-w-sm">
      {loading ? (
        <div className="animate-pulse space-y-2 rounded-card border border-line bg-surface p-4 motion-reduce:animate-none">
          <div className="h-24 rounded-md bg-line/70" />
          <div className="h-3 w-3/4 rounded bg-line/70" />
          <div className="h-3 w-1/2 rounded bg-line/70" />
        </div>
      ) : (
        <div className="rounded-card border border-line bg-surface p-4">
          <div className="flex h-24 items-center justify-center rounded-md bg-primary-soft text-3xl">🎉</div>
          <p className="mt-2 text-sm font-semibold">콘텐츠가 도착했어요!</p>
          <p className="text-sm text-muted">스켈레톤과 같은 구조라 화면이 튀지 않아요.</p>
        </div>
      )}
      <button
        type="button"
        onClick={() => setLoading((current) => !current)}
        className="mt-3 min-h-10 rounded-lg border border-line bg-surface px-3.5 text-sm font-semibold hover:bg-background"
      >
        {loading ? '콘텐츠 보기' : '다시 로딩 상태로'}
      </button>
    </div>
  );
}
