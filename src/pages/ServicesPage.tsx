import { services } from '../data/services';
import { ServiceCard } from '../components/dictionary/ServiceCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ServicesPage() {
  useDocumentTitle('유명 서비스');
  return (
    <div>
      <header>
        <h1 className="text-2xl font-bold">유명 서비스</h1>
        <p className="mt-1.5 text-sm text-muted">
          자주 쓰는 서비스에서 UI와 UX가 어떻게 쓰이는지 살펴보세요. 총 {services.length}개 서비스가 있어요.
        </p>
      </header>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <p className="mt-8 rounded-card border border-line bg-surface p-4 text-xs leading-relaxed text-muted">
        서비스 및 상표의 권리는 각 권리자에게 있습니다. VibeDic은 UI·UX 학습을 위해 공개적으로 관찰
        가능한 사례를 설명합니다.
      </p>
    </div>
  );
}
