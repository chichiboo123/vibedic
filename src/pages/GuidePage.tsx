import { Link } from 'react-router-dom';
import { ArrowRight, NotebookPen, ThumbsDown, ThumbsUp } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { CopyPromptButton } from '../components/common/CopyPromptButton';
import { promptAddons } from '../data/promptKit';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type Principle = {
  title: string;
  description: string;
  before: string;
  after: string;
  links: { to: string; label: string }[];
};

const principles: Principle[] = [
  {
    title: '정확한 이름으로 부르기',
    description: '"그거", "위에 뜨는 창"보다 사전의 공식 이름을 쓰면 AI가 맞는 요소와 동작을 바로 떠올립니다.',
    before: '버튼 누르면 위에 뜨는 창 만들어줘.',
    after: '공유 버튼을 누르면 모달을 열어줘. 모달 안에는 링크 복사 입력창과 닫기 버튼을 두고, ESC와 배경 클릭으로도 닫히게 해줘.',
    links: [
      { to: '/ui/modal', label: '모달' },
      { to: '/versus#modal-sheet-drawer', label: '모달 · 바텀 시트 · 드로어 비교' },
    ],
  },
  {
    title: '자리와 기기를 함께 말하기',
    description: '같은 메뉴도 PC와 모바일에서 모양이 달라집니다. 어느 화면에서 어디에 둘지 함께 알려주세요.',
    before: '메뉴 만들어줘.',
    after: 'PC에서는 헤더에 가로 메인 메뉴를, 768px 미만 모바일에서는 하단 내비게이션 4칸(홈·검색·저장·내 정보)을 보여줘.',
    links: [
      { to: '/ui/bottom-navigation', label: '하단 내비게이션' },
      { to: '/compare', label: '기기별 비교' },
    ],
  },
  {
    title: '상태를 빠짐없이 말하기',
    description: '실제 서비스는 늘 로딩·빈 상태·오류를 겪습니다. 처음부터 말해 두면 나중에 고칠 일이 줄어요.',
    before: '게시글 목록 보여줘.',
    after: '게시글 목록을 카드로 보여줘. 불러오는 동안엔 스켈레톤 3개, 글이 없으면 "첫 글을 써 보세요" 빈 상태, 실패하면 다시 시도 버튼이 있는 오류 안내를 보여줘.',
    links: [
      { to: '/ui/skeleton', label: '스켈레톤' },
      { to: '/ui/empty-state', label: '빈 상태' },
      { to: '/ux/error-recovery', label: '오류 상태와 다시 시도' },
    ],
  },
  {
    title: '기능이 아니라 흐름으로 말하기',
    description: '"저장 기능"보다 사용자가 겪는 순서(UX)로 설명하면 피드백과 예외 처리까지 함께 만들어집니다.',
    before: '저장 기능 넣어줘.',
    after: '저장 버튼을 누르면 버튼이 "저장 중"으로 바뀌며 비활성화되고, 끝나면 "저장했어요" 토스트를 띄워줘. 실패하면 이유와 다시 시도 버튼을 보여줘.',
    links: [
      { to: '/ux/save-action', label: '저장' },
      { to: '/ui/toast', label: '토스트' },
    ],
  },
  {
    title: '한 번에 하나씩, 확인하며 다듬기',
    description: '화면 전체를 한 번에 요청하기보다 영역별로 나눠 만들고, 결과를 보며 이름을 써서 고쳐 달라고 하세요.',
    before: '쇼핑몰 전체 다 만들어줘.',
    after: '먼저 상품 목록 화면의 헤더와 필터 칩만 만들어줘. 확인한 다음에 상품 카드와 페이지네이션을 이어서 요청할게.',
    links: [
      { to: '/ui/header', label: '헤더' },
      { to: '/ui/filter-chip', label: '필터 칩' },
    ],
  },
];

const skeleton = `[무엇을] ○○ 화면에 ○○(UI 이름)을 만들어줘.
[어떻게] 누르면/입력하면 ○○가 일어나게 해줘.
[상태] 로딩 중, 내용 없음, 오류일 때는 ○○를 보여줘.
[기기] PC에서는 ○○, 모바일에서는 ○○로 바꿔줘.
[접근성] 키보드로 조작할 수 있고 스크린 리더가 ○○라고 읽게 해줘.`;

export function GuidePage() {
  useDocumentTitle('바이브코딩 프롬프트 가이드');

  return (
    <article className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Prompt Guide"
        Icon={NotebookPen}
        title="바이브코딩 프롬프트 가이드"
        description="AI는 정확한 이름과 조건을 들을수록 원하는 화면을 정확하게 만들어요. 사전을 프롬프트에 활용하는 다섯 가지 방법을 정리했어요."
      />

      <ol className="mt-8 space-y-5">
        {principles.map((principle, index) => (
          <li key={principle.title}>
            <section aria-labelledby={`principle-${index}`} className="surface-card p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h2 id={`principle-${index}`} className="text-lg font-bold">
                    {principle.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{principle.description}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="tone-orange rounded-card bg-tone p-4">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-tone-fg">
                    <ThumbsDown className="h-3.5 w-3.5" aria-hidden="true" /> 아쉬운 프롬프트
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">{principle.before}</p>
                </div>
                <div className="tone-green rounded-card bg-tone p-4">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-tone-fg">
                    <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" /> 더 나은 프롬프트
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">{principle.after}</p>
                </div>
              </div>
              <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted">
                사전에서 보기:
                {principle.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="inline-flex min-h-8 items-center rounded-full bg-primary-soft px-2.5 font-medium text-primary-strong hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </p>
            </section>
          </li>
        ))}
      </ol>

      <section aria-labelledby="skeleton-title" className="mt-10">
        <h2 id="skeleton-title" className="text-lg font-bold">
          그대로 채워 쓰는 프롬프트 뼈대
        </h2>
        <p className="mt-1 text-sm text-muted">○○ 자리에 사전에서 찾은 이름과 조건을 넣어 보세요.</p>
        <div className="surface-card mt-3 p-4">
          <pre className="whitespace-pre-wrap rounded-md bg-background p-4 font-mono text-sm leading-relaxed">
            {skeleton}
          </pre>
          <div className="mt-3">
            <CopyPromptButton text={skeleton} />
          </div>
        </div>
      </section>

      <section aria-labelledby="addons-title" className="mt-10">
        <h2 id="addons-title" className="text-lg font-bold">
          어디에나 붙이는 공통 조건
        </h2>
        <p className="mt-1 text-sm text-muted">
          UI·UX 상세 페이지의 “내 웹앱에 적용하기”에서 버튼 하나로 덧붙일 수도 있어요.
        </p>
        <dl className="mt-3 space-y-2">
          {promptAddons.map((addon) => (
            <div key={addon.id} className="surface-card p-4">
              <dt className="text-sm font-bold">
                {addon.label}
                <span className="ml-1.5 text-xs font-normal text-muted">{addon.description}</span>
              </dt>
              <dd className="mt-1.5 font-mono text-[13px] leading-relaxed text-muted">{addon.line}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-10 flex flex-wrap gap-2">
        <Link to="/ui" className="btn-primary">
          UI 사전에서 이름 찾기
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link to="/versus" className="btn-secondary">
          헷갈리는 UI 구분하기
        </Link>
      </div>
    </article>
  );
}
