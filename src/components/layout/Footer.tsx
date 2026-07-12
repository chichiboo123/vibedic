import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto max-w-page px-4 py-8 text-sm text-muted">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold">
              <span className="text-primary-strong">Vibe</span>
              <span className="text-ink">Dic</span>
            </p>
            <p className="mt-1">필요할 때 꺼내 찾는 바이브코딩 UI·UX 사전</p>
          </div>
          <nav aria-label="푸터 메뉴">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              <li>
                <Link to="/ui" className="hover:text-ink">UI 요소</Link>
              </li>
              <li>
                <Link to="/ux" className="hover:text-ink">UX 패턴</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-ink">유명 서비스</Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-ink">기기별 비교</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-ink">소개</Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-6 text-xs leading-relaxed">
          서비스 및 상표의 권리는 각 권리자에게 있습니다. VibeDic은 UI·UX 학습을 위해 공개적으로
          관찰 가능한 사례를 설명합니다.
        </p>
      </div>
    </footer>
  );
}
