import type { ReactNode } from 'react';
import type { DemoType, UICategoryId } from '../../types';
import { PreviewGlyph } from './MiniPreview';

// 실제 서비스 화면을 단순화한 CSS 와이어프레임 위에
// 설명하려는 UI 요소를 강조해 보여주는 도식입니다.
// 실제 스크린샷·로고는 사용하지 않습니다.

type ExampleFigureProps = {
  serviceId: string;
  serviceName: string;
  demoType: DemoType;
  category: UICategoryId;
};

const phoneServices = new Set(['kakaotalk', 'instagram', 'duolingo']);

// 요소 성격에 따라 강조 패널의 위치를 정합니다.
function overlayPosition(demoType: DemoType, category: UICategoryId): 'top' | 'center' | 'bottom' {
  if (demoType === 'bottom-sheet' || demoType === 'toast' || demoType === 'fab') return 'bottom';
  if (demoType === 'banner' || demoType === 'breadcrumb') return 'top';
  if (category === 'layout' && demoType === 'static') return 'top';
  return 'center';
}

export function ExampleFigure({ serviceId, serviceName, demoType, category }: ExampleFigureProps) {
  const isPhone = phoneServices.has(serviceId);
  const position = overlayPosition(demoType, category);

  const overlay = (
    <div
      className={`pointer-events-none absolute inset-x-0 flex justify-center px-2 ${
        position === 'top' ? 'top-2' : position === 'bottom' ? 'bottom-2' : 'top-1/2 -translate-y-1/2'
      }`}
    >
      <div className="max-w-full scale-[0.85] rounded-lg bg-surface p-2 shadow-raised ring-2 ring-primary">
        <PreviewGlyph demoType={demoType} category={category} />
      </div>
    </div>
  );

  if (isPhone) {
    return (
      <figure aria-label={`${serviceName} 화면을 단순화한 도식`} className="shrink-0">
        <div className="relative h-44 w-24 overflow-hidden rounded-xl border-2 border-line bg-background">
          <div className="h-full p-1 opacity-60">
            <ServiceBackdrop serviceId={serviceId} />
          </div>
          {overlay}
        </div>
      </figure>
    );
  }

  return (
    <figure aria-label={`${serviceName} 화면을 단순화한 도식`} className="shrink-0">
      <div className="relative h-32 w-full overflow-hidden rounded-lg border-2 border-line bg-background sm:w-48">
        <div className="flex h-4 items-center gap-1 border-b border-line bg-surface px-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="ml-1 h-1.5 flex-1 rounded-full bg-background" />
        </div>
        <div className="relative h-[calc(100%-1rem)]">
          <div className="h-full p-1.5 opacity-60">
            <ServiceBackdrop serviceId={serviceId} />
          </div>
          {overlay}
        </div>
      </div>
    </figure>
  );
}

function Bar({ className }: { className: string }) {
  return <span className={`block rounded-sm ${className}`} />;
}

function ServiceBackdrop({ serviceId }: { serviceId: string }): ReactNode {
  switch (serviceId) {
    case 'google':
      return (
        <div className="flex h-full flex-col items-center justify-center gap-1.5">
          <div className="flex gap-0.5 text-[8px] font-bold leading-none">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-amber-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-emerald-600">l</span>
            <span className="text-red-500">e</span>
          </div>
          <Bar className="h-3 w-3/4 rounded-full border border-line bg-surface" />
          <div className="flex gap-1">
            <Bar className="h-2 w-8 bg-line/70" />
            <Bar className="h-2 w-8 bg-line/70" />
          </div>
        </div>
      );
    case 'youtube':
      return (
        <div className="flex h-full flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="flex h-2.5 w-4 items-center justify-center rounded-sm bg-red-600">
              <span className="ml-px border-y-[2px] border-l-[3px] border-y-transparent border-l-white" />
            </span>
            <Bar className="h-2 flex-1 rounded-full border border-line bg-surface" />
          </div>
          <div className="relative flex-1 rounded-sm bg-zinc-800">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-y-[3px] border-l-[5px] border-y-transparent border-l-white/80" />
            <Bar className="absolute inset-x-1 bottom-1 h-0.5 bg-red-600" />
          </div>
          <div className="flex gap-1">
            <Bar className="h-3 flex-1 bg-line/70" />
            <Bar className="h-3 flex-1 bg-line/70" />
            <Bar className="h-3 flex-1 bg-line/70" />
          </div>
        </div>
      );
    case 'netflix':
      return (
        <div className="flex h-full flex-col gap-1 rounded-sm bg-zinc-900 p-1">
          <span className="text-[8px] font-black leading-none text-red-600">N</span>
          <Bar className="h-4 w-full bg-zinc-700" />
          <div className="flex gap-0.5">
            {[0, 1, 2, 3].map((posterIndex) => (
              <Bar key={posterIndex} className="h-5 flex-1 bg-zinc-600" />
            ))}
          </div>
        </div>
      );
    case 'instagram':
      return (
        <div className="flex h-full flex-col gap-1">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((storyIndex) => (
              <span
                key={storyIndex}
                className="h-3 w-3 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-500 p-px"
              >
                <span className="block h-full w-full rounded-full bg-surface" />
              </span>
            ))}
          </div>
          <Bar className="flex-1 bg-line/70" />
          <div className="flex justify-around">
            {[0, 1, 2, 3, 4].map((navIndex) => (
              <Bar key={navIndex} className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
            ))}
          </div>
        </div>
      );
    case 'notion':
      return (
        <div className="flex h-full gap-1">
          <div className="w-1/4 space-y-0.5 rounded-sm bg-zinc-100 p-0.5">
            <Bar className="h-1 w-full bg-line" />
            <Bar className="h-1 w-3/4 bg-line" />
            <Bar className="h-1 w-full bg-line" />
          </div>
          <div className="flex-1 space-y-1 pt-1">
            <Bar className="h-2 w-1/2 bg-zinc-400" />
            <Bar className="h-1 w-full bg-line" />
            <Bar className="h-1 w-full bg-line" />
            <Bar className="h-1 w-2/3 bg-line" />
          </div>
        </div>
      );
    case 'canva':
      return (
        <div className="flex h-full gap-1">
          <div className="flex w-1/4 flex-col gap-0.5 rounded-sm bg-violet-100 p-0.5">
            {[0, 1, 2].map((toolIndex) => (
              <Bar key={toolIndex} className="h-2 w-full bg-violet-300" />
            ))}
          </div>
          <div className="flex flex-1 items-center justify-center rounded-sm bg-zinc-100">
            <Bar className="h-2/3 w-2/3 bg-gradient-to-br from-violet-300 to-teal-200" />
          </div>
        </div>
      );
    case 'google-drive':
      return (
        <div className="flex h-full flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 bg-gradient-to-br from-blue-500 via-emerald-500 to-amber-400 [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
            <Bar className="h-2 flex-1 rounded-full border border-line bg-surface" />
          </div>
          {[0, 1, 2, 3].map((rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-1">
              <Bar className="h-1.5 w-1.5 bg-blue-300" />
              <Bar className="h-1.5 flex-1 bg-line/70" />
              <Bar className="h-1.5 w-4 bg-line/50" />
            </div>
          ))}
        </div>
      );
    case 'google-docs':
      return (
        <div className="flex h-full flex-col items-center gap-1">
          <div className="flex w-full gap-0.5">
            {[0, 1, 2, 3, 4, 5].map((toolIndex) => (
              <Bar key={toolIndex} className="h-1.5 w-1.5 bg-blue-200" />
            ))}
          </div>
          <div className="w-3/4 flex-1 space-y-1 rounded-sm border border-line bg-surface p-1">
            <Bar className="h-1 w-full bg-line" />
            <Bar className="h-1 w-full bg-line" />
            <Bar className="h-1 w-1/2 bg-line" />
          </div>
        </div>
      );
    case 'kakaotalk':
      return (
        <div className="flex h-full flex-col gap-1 rounded-sm bg-amber-300/90 p-1">
          {[0, 1, 2, 3].map((chatIndex) => (
            <div key={chatIndex} className="flex items-center gap-1 rounded-sm bg-white/80 p-0.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
              <div className="flex-1 space-y-0.5">
                <Bar className="h-1 w-2/3 bg-zinc-400" />
                <Bar className="h-1 w-full bg-zinc-300" />
              </div>
            </div>
          ))}
        </div>
      );
    case 'coupang':
      return (
        <div className="flex h-full flex-col gap-1">
          <Bar className="h-2.5 w-full rounded-full border border-blue-300 bg-surface" />
          <div className="grid flex-1 grid-cols-3 gap-0.5">
            {[0, 1, 2, 3, 4, 5].map((productIndex) => (
              <div key={productIndex} className="space-y-0.5">
                <Bar className="h-3 w-full bg-line/70" />
                <Bar className="h-1 w-full bg-rose-300" />
              </div>
            ))}
          </div>
        </div>
      );
    case 'naver':
      return (
        <div className="flex h-full flex-col gap-1">
          <div className="flex items-center gap-1 rounded-sm bg-emerald-500 p-1">
            <span className="text-[8px] font-black leading-none text-white">N</span>
            <Bar className="h-2 flex-1 rounded-full bg-white" />
          </div>
          <div className="grid flex-1 grid-cols-2 gap-0.5">
            {[0, 1, 2, 3].map((panelIndex) => (
              <Bar key={panelIndex} className="h-full bg-line/60" />
            ))}
          </div>
        </div>
      );
    case 'airbnb':
      return (
        <div className="flex h-full flex-col gap-1">
          <Bar className="mx-auto h-2.5 w-3/4 rounded-full border border-line bg-surface shadow-sm" />
          <div className="grid flex-1 grid-cols-3 gap-0.5">
            {[0, 1, 2].map((stayIndex) => (
              <div key={stayIndex} className="space-y-0.5">
                <Bar className="h-4 w-full rounded-md bg-rose-200" />
                <Bar className="h-1 w-full bg-line/70" />
              </div>
            ))}
          </div>
        </div>
      );
    case 'chatgpt':
      return (
        <div className="flex h-full flex-col justify-end gap-1 p-0.5">
          <Bar className="ml-auto h-2.5 w-1/2 rounded-md bg-line/80" />
          <Bar className="h-2.5 w-2/3 rounded-md bg-teal-100" />
          <Bar className="h-3 w-full rounded-full border border-line bg-surface" />
        </div>
      );
    case 'gmail':
      return (
        <div className="flex h-full flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <span className="text-[8px] font-black leading-none text-red-500">M</span>
            <Bar className="h-2 flex-1 rounded-full bg-line/50" />
          </div>
          {[0, 1, 2, 3].map((mailIndex) => (
            <div key={mailIndex} className="flex items-center gap-1">
              <Bar className="h-1.5 w-1.5 rounded-full bg-line" />
              <Bar className={`h-1.5 flex-1 ${mailIndex === 0 ? 'bg-zinc-400' : 'bg-line/70'}`} />
            </div>
          ))}
        </div>
      );
    case 'duolingo':
      return (
        <div className="flex h-full flex-col items-center justify-around bg-emerald-50 py-1">
          {[0, 1, 2, 3].map((lessonIndex) => (
            <span
              key={lessonIndex}
              className={`h-4 w-4 rounded-full ${lessonIndex === 0 ? 'bg-emerald-500' : 'bg-line'} ${
                lessonIndex % 2 === 1 ? 'translate-x-3' : '-translate-x-3'
              }`}
            />
          ))}
        </div>
      );
    case 'google-calendar':
      return (
        <div className="flex h-full flex-col gap-0.5">
          <Bar className="h-1.5 w-1/3 bg-blue-300" />
          <div className="grid flex-1 grid-cols-7 gap-px">
            {Array.from({ length: 21 }, (_, cellIndex) => (
              <span
                key={cellIndex}
                className={`rounded-[1px] ${cellIndex === 9 ? 'bg-blue-400' : 'bg-line/50'}`}
              />
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="flex h-full flex-col gap-1">
          <Bar className="h-2 w-full bg-line/70" />
          <Bar className="h-full w-full bg-line/40" />
        </div>
      );
  }
}
