import { useId, useRef, useState } from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import type { DeviceNotes } from '../../types';

const devices = [
  { key: 'desktop', label: 'PC', Icon: Monitor },
  { key: 'tablet', label: '태블릿', Icon: Tablet },
  { key: 'mobile', label: '모바일', Icon: Smartphone },
] as const;

type DeviceKey = (typeof devices)[number]['key'];

export function DeviceTabs({ notes }: { notes: DeviceNotes }) {
  const [active, setActive] = useState<DeviceKey>('desktop');
  const baseId = useId();
  const tabRefs = useRef<Map<DeviceKey, HTMLButtonElement>>(new Map());

  if (!notes.hasMeaningfulDifference) {
    return (
      <p className="rounded-card border border-line bg-surface p-4 text-sm text-muted">
        이 요소는 기기별 차이가 크지 않아요.
      </p>
    );
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const currentIndex = devices.findIndex((device) => device.key === active);
    let nextIndex = -1;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % devices.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + devices.length) % devices.length;
    if (nextIndex >= 0) {
      event.preventDefault();
      const nextKey = devices[nextIndex].key;
      setActive(nextKey);
      tabRefs.current.get(nextKey)?.focus();
    }
  };

  const activeNote = notes[active];

  return (
    <div>
      <div role="tablist" aria-label="기기 선택" className="flex gap-1 rounded-t-card border border-b-0 border-line bg-background p-1.5">
        {devices.map(({ key, label, Icon }) => (
          <button
            key={key}
            ref={(el) => {
              if (el) tabRefs.current.set(key, el);
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${key}`}
            aria-selected={active === key}
            aria-controls={`${baseId}-panel-${key}`}
            tabIndex={active === key ? 0 : -1}
            onClick={() => setActive(key)}
            onKeyDown={handleKeyDown}
            className={`flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors ${
              active === key ? 'bg-surface text-primary-strong shadow-card' : 'text-muted hover:text-ink'
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="rounded-b-card border border-line bg-surface p-4 text-sm leading-relaxed"
      >
        {activeNote ?? '이 기기에서는 특별한 차이가 없어요.'}
      </div>
    </div>
  );
}
