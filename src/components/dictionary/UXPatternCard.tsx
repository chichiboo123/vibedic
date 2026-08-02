import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { UXPattern } from '../../types';
import { findServiceById } from '../../data/services';
import { findUIItemById } from '../../data/uiItems';
import { SaveButton } from '../common/SaveButton';
import { PreviewGlyph } from './MiniPreview';

// UX 패턴 썸네일: 대표 흐름의 앞 세 단계와, 그 흐름에서 핵심이 되는 UI 요소의 도식을
// 함께 보여 줍니다. 어떤 패턴인지 보고 바로 상세로 들어갈 수 있게 하는 자리입니다.
function UXFlowPreview({ pattern }: { pattern: UXPattern }) {
  const coreUiItem = findUIItemById(pattern.relatedUiIds[0]);
  const steps = pattern.flowSteps.slice(0, 3);

  return (
    <div
      aria-hidden="true"
      className="flex h-28 items-center gap-3 overflow-hidden rounded-t-card border-b border-line bg-background px-4"
    >
      <ol className="min-w-0 flex-1 space-y-1">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-1.5">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                index === 0 ? 'bg-primary text-white' : 'bg-primary-soft text-primary-strong'
              }`}
            >
              {index + 1}
            </span>
            <span className="truncate text-[11px] text-muted">{step}</span>
          </li>
        ))}
        {pattern.flowSteps.length > steps.length && (
          <li className="pl-5 text-[10px] text-muted">+{pattern.flowSteps.length - steps.length}단계</li>
        )}
      </ol>
      {coreUiItem && (
        <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface">
          <span className="scale-[0.62]">
            <PreviewGlyph demoType={coreUiItem.demoType} category={coreUiItem.category} />
          </span>
        </span>
      )}
    </div>
  );
}

export function UXPatternCard({ pattern }: { pattern: UXPattern }) {
  const relatedUiNames = pattern.relatedUiIds
    .slice(0, 3)
    .map((id) => findUIItemById(id)?.koreanName)
    .filter((name): name is string => Boolean(name));
  const exampleServices = pattern.serviceExamples
    .slice(0, 2)
    .map((example) => findServiceById(example.serviceId)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    // 카드 전체가 링크입니다. 썸네일이든 설명이든 어디를 눌러도 상세로 들어갑니다.
    <article className="group relative flex flex-col rounded-card border border-line bg-surface shadow-card transition-shadow hover:shadow-raised">
      <div className="relative">
        <UXFlowPreview pattern={pattern} />
        <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold text-primary-strong opacity-0 shadow-card transition-opacity group-hover:opacity-100">
          자세히 보기
          <ArrowRight className="h-2.5 w-2.5" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-primary-strong">“{pattern.userGoal}”</p>
        <h3 className="mt-1.5 text-base font-bold">
          <Link
            to={`/ux/${pattern.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {pattern.koreanName}
          </Link>
        </h3>
        <p className="text-xs font-medium text-muted">{pattern.englishName}</p>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{pattern.summary}</p>
        {relatedUiNames.length > 0 && (
          <p className="mt-3 flex flex-wrap gap-1.5">
            {relatedUiNames.map((name) => (
              <span key={name} className="rounded-full bg-background px-2 py-0.5 text-xs text-muted">
                {name}
              </span>
            ))}
          </p>
        )}
        <div className="mt-3 flex items-end justify-between gap-2 pt-1">
          <p className="text-xs text-muted">
            {exampleServices.length > 0 ? `사례: ${exampleServices.join(', ')}` : ''}
          </p>
          <div className="relative z-10">
            <SaveButton type="ux" id={pattern.id} name={pattern.koreanName} />
          </div>
        </div>
      </div>
    </article>
  );
}
