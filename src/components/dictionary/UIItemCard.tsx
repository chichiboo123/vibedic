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
    // 휴대폰에서는 썸네일을 왼쪽에 작게 둔 가로형, 넓은 화면에서는 썸네일이 위에 오는 세로형 카드입니다.
    <article className="spotlight group relative flex min-w-0 gap-3 rounded-[1.25rem] border border-line bg-surface p-2 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-raised sm:flex-col sm:gap-0">
      <div className="relative w-28 shrink-0 sm:w-auto">
        <MiniPreview item={item} />
        <span
          className={`tone-${tone} absolute left-1.5 top-1.5 inline-flex max-w-[calc(100%-0.75rem)] items-center gap-1 truncate rounded-full bg-tone px-2 py-0.5 text-[11px] font-semibold text-tone-fg sm:left-2 sm:top-2`}
        >
          <Icon className="h-2.5 w-2.5" aria-hidden="true" />
          {uiCategoryById(item.category).easyName}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-2 hidden h-7 w-7 items-center sm:flex justify-center rounded-full bg-ink text-background opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col py-1 pr-1 sm:px-2.5 sm:pb-2 sm:pt-3.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-2">
          <h3 className="text-[17px] font-bold tracking-tight">
            <Link
              to={`/ui/${item.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {item.koreanName}
            </Link>
          </h3>
          <p className="truncate font-mono text-xs text-muted">{item.englishName}</p>
        </div>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted sm:mt-1.5">{item.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2 sm:pt-3">
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
