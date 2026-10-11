import { useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { prefersReducedMotion, useDocumentProgress } from '../../hooks/useScrollEffects';

// 화면 맨 위의 얇은 읽기 진행률 막대입니다. 장식이라 보조기기에는 숨깁니다.
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  useDocumentProgress((progress) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
  });
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-primary via-[#ff5fae] to-[#ff9d4d]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

const RING_RADIUS = 20;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

// 어느 정도 내려가면 나타나는 "맨 위로" 버튼. 테두리 고리가 읽은 만큼 채워집니다.
// 오른쪽 아래 어시스턴트 버튼과 겹치지 않도록 그 위에 둡니다.
export function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useDocumentProgress((progress) => {
    const shouldShow = window.scrollY > 600;
    setVisible((current) => (current === shouldShow ? current : shouldShow));
    ringRef.current?.setAttribute('stroke-dashoffset', String(RING_LENGTH * (1 - progress)));
  });

  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : true}
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
      className={`glass fixed bottom-[5.5rem] right-[1.375rem] z-40 flex h-12 w-12 items-center justify-center rounded-full text-ink shadow-raised transition-all duration-300 hover:-translate-y-0.5 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="24" cy="24" r={RING_RADIUS} fill="none" strokeWidth="2.5" className="stroke-line" />
        <circle
          ref={ringRef}
          cx="24"
          cy="24"
          r={RING_RADIUS}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={RING_LENGTH}
          strokeDashoffset={RING_LENGTH}
          className="stroke-primary"
        />
      </svg>
      <ArrowUp className="relative h-4 w-4" aria-hidden="true" />
    </button>
  );
}
