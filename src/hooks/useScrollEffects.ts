import { useEffect, useRef, useState, type RefObject } from 'react';

// 스크롤 효과에서 함께 쓰는 도구 모음입니다.
// 매 프레임 React 상태를 바꾸지 않도록, 진행률은 CSS 변수나 style에 직접 써 넣습니다.

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// 스크롤·리사이즈 때 한 프레임에 한 번만 콜백을 부릅니다.
export function onScrollFrame(callback: () => void): () => void {
  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      callback();
    });
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  callback();
  return () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    if (frame) window.cancelAnimationFrame(frame);
  };
}

/** 문서 전체 스크롤 진행률(0~1)을 콜백으로 넘깁니다. */
export function useDocumentProgress(onProgress: (progress: number) => void) {
  const callbackRef = useRef(onProgress);
  callbackRef.current = onProgress;

  useEffect(
    () =>
      onScrollFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        callbackRef.current(max > 0 ? clamp01(window.scrollY / max) : 0);
      }),
    [],
  );
}

/**
 * 요소가 화면을 지나가는 진행률을 --progress 변수(0~1)로 써 넣습니다.
 * mode 'through'는 요소 위쪽이 화면 아래에 닿을 때 0, 요소 아래쪽이 화면 위를 벗어날 때 1입니다.
 * mode 'pinned'는 높이가 화면보다 큰 고정(sticky) 구간 안에서 얼마나 내려왔는지를 셉니다.
 */
export function useElementProgress<T extends HTMLElement>(
  mode: 'through' | 'pinned' = 'through',
  onProgress?: (progress: number, element: T) => void,
): RefObject<T> {
  const ref = useRef<T>(null);
  const callbackRef = useRef(onProgress);
  callbackRef.current = onProgress;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (prefersReducedMotion()) {
      element.style.setProperty('--progress', '1');
      return;
    }
    return onScrollFrame(() => {
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress =
        mode === 'pinned'
          ? clamp01(-rect.top / Math.max(1, rect.height - viewport))
          : clamp01((viewport - rect.top) / Math.max(1, rect.height + viewport));
      element.style.setProperty('--progress', progress.toFixed(4));
      callbackRef.current?.(progress, element);
    });
  }, [mode]);

  return ref;
}

/** 스크롤 위치와 방향을 기준으로 헤더 숨김·축소 여부를 알려 줍니다. */
export function useScrollDirection(threshold = 8) {
  const [state, setState] = useState({ scrolled: false, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    return onScrollFrame(() => {
      const y = window.scrollY;
      const delta = y - lastY;
      setState((current) => {
        const scrolled = y > threshold;
        // 아래로 내리면 숨기고, 조금이라도 올리면 다시 보여 줍니다. 맨 위 근처에서는 항상 보입니다.
        let hidden = current.hidden;
        if (y < 160) hidden = false;
        else if (delta > 6) hidden = true;
        else if (delta < -6) hidden = false;
        return scrolled === current.scrolled && hidden === current.hidden ? current : { scrolled, hidden };
      });
      lastY = y;
    });
  }, [threshold]);

  return state;
}

/**
 * [data-reveal]·[data-reveal-stagger] 요소와 [data-reveal-each]의 자식이 화면에 들어오면 is-revealed 클래스를 붙여 나타나게 합니다.
 * 페이지 이동이나 필터로 새 요소가 생겨도 MutationObserver가 찾아서 관찰합니다.
 * IntersectionObserver가 없거나 움직임 줄이기 설정이면 아무것도 숨기지 않습니다.
 */
export function useRevealOnScroll(rootSelector = '#main-content') {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return;
    const root = document.querySelector(rootSelector);
    if (!root) return;

    document.documentElement.classList.add('reveal-ready');

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          intersection.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    const observeAll = () => {
      const selector =
        '[data-reveal]:not(.is-revealed), [data-reveal-stagger]:not(.is-revealed), [data-reveal-each] > :not(.is-revealed)';
      root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        intersection.observe(element);
      });
    };
    observeAll();

    const mutation = new MutationObserver(observeAll);
    mutation.observe(root, { childList: true, subtree: true });

    return () => {
      mutation.disconnect();
      intersection.disconnect();
      document.documentElement.classList.remove('reveal-ready');
    };
  }, [rootSelector]);
}

/** 화면에 들어오면 0에서 목표 숫자까지 세어 올라갑니다. */
export function useCountUp(target: number, duration = 1200) {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return;
    setValue(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = clamp01((now - start) / duration);
          // 끝에서 천천히 멈추는 ease-out
          setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      setValue(target);
    };
  }, [target, duration]);

  return { ref, value };
}
