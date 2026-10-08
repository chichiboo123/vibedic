// 사전 항목의 기본 프롬프트에 덧붙이는 공통 조건입니다.
// 상세 페이지의 프롬프트 빌더와 프롬프트 가이드 페이지에서 함께 씁니다.

export type PromptStack = {
  id: string;
  label: string;
  line: string;
};

export type PromptAddon = {
  id: string;
  label: string;
  description: string;
  line: string;
};

export const promptStacks: PromptStack[] = [
  { id: 'none', label: '지정 안 함', line: '' },
  {
    id: 'html',
    label: 'HTML·CSS·JS',
    line: '별도 라이브러리 없이 HTML, CSS, 바닐라 JavaScript 한 파일로 만들어줘.',
  },
  {
    id: 'react',
    label: 'React + Tailwind',
    line: 'React 함수 컴포넌트와 Tailwind CSS로 만들어줘.',
  },
  {
    id: 'next',
    label: 'Next.js',
    line: 'Next.js(App Router)와 TypeScript, Tailwind CSS로 만들어줘.',
  },
];

export const promptAddons: PromptAddon[] = [
  {
    id: 'responsive',
    label: '반응형',
    description: 'PC·태블릿·모바일 화면 폭 대응',
    line: 'PC(1024px 이상), 태블릿(768px 이상), 모바일(768px 미만)에서 모두 자연스럽게 보이도록 반응형으로 만들어줘.',
  },
  {
    id: 'a11y',
    label: '접근성',
    description: '키보드 조작, 스크린 리더, 명암비',
    line: '키보드만으로 조작할 수 있게 하고, 포커스 표시를 분명히 하며, 필요한 곳에 aria 속성과 레이블을 넣어줘. 글자와 배경의 명암비는 4.5:1 이상으로 해줘.',
  },
  {
    id: 'dark',
    label: '다크 모드',
    description: '라이트·다크 테마 모두 지원',
    line: '라이트 모드와 다크 모드를 모두 지원하고, 색은 CSS 변수로 관리해줘.',
  },
  {
    id: 'states',
    label: '모든 상태',
    description: '로딩·빈 상태·오류까지',
    line: '기본 상태뿐 아니라 로딩 중, 내용 없음(빈 상태), 오류 상태 화면도 함께 만들어줘.',
  },
  {
    id: 'korean',
    label: '한국어 문구',
    description: '친근한 존댓말 UI 문구',
    line: '화면 문구는 모두 한국어로, "~해요"체의 짧고 친근한 문장으로 써줘.',
  },
];

export function buildPrompt(base: string, stackId: string, addonIds: string[]): string {
  const stack = promptStacks.find((option) => option.id === stackId);
  const lines = [base.trim()];
  if (stack && stack.line) lines.push(stack.line);
  for (const addon of promptAddons) {
    if (addonIds.includes(addon.id)) lines.push(addon.line);
  }
  return lines.join('\n');
}
