import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

const footerGroups = [
  {
    title: 'Dictionary',
    links: [
      { to: '/ui', label: 'UI 요소' },
      { to: '/ux', label: 'UX 패턴' },
      { to: '/versus', label: '헷갈리는 UI 구분하기' },
    ],
  },
  {
    title: 'Explore',
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
    <footer className="mt-24 overflow-hidden border-t border-line bg-surface/60 backdrop-blur">
      <div className="mx-auto max-w-page px-4 pt-14 text-sm text-muted">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo size="sm" />
            <p className="mt-3 max-w-[16rem] leading-relaxed">
              필요할 때 꺼내 찾는 바이브코딩 UI·UX 사전.
              <span className="font-serif italic"> Name it, then build it.</span>
            </p>
          </div>
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={`푸터 메뉴: ${group.title}`}>
              <p className="eyebrow">{group.title}</p>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-relaxed">
            서비스 및 상표의 권리는 각 권리자에게 있습니다. VibeDic은 UI·UX 학습을 위해 공개적으로 관찰 가능한
            사례를 설명합니다.
          </p>
          <a
            href="https://litt.ly/chichiboo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 font-medium text-ink transition-opacity hover:opacity-70"
          >
            Created by. 교육뮤지컬 꿈꾸는 치수쌤
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">(새 창에서 열림)</span>
          </a>
        </div>
      </div>

      {/* 화면 폭을 가득 채우는 거대한 워드마크(장식) */}
      <p
        aria-hidden="true"
        className="pointer-events-none mt-6 select-none whitespace-nowrap text-center font-extrabold leading-[0.78] tracking-[-0.06em] text-ink/[0.06] [font-size:clamp(5rem,22vw,20rem)]"
      >
        Vibe<span className="font-serif font-normal italic">Dic</span>
      </p>
    </footer>
  );
}
