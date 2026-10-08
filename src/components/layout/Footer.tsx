import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Logo } from './Logo';

const footerGroups = [
  {
    title: '사전',
    links: [
      { to: '/ui', label: 'UI 요소' },
      { to: '/ux', label: 'UX 패턴' },
      { to: '/versus', label: '헷갈리는 UI 구분하기' },
    ],
  },
  {
    title: '살펴보기',
    links: [
      { to: '/services', label: '유명 서비스' },
      { to: '/compare', label: '기기별 비교' },
      { to: '/guide', label: '프롬프트 가이드' },
    ],
  },
  {
    title: 'VibeDic',
    links: [
      { to: '/saved', label: '저장함' },
      { to: '/search', label: '통합 검색' },
      { to: '/about', label: '소개' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto max-w-page px-4 py-10 text-sm text-muted">
        <div className="grid gap-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo size="sm" />
            <p className="mt-2 leading-relaxed">
              필요할 때 꺼내 찾는
              <br />
              바이브코딩 UI·UX 사전
            </p>
          </div>
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={`푸터 메뉴: ${group.title}`}>
              <p className="text-xs font-semibold text-ink">{group.title}</p>
              <ul className="mt-2.5 space-y-1.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="hover:text-primary-strong hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-8 border-t border-line pt-6 text-xs leading-relaxed">
          서비스 및 상표의 권리는 각 권리자에게 있습니다. VibeDic은 UI·UX 학습을 위해 공개적으로
          관찰 가능한 사례를 설명합니다.
        </p>
      </div>
      {/* 치수쌤 웹앱 공통 푸터 */}
      <div className="border-t border-line bg-background px-4 py-4 text-center">
        <a
          href="https://litt.ly/chichiboo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[13px] text-muted transition-colors hover:text-primary-strong"
        >
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          Created by. 교육뮤지컬 꿈꾸는 치수쌤
          <span className="sr-only">(새 창에서 열림)</span>
        </a>
      </div>
    </footer>
  );
}
