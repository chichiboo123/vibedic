import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { deviceComparisons } from '../data/deviceComparisons';
import type { DeviceComparison } from '../types';
import { RelatedUICards, RelatedUXCards } from '../components/dictionary/RelatedLinks';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const deviceMeta = [
  { key: 'desktop', label: 'PC', Icon: Monitor },
  { key: 'tablet', label: '태블릿', Icon: Tablet },
  { key: 'mobile', label: '모바일', Icon: Smartphone },
] as const;

export function ComparePage() {
  useDocumentTitle('기기별 비교');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView();
    }
  }, [location.hash]);

  return (
    <div>
      <header>
        <h1 className="text-2xl font-bold">기기별 비교</h1>
        <p className="mt-1.5 text-sm text-muted">
          같은 UI와 UX가 PC, 태블릿, 모바일에서 어떻게 달라지는지 {deviceComparisons.length}가지
          주제로 비교해 보세요.
        </p>
      </header>

      <nav aria-label="비교 주제 목차" className="mt-5">
        <ul className="flex flex-wrap gap-2">
          {deviceComparisons.map((comparison) => (
            <li key={comparison.id}>
              <a
                href={`#/compare#${comparison.slug}`}
                className="inline-flex min-h-9 items-center rounded-full border border-line bg-surface px-3 text-xs text-muted hover:border-primary hover:text-primary-strong"
              >
                {comparison.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 space-y-10">
        {deviceComparisons.map((comparison) => (
          <ComparisonSection key={comparison.id} comparison={comparison} />
        ))}
      </div>
    </div>
  );
}

function ComparisonSection({ comparison }: { comparison: DeviceComparison }) {
  const [activeDevice, setActiveDevice] = useState<(typeof deviceMeta)[number]['key']>('desktop');

  return (
    <section
      id={comparison.slug}
      aria-label={comparison.title}
      className="scroll-mt-20 rounded-card border border-line bg-surface p-5"
    >
      <h2 className="text-lg font-bold">{comparison.title}</h2>
      <p className="mt-1 text-sm text-muted">{comparison.summary}</p>

      {/* PC: 세 기기를 나란히 비교 */}
      <div className="mt-4 hidden gap-4 lg:grid lg:grid-cols-3">
        {deviceMeta.map(({ key, label, Icon }) => (
          <div key={key} className="rounded-card border border-line bg-background p-4">
            <h3 className="flex items-center gap-1.5 text-sm font-bold">
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              {label}
            </h3>
            <DeviceFrame deviceKey={key} />
            <p className="mt-3 text-sm leading-relaxed text-muted">{comparison[key]}</p>
          </div>
        ))}
      </div>

      {/* 모바일·태블릿: 탭으로 하나씩 전환 */}
      <div className="mt-4 lg:hidden">
        <div role="group" aria-label="기기 선택" className="flex gap-1 rounded-xl bg-background p-1">
          {deviceMeta.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              aria-pressed={activeDevice === key}
              onClick={() => setActiveDevice(key)}
              className={`flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg text-sm font-medium ${
                activeDevice === key ? 'bg-surface text-primary-strong shadow-card' : 'text-muted'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
        <div className="mt-3 rounded-card border border-line bg-background p-4">
          <DeviceFrame deviceKey={activeDevice} />
          <p className="mt-3 text-sm leading-relaxed text-muted">{comparison[activeDevice]}</p>
        </div>
      </div>

      {(comparison.relatedUiIds.length > 0 || comparison.relatedUxIds.length > 0) && (
        <div className="mt-5">
          <h3 className="mb-2 text-sm font-bold">관련 사전 항목</h3>
          <div className="space-y-2">
            <RelatedUICards ids={comparison.relatedUiIds} />
            <RelatedUXCards ids={comparison.relatedUxIds} />
          </div>
        </div>
      )}
    </section>
  );
}

// CSS로만 그린 단순한 기기 프레임 도식입니다.
function DeviceFrame({ deviceKey }: { deviceKey: 'desktop' | 'tablet' | 'mobile' }) {
  if (deviceKey === 'desktop') {
    return (
      <div aria-hidden="true" className="mt-3">
        <div className="aspect-[16/9] rounded-md border-2 border-line bg-surface p-1.5">
          <div className="h-2 rounded-sm bg-primary-soft" />
          <div className="mt-1 flex h-[70%] gap-1">
            <div className="w-1/5 rounded-sm bg-line/60" />
            <div className="flex-1 rounded-sm bg-line/30" />
          </div>
        </div>
        <div className="mx-auto h-2 w-10 rounded-b bg-line" />
      </div>
    );
  }
  if (deviceKey === 'tablet') {
    return (
      <div aria-hidden="true" className="mt-3 flex justify-center">
        <div className="aspect-[4/5] w-28 rounded-lg border-2 border-line bg-surface p-1.5">
          <div className="flex h-full gap-1">
            <div className="w-3 rounded-sm bg-line/60" />
            <div className="flex-1 space-y-1">
              <div className="h-2 rounded-sm bg-primary-soft" />
              <div className="h-[80%] rounded-sm bg-line/30" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div aria-hidden="true" className="mt-3 flex justify-center">
      <div className="aspect-[9/16] w-16 rounded-xl border-2 border-line bg-surface p-1">
        <div className="flex h-full flex-col gap-0.5">
          <div className="h-1.5 rounded-sm bg-primary-soft" />
          <div className="flex-1 rounded-sm bg-line/30" />
          <div className="h-2 rounded-sm bg-line/60" />
        </div>
      </div>
    </div>
  );
}
