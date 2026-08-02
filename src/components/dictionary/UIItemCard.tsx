import { Link } from 'react-router-dom';
import { ArrowRight, Hand } from 'lucide-react';
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
    <article className="group relative flex flex-col rounded-card border border-line bg-surface shadow-card transition-shadow hover:shadow-raised">
      {/* 썸네일에는 상세 페이지 데모와 같은 모양이 들어갑니다. 눌러서 바로 상세로 들어갈 수 있어요. */}
      <div className="relative">
        <MiniPreview item={item} />
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-white">
          <Hand className="h-2.5 w-2.5" aria-hidden="true" />
          직접 조작 데모
        </span>
        <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-surface/90 px-2 py-0.5 text-[10px] font-semibold text-primary-strong opacity-0 shadow-card transition-opacity group-hover:opacity-100">
          자세히 보기
          <ArrowRight className="h-2.5 w-2.5" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-muted">{item.easyName}</p>
        <h3 className="mt-0.5 text-base font-bold">
          <Link
            to={`/ui/${item.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
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
