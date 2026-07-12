import { Link } from 'react-router-dom';
import type { UXPattern } from '../../types';
import { findServiceById } from '../../data/services';
import { findUIItemById } from '../../data/uiItems';
import { SaveButton } from '../common/SaveButton';

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
    <article className="flex flex-col rounded-card border border-line bg-surface p-4 shadow-card transition-shadow hover:shadow-raised">
      <p className="text-xs text-primary-strong">“{pattern.userGoal}”</p>
      <h3 className="mt-1.5 text-base font-bold">
        <Link
          to={`/ux/${pattern.slug}`}
          className="after:absolute after:inset-0 after:content-[''] relative focus-visible:outline-none"
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
    </article>
  );
}
