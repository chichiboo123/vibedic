import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  Bot,
  Copy,
  MonitorSmartphone,
  Search,
  Tag,
  Telescope,
  X,
} from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

type UsageGuideModalProps = {
  open: boolean;
  onClose: () => void;
};

const steps = [
  {
    icon: Search,
    title: '궁금한 것을 검색해요',
    description: '화면에서 본 UI나 겪고 있는 UX 상황을 키워드로 찾아보세요.',
  },
  {
    icon: Tag,
    title: '이름과 역할을 확인해요',
    description: '쉬운 이름, 한국어 공식 명칭, 영문 명칭을 함께 보여줘요.',
  },
  {
    icon: Telescope,
    title: '유명 서비스 사례를 봐요',
    description: 'Google, YouTube 같은 서비스에서 실제로 어떻게 쓰이는지 도식으로 살펴봐요.',
  },
  {
    icon: MonitorSmartphone,
    title: 'PC·태블릿·모바일을 비교해요',
    description: '같은 요소가 기기에 따라 어떻게 달라지는지 확인해요.',
  },
  {
    icon: Copy,
    title: '프롬프트를 복사해요',
    description: '내 웹앱에 바로 적용할 수 있는 바이브코딩 프롬프트를 복사해요.',
  },
  {
    icon: Bookmark,
    title: '필요하면 저장해요',
    description: '자주 참고할 항목을 저장함에 담아 두면 언제든 다시 꺼내 볼 수 있어요.',
  },
];

// 헤더의 사용법 버튼이나 모바일 메뉴에서 열리는, VibeDic 사용 흐름을 보여주는 안내 모달입니다.
export function UsageGuideModal({ open, onClose }: UsageGuideModalProps) {
  const modalRef = useFocusTrap<HTMLDivElement>(open, onClose);

  if (!open) return null;

  // header의 backdrop-blur가 fixed 자손의 containing block이 되는 것을 피하려고 body에 포털로 렌더링합니다.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="usage-guide-title"
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-card bg-surface p-5 shadow-raised sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-primary-strong">VibeDic 사용법</p>
            <h2 id="usage-guide-title" className="mt-0.5 text-lg font-bold">
              이렇게 꺼내 찾아보세요
            </h2>
          </div>
          <button
            type="button"
            aria-label="사용법 닫기"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted hover:bg-background hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <ol className="mt-5 space-y-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-3 rounded-card border border-line bg-background p-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary-strong"
              >
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  <step.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {step.title}
                </p>
                <p className="mt-0.5 text-sm text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex items-start gap-2 rounded-card bg-primary-soft/50 p-3 text-sm">
          <Bot className="mt-0.5 h-4 w-4 shrink-0 text-primary-strong" aria-hidden="true" />
          <p>
            무엇을 찾아야 할지 모르겠다면 우측 하단의{' '}
            <span className="font-semibold">VibeDic 어시스턴트</span>에게 상황을 설명해 보세요.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/ui"
            onClick={onClose}
            className="min-h-11 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            UI 사전 둘러보기
          </Link>
          <Link
            to="/ux"
            onClick={onClose}
            className="min-h-11 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold hover:bg-background"
          >
            UX 사전 둘러보기
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
