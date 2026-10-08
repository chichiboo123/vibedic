import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageHeader } from '../components/common/PageHeader';
import { uiItems } from '../data/uiItems';
import { uxPatterns } from '../data/uxPatterns';
import { versusTopics } from '../data/versus';
import { services } from '../data/services';
import { deviceComparisons } from '../data/deviceComparisons';

const stats = [
  { label: 'UI 요소', value: uiItems.length, to: '/ui' },
  { label: 'UX 패턴', value: uxPatterns.length, to: '/ux' },
  { label: '헷갈리는 UI 비교', value: versusTopics.length, to: '/versus' },
  { label: '유명 서비스', value: services.length, to: '/services' },
  { label: '기기별 비교', value: deviceComparisons.length, to: '/compare' },
];

export function AboutPage() {
  useDocumentTitle('소개');
  return (
    <article className="mx-auto max-w-2xl">
      <PageHeader eyebrow="About" Icon={Info} title="VibeDic 소개" />
      <p className="mt-4 text-base font-medium text-primary-strong">
        “필요할 때 꺼내 찾는 바이브코딩 UI·UX 사전”
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        VibeDic은 바이브코딩으로 웹사이트와 앱을 만드는 사람이 UI 요소의 공식 명칭과 역할을 쉽게
        찾아보고, 실제 유명 서비스에서 어떻게 쓰이는지 확인하며, PC·태블릿·모바일 환경의 차이를
        이해할 수 있도록 돕는 사례 기반 학습 사전입니다.
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map((stat) => (
          <li key={stat.label}>
            <Link to={stat.to} className="surface-card block p-3 text-center transition-colors hover:border-primary">
              <span className="block text-2xl font-extrabold text-primary-strong">{stat.value}</span>
              <span className="mt-0.5 block text-xs text-muted">{stat.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <Section title="UI와 UX는 어떻게 다른가요?">
        <p>
          UI는 버튼, 탭, 모달처럼 화면에 보이는 <strong>요소</strong>이고, UX는 검색하고 선택하고
          저장하는 <strong>경험의 흐름</strong>입니다. VibeDic은 두 사전을 분리하는 대신 서로
          연결해, UI에서 관련 UX로, UX에서 사용되는 UI로 오갈 수 있게 만들었습니다.
        </p>
      </Section>

      <Section title="왜 유명 서비스를 사례로 쓰나요?">
        <p>
          Google, YouTube, Notion처럼 이미 익숙한 서비스의 화면을 떠올리면 낯선 용어도 금방
          이해됩니다. 다만 실제 화면을 복제하지 않고, 화면에서 공개적으로 관찰 가능한 사용 방식만
          텍스트와 단순한 도식으로 설명합니다. 공개되지 않은 내부 구조는 추측해서 설명하지
          않습니다.
        </p>
      </Section>

      <Section title="왜 PC·태블릿·모바일을 비교하나요?">
        <p>
          같은 기능도 기기에 따라 모습이 달라집니다. PC의 사이드바는 모바일에서 하단 내비게이션이
          되고, 툴팁은 도움말 버튼으로 바뀝니다. 이 차이를 알면 반응형 웹앱을 만들 때 어떤 UI를
          선택할지 판단하기 쉬워집니다.
        </p>
      </Section>

      <Section title="이름이 비슷한 UI는 어떻게 구분하나요?">
        <p>
          모달과 바텀 시트, 칩과 태그처럼 모양도 이름도 비슷한 요소는{' '}
          <Link to="/versus" className="font-medium text-primary-strong hover:underline">
            헷갈리는 UI 구분하기
          </Link>
          에서 같은 기준으로 나란히 비교합니다. 정확한 이름을 알면 AI에게도 정확하게 요청할 수 있어요.
          요청 방법은{' '}
          <Link to="/guide" className="font-medium text-primary-strong hover:underline">
            프롬프트 가이드
          </Link>
          에 정리했습니다.
        </p>
      </Section>

      <Section title="콘텐츠 작성 원칙">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>전문 용어보다 쉬운 설명을 먼저 보여줍니다.</li>
          <li>한국어 이름과 공식 영문 명칭을 함께 표시합니다.</li>
          <li>설명보다 직접 조작할 수 있는 데모를 우선합니다.</li>
          <li>기기별 차이가 의미 있는 경우에만 비교합니다.</li>
          <li>바이브코딩에 바로 쓸 수 있는 프롬프트를 제공하고, 기술 스택과 공통 조건을 골라 덧붙일 수 있게 합니다.</li>
        </ul>
      </Section>

      <Section title="KRDS 참고 안내">
        <p>
          컴포넌트 명칭의 일관성, 접근성 원칙 등은 대한민국 정부 디자인 시스템(KRDS)의 원칙을
          참고했습니다. KRDS를 복제한 것은 아니며, 초보자 눈높이에 맞게 새로 정리했습니다.
        </p>
      </Section>

      <Section title="앞으로의 계획">
        <p>
          지금은 UI와 UX 사전만 제공하지만, 데이터 구조는 서버, API, 데이터베이스 용어 사전으로
          확장할 수 있게 설계되어 있습니다.
        </p>
      </Section>

      <Section title="서비스 및 상표 안내">
        <p className="text-xs">
          서비스 및 상표의 권리는 각 권리자에게 있습니다. VibeDic은 UI·UX 학습을 위해 공개적으로
          관찰 가능한 사례를 설명합니다.
        </p>
      </Section>

      <div className="mt-10 flex flex-wrap gap-2">
        <Link to="/ui" className="btn-primary">
          UI 사전 시작하기
        </Link>
        <Link to="/ux" className="btn-secondary">
          UX 사전 시작하기
        </Link>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8" aria-label={title}>
      <h2 className="mb-2 text-lg font-bold">{title}</h2>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}
