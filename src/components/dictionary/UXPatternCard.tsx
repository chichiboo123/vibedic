import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
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
      className="dot-grid flex h-36 items-center gap-3 overflow-hidden rounded-[0.9rem] border border-line/70 px-4"
    >
      <ol className="min-w-0 flex-1 space-y-1">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-1.5">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                index === 0 ? 'bg-ink text-background' : 'bg-surface text-muted ring-1 ring-line'
              }`}
            >
              {index + 1}
            </span>
            <span className={`truncate text-[11px] ${index === 0 ? 'font-semibold text-ink' : 'text-muted'}`}>{step}</span>
          </li>
        ))}
        {pattern.flowSteps.length > steps.length && (
          <li className="pl-5 font-mono text-[10px] text-muted">+{pattern.flowSteps.length - steps.length}단계</li>
        )}
      </ol>
      {coreUiItem && (
        <span className="flex h-24 w-24 shrink-0 rotate-3 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105">
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
    <article className="spotlight group relative flex flex-col rounded-[1.25rem] border border-line bg-surface p-2 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-raised">
      <div className="relative">
        <UXFlowPreview pattern={pattern} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-background opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2.5 pb-2 pt-3.5">
        <p className="text-[13px] font-medium leading-snug text-primary-strong">“{pattern.userGoal}”</p>
        <h3 className="mt-2 text-[17px] font-bold tracking-tight">
          <Link
            to={`/ux/${pattern.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {pattern.koreanName}
          </Link>
        </h3>
        <p className="font-mono text-[11px] text-muted">{pattern.englishName}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{pattern.summary}</p>
        {relatedUiNames.length > 0 && (
          <p className="mt-3 flex flex-wrap gap-1.5">
            {relatedUiNames.map((name) => (
              <span key={name} className="rounded-full px-2 py-0.5 text-xs text-muted ring-1 ring-line">
                {name}
              </span>
            ))}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <p className="truncate text-xs text-muted">
            {exampleServices.length > 0 ? exampleServices.join(' · ') : ''}
          </p>
          <div className="relative z-10">
            <SaveButton type="ux" id={pattern.id} name={pattern.koreanName} />
          </div>
        </div>
      </div>
    </article>
  );
}
