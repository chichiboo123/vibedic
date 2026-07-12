import { Link } from 'react-router-dom';
import type { DemoType, ServiceExample, UICategoryId } from '../../types';
import { findServiceById } from '../../data/services';
import { ExampleFigure } from './ExampleFigure';
import { ServiceBadge } from './ServiceCard';

type ServiceExampleListProps = {
  examples: ServiceExample[];
  demoType: DemoType;
  category: UICategoryId;
};

export function ServiceExampleList({ examples, demoType, category }: ServiceExampleListProps) {
  return (
    <div>
      <ul className="space-y-3">
        {examples.map((example) => {
          const service = findServiceById(example.serviceId);
          return (
            <li
              key={example.title}
              className="flex flex-col gap-3 rounded-card border border-line bg-surface p-4 sm:flex-row sm:items-center"
            >
              <ExampleFigure
                serviceId={example.serviceId}
                serviceName={service?.name ?? example.serviceId}
                demoType={demoType}
                category={category}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {service && <ServiceBadge name={service.name} id={service.id} />}
                  <p className="text-sm font-semibold">
                    {service ? (
                      <Link
                        to={`/services/${service.slug}`}
                        className="hover:text-primary-strong hover:underline"
                      >
                        {example.title}
                      </Link>
                    ) : (
                      example.title
                    )}
                  </p>
                </div>
                <p className="mt-1.5 text-sm text-muted">{example.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-xs text-muted">
        도식은 실제 화면을 단순화한 것으로, 강조된 부분이 이 항목이 쓰이는 자리입니다.
      </p>
    </div>
  );
}
