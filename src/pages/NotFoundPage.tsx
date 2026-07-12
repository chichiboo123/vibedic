import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('페이지를 찾을 수 없어요');
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p aria-hidden="true" className="text-5xl">
        🔍
      </p>
      <h1 className="mt-5 text-2xl font-bold">찾으려는 페이지가 없어요.</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        주소가 바뀌었거나 잘못 입력됐을 수 있어요.
        <br />
        UI와 UX 사전에서 다른 항목을 찾아보세요.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-strong"
        >
          홈으로 이동
        </Link>
        <Link
          to="/ui"
          className="inline-flex min-h-11 items-center rounded-lg border border-line bg-surface px-5 text-sm font-semibold hover:bg-background"
        >
          UI 요소 보기
        </Link>
        <Link
          to="/ux"
          className="inline-flex min-h-11 items-center rounded-lg border border-line bg-surface px-5 text-sm font-semibold hover:bg-background"
        >
          UX 패턴 보기
        </Link>
      </div>
    </div>
  );
}
