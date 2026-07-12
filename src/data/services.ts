import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'google',
    slug: 'google',
    name: 'Google',
    summary: '검색창 하나에 집중한 화면과 자동 완성, 오타 교정의 대표 사례입니다.',
    officialUrl: 'https://www.google.com',
    relatedUiIds: ['ui-search-field', 'ui-autocomplete', 'ui-pagination', 'ui-text-field'],
    relatedUxIds: ['ux-search', 'ux-autocomplete', 'ux-no-results', 'ux-login', 'ux-inline-validation'],
    deviceHighlights: [
      'PC에서는 검색 결과 옆에 지식 패널을 나란히 보여줍니다.',
      '모바일에서는 결과가 한 열로 정리되고 음성 검색 버튼이 강조됩니다.',
    ],
  },
  {
    id: 'youtube',
    slug: 'youtube',
    name: 'YouTube',
    summary: '카드 그리드, 필터 칩, 하단 내비게이션 등 탐색 UI의 교과서 같은 서비스입니다.',
    officialUrl: 'https://www.youtube.com',
    relatedUiIds: ['ui-card', 'ui-filter-chip', 'ui-bottom-navigation', 'ui-skeleton', 'ui-toggle-switch', 'ui-tab'],
    relatedUxIds: ['ux-search', 'ux-filter', 'ux-loading', 'ux-share-action', 'ux-tab-switching'],
    deviceHighlights: [
      'PC 사이드바가 창 폭에 따라 내비게이션 레일로 줄어듭니다.',
      '모바일 앱은 하단 내비게이션과 바텀 시트 중심으로 재구성됩니다.',
    ],
  },
  {
    id: 'netflix',
    slug: 'netflix',
    name: 'Netflix',
    summary: '히어로 영역과 가로 캐러셀로 콘텐츠 탐색을 이끄는 대표 사례입니다.',
    officialUrl: 'https://www.netflix.com',
    relatedUiIds: ['ui-carousel', 'ui-hero-section', 'ui-card', 'ui-badge', 'ui-search-field'],
    relatedUxIds: ['ux-search', 'ux-no-results', 'ux-list-to-detail', 'ux-offline'],
    deviceHighlights: [
      'PC에서는 호버 시 미리보기가 확장됩니다.',
      '모바일에서는 세로 스크롤과 터치 탐색 중심으로 단순해집니다.',
    ],
  },
  {
    id: 'instagram',
    slug: 'instagram',
    name: 'Instagram',
    summary: '하단 내비게이션과 무한 피드, 공유 시트 등 모바일 문법의 표준을 보여줍니다.',
    officialUrl: 'https://www.instagram.com',
    relatedUiIds: ['ui-bottom-navigation', 'ui-carousel', 'ui-avatar', 'ui-bottom-sheet', 'ui-notification-badge', 'ui-icon-button'],
    relatedUxIds: ['ux-main-menu', 'ux-back-navigation', 'ux-comments', 'ux-share-action'],
    deviceHighlights: [
      'PC 웹에서는 게시물이 가운데 모달로 열립니다.',
      '모바일에서는 스와이프와 더블 탭 같은 제스처가 중심입니다.',
    ],
  },
  {
    id: 'notion',
    slug: 'notion',
    name: 'Notion',
    summary: '사이드바 트리, 명령 팔레트, 자동 저장으로 문서 도구 UX를 대표합니다.',
    officialUrl: 'https://www.notion.com',
    relatedUiIds: ['ui-sidebar', 'ui-command-palette', 'ui-breadcrumb', 'ui-accordion', 'ui-drawer', 'ui-tag'],
    relatedUxIds: ['ux-autosave', 'ux-main-menu', 'ux-empty-state', 'ux-version-history', 'ux-permission-selection'],
    deviceHighlights: [
      'PC에서는 사이드바와 문서, 댓글 패널을 함께 펼칠 수 있습니다.',
      '모바일에서는 사이드바가 드로어로 바뀌고 편집 도구가 키보드 위로 이동합니다.',
    ],
  },
  {
    id: 'canva',
    slug: 'canva',
    name: 'Canva',
    summary: '템플릿 검색과 파일 업로드, 공유 링크 등 제작 도구 UX의 좋은 참고입니다.',
    officialUrl: 'https://www.canva.com',
    relatedUiIds: ['ui-hero-section', 'ui-file-upload', 'ui-modal', 'ui-toast', 'ui-card'],
    relatedUxIds: ['ux-search', 'ux-link-sharing', 'ux-onboarding', 'ux-first-run-guide', 'ux-completion-feedback'],
    deviceHighlights: [
      'PC 편집 화면은 좌우 패널과 넓은 캔버스로 구성됩니다.',
      '모바일에서는 도구가 하단 바와 시트로 축약됩니다.',
    ],
  },
  {
    id: 'google-drive',
    slug: 'google-drive',
    name: 'Google Drive',
    summary: '파일 표, 업로드 진행, 우클릭 메뉴 등 파일 관리 UI의 표준을 보여줍니다.',
    officialUrl: 'https://drive.google.com',
    relatedUiIds: ['ui-table', 'ui-context-menu', 'ui-progress-bar', 'ui-dropdown-menu', 'ui-segmented-control', 'ui-sidebar'],
    relatedUxIds: ['ux-upload-progress', 'ux-multi-choice', 'ux-sort', 'ux-danger-confirm', 'ux-link-sharing'],
    deviceHighlights: [
      'PC에서는 파일 표와 우클릭 메뉴로 빠르게 작업합니다.',
      '모바일에서는 표 대신 카드 목록과 더보기 시트로 바뀝니다.',
    ],
  },
  {
    id: 'google-docs',
    slug: 'google-docs',
    name: 'Google Docs',
    summary: '공동 편집, 댓글, 버전 기록 등 협업 UX의 대표 사례입니다.',
    officialUrl: 'https://docs.google.com',
    relatedUiIds: ['ui-avatar', 'ui-tooltip', 'ui-timeline', 'ui-context-menu', 'ui-drawer'],
    relatedUxIds: ['ux-comments', 'ux-version-history', 'ux-autosave', 'ux-permission-selection', 'ux-offline', 'ux-undo'],
    deviceHighlights: [
      'PC에서는 문서와 댓글 패널을 나란히 보며 편집합니다.',
      '모바일에서는 편집 툴바가 축약되고 댓글이 시트로 열립니다.',
    ],
  },
  {
    id: 'kakaotalk',
    slug: 'kakaotalk',
    name: '카카오톡',
    summary: '채팅 목록, 알림 배지, 첨부 시트 등 한국 사용자에게 가장 익숙한 모바일 UI입니다.',
    officialUrl: 'https://www.kakaocorp.com/page/service/service/KakaoTalk',
    relatedUiIds: ['ui-list', 'ui-notification-badge', 'ui-top-app-bar', 'ui-toggle-switch', 'ui-bottom-sheet', 'ui-avatar'],
    relatedUxIds: ['ux-main-menu', 'ux-tab-switching', 'ux-share-action', 'ux-completion-feedback'],
    deviceHighlights: [
      '모바일은 하단 탭과 채팅 목록 중심의 구조입니다.',
      'PC 버전은 목록과 대화창을 나란히 보여주는 분할 구조입니다.',
    ],
  },
  {
    id: 'coupang',
    slug: 'coupang',
    name: '쿠팡',
    summary: '검색, 필터, 옵션 선택, 주문 확인까지 쇼핑 UX 전 과정을 참고할 수 있습니다.',
    officialUrl: 'https://www.coupang.com',
    relatedUiIds: ['ui-search-field', 'ui-filter-chip', 'ui-stepper', 'ui-checkbox', 'ui-timeline', 'ui-tab', 'ui-breadcrumb'],
    relatedUxIds: ['ux-search', 'ux-filter', 'ux-sort', 'ux-input-confirm', 'ux-single-choice', 'ux-back-navigation'],
    deviceHighlights: [
      'PC에서는 필터 사이드바와 상품 그리드를 함께 보여줍니다.',
      '모바일에서는 필터가 바텀 시트로 열리고 목록이 한 열이 됩니다.',
    ],
  },
  {
    id: 'naver',
    slug: 'naver',
    name: '네이버',
    summary: '통합 검색과 자동 완성, 방대한 메뉴 구조를 다루는 국내 대표 포털입니다.',
    officialUrl: 'https://www.naver.com',
    relatedUiIds: ['ui-search-field', 'ui-autocomplete', 'ui-main-menu', 'ui-tab', 'ui-footer'],
    relatedUxIds: ['ux-search', 'ux-autocomplete', 'ux-login', 'ux-inline-validation', 'ux-main-menu'],
    deviceHighlights: [
      'PC 홈은 여러 열의 콘텐츠 패널로 구성됩니다.',
      '모바일 홈은 검색창과 세로 피드 중심으로 재구성됩니다.',
    ],
  },
  {
    id: 'airbnb',
    slug: 'airbnb',
    name: 'Airbnb',
    summary: '날짜·인원 선택과 필터, 단계별 입력 등 예약 UX의 교과서입니다.',
    officialUrl: 'https://www.airbnb.co.kr',
    relatedUiIds: ['ui-date-picker', 'ui-stepper', 'ui-range-slider', 'ui-card', 'ui-combo-box', 'ui-accordion', 'ui-carousel'],
    relatedUxIds: ['ux-date-selection', 'ux-filter', 'ux-step-input', 'ux-input-confirm', 'ux-default-values'],
    deviceHighlights: [
      'PC에서는 지도와 목록을 나란히 보며 탐색합니다.',
      '모바일에서는 검색 조건 입력이 전체 화면 단계로 전환됩니다.',
    ],
  },
  {
    id: 'chatgpt',
    slug: 'chatgpt',
    name: 'ChatGPT',
    summary: '대화형 입력, 스트리밍 응답, 빈 화면 예시 등 AI 서비스 UX의 기준점입니다.',
    officialUrl: 'https://chatgpt.com',
    relatedUiIds: ['ui-textarea', 'ui-code-block', 'ui-spinner', 'ui-sidebar', 'ui-empty-state'],
    relatedUxIds: ['ux-loading', 'ux-error-recovery', 'ux-first-run-guide', 'ux-undo'],
    deviceHighlights: [
      'PC에서는 대화 목록 사이드바와 대화 화면이 나란히 보입니다.',
      '모바일에서는 사이드바가 드로어로 바뀌고 입력창이 하단에 고정됩니다.',
    ],
  },
  {
    id: 'gmail',
    slug: 'gmail',
    name: 'Gmail',
    summary: '목록 일괄 처리, 실행 취소, 자동 저장 등 생산성 UX의 대표 사례입니다.',
    officialUrl: 'https://mail.google.com',
    relatedUiIds: ['ui-list', 'ui-checkbox', 'ui-fab', 'ui-toast', 'ui-chip', 'ui-navigation-drawer', 'ui-button'],
    relatedUxIds: ['ux-multi-choice', 'ux-undo', 'ux-autosave', 'ux-save-action', 'ux-completion-feedback'],
    deviceHighlights: [
      'PC에서는 목록과 본문, 사이드 패널을 함께 씁니다.',
      '모바일에서는 스와이프 동작과 플로팅 버튼이 중심입니다.',
    ],
  },
  {
    id: 'duolingo',
    slug: 'duolingo',
    name: 'Duolingo',
    summary: '온보딩, 진행률, 격려 피드백 등 학습 동기 부여 UX의 대표 사례입니다.',
    officialUrl: 'https://www.duolingo.com',
    relatedUiIds: ['ui-progress-bar', 'ui-button', 'ui-badge', 'ui-carousel', 'ui-empty-state'],
    relatedUxIds: ['ux-onboarding', 'ux-social-login', 'ux-completion-feedback', 'ux-step-input'],
    deviceHighlights: [
      '모바일 중심 설계로 큰 버튼과 한 화면 한 과제를 유지합니다.',
      'PC에서도 모바일과 같은 단순한 흐름을 유지합니다.',
    ],
  },
  {
    id: 'google-calendar',
    slug: 'google-calendar',
    name: 'Google Calendar',
    summary: '달력 보기 전환, 날짜·시간 선택, 기본값 설계의 대표 사례입니다.',
    officialUrl: 'https://calendar.google.com',
    relatedUiIds: ['ui-calendar', 'ui-segmented-control', 'ui-date-picker', 'ui-time-picker', 'ui-popover', 'ui-fab'],
    relatedUxIds: ['ux-date-selection', 'ux-default-values', 'ux-single-choice', 'ux-tab-switching'],
    deviceHighlights: [
      'PC에서는 월간 격자에 일정 제목까지 표시됩니다.',
      '모바일에서는 일정 목록 중심 보기와 하루 보기가 기본이 됩니다.',
    ],
  },
];

const bySlug = new Map(services.map((s) => [s.slug, s]));
const byId = new Map(services.map((s) => [s.id, s]));

export function findServiceBySlug(slug: string): Service | undefined {
  return bySlug.get(slug);
}

export function findServiceById(id: string): Service | undefined {
  return byId.get(id);
}
