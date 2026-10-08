import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { uiCategoryById } from '../../data/categories';
import { uiCategoryVisuals } from './categoryVisuals';
import type { UIItem } from '../../types';
import { findServiceById } from '../../data/services';
import { MiniPreview } from './MiniPreview';
import { SaveButton } from '../common/SaveButton';

export function UIItemCard({ item }: { item: UIItem }) {
  const exampleServices = item.serviceExamples
    .slice(0, 2)
    .map((example) => findServiceById(example.serviceId)?.name)
    .filter((name): name is string => Boolean(name));

  const { Icon, tone } = uiCategoryVisuals[item.category];

  return (
    // 카드 전체가 링크입니다. 썸네일에는 상세 페이지 데모와 같은 모양이 들어갑니다.
    <article className="spotlight group relative flex flex-col rounded-[1.25rem] border border-line bg-surface p-2 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-raised">
      <div className="relative">
        <MiniPreview item={item} />
        <span
          className={`tone-${tone} absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-tone px-2 py-0.5 text-[10px] font-semibold text-tone-fg`}
        >
          <Icon className="h-2.5 w-2.5" aria-hidden="true" />
          {uiCategoryById(item.category).easyName}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-background opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2.5 pb-2 pt-3.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-[17px] font-bold tracking-tight">
            <Link
              to={`/ui/${item.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {item.koreanName}
            </Link>
          </h3>
          <p className="truncate font-mono text-[11px] text-muted">{item.englishName}</p>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{item.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <p className="truncate text-xs text-muted">
            {exampleServices.length > 0 ? exampleServices.join(' · ') : item.easyName}
          </p>
          <div className="relative z-10">
            <SaveButton type="ui" id={item.id} name={item.koreanName} />
          </div>
        </div>
      </div>
    </article>
  );
}
