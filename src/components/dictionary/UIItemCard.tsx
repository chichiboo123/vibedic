import { Link } from 'react-router-dom';
import type { UIItem } from '../../types';
import { findServiceById } from '../../data/services';
import { MiniPreview } from './MiniPreview';
import { SaveButton } from '../common/SaveButton';

export function UIItemCard({ item }: { item: UIItem }) {
  const exampleServices = item.serviceExamples
    .slice(0, 2)
    .map((example) => findServiceById(example.serviceId)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <article className="flex flex-col rounded-card border border-line bg-surface shadow-card transition-shadow hover:shadow-raised">
      <MiniPreview item={item} />
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-muted">{item.easyName}</p>
        <h3 className="mt-0.5 text-base font-bold">
          <Link
            to={`/ui/${item.slug}`}
            className="after:absolute after:inset-0 after:content-[''] relative focus-visible:outline-none"
          >
            {item.koreanName}
          </Link>
        </h3>
        <p className="text-xs font-medium text-primary-strong">{item.englishName}</p>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{item.summary}</p>
        <div className="mt-3 flex items-end justify-between gap-2 pt-1">
          <p className="text-xs text-muted">
            {exampleServices.length > 0 ? `사례: ${exampleServices.join(', ')}` : ''}
          </p>
          <div className="relative z-10">
            <SaveButton type="ui" id={item.id} name={item.koreanName} />
          </div>
        </div>
      </div>
    </article>
  );
}
