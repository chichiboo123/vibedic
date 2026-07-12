import type { UIItem } from '../../types';

export const displayItems: UIItem[] = [
  {
    id: 'ui-list',
    slug: 'list',
    easyName: '항목을 세로로 나열한 것',
    koreanName: '목록',
    englishName: 'List',
    summary: '여러 항목을 위에서 아래로 나열해 보여주는 기본 구조입니다.',
    category: 'display',
    keywords: ['목록', '리스트', '나열', '항목', '피드'],
    aliases: ['리스트', '리스트 아이템'],
    states: ['기본', '선택됨', '로딩(스켈레톤)', '빈 상태'],
    serviceExamples: [
      {
        serviceId: 'gmail',
        title: 'Gmail 메일 목록',
        description: '보낸 사람, 제목, 시간이 한 줄씩 세로로 나열됩니다.',
      },
      {
        serviceId: 'kakaotalk',
        title: '카카오톡 채팅 목록',
        description: '프로필, 이름, 마지막 메시지가 행마다 정리됩니다.',
      },
    ],
    relatedUxIds: ['ux-list-to-detail', 'ux-empty-state'],
    relatedUiIds: ['ui-card', 'ui-table', 'ui-divider', 'ui-avatar'],
    deviceNotes: {
      desktop: '한 행에 더 많은 정보 열을 함께 보여줄 수 있습니다.',
      tablet: '목록과 상세를 좌우로 나란히 보여주는 분할 구조가 가능합니다.',
      mobile: '행 전체를 터치 대상으로 삼고 핵심 정보만 남깁니다.',
      hasMeaningfulDifference: true,
    },
    useWhen: [
      '메일, 채팅처럼 같은 형식의 항목이 반복될 때',
      '최신순 등 순서가 의미 있는 콘텐츠일 때',
    ],
    avoidWhen: [
      '이미지가 중심인 콘텐츠일 때(카드 그리드가 적합)',
      '여러 속성을 비교해야 할 때(표가 적합)',
    ],
    accessibilityChecks: [
      'ul/li 등 목록 구조로 마크업했는가?',
      '행 전체가 링크라면 이름이 명확한가?',
      '빈 상태와 로딩 상태가 준비되어 있는가?',
    ],
    vibePrompt:
      '메시지 목록 화면을 만들어줘.\n각 행에 아바타, 이름, 마지막 메시지, 시간을 배치하고 행 전체를 눌러 상세로 이동하게 해줘.\n항목이 없을 때 보여줄 빈 상태 화면도 함께 만들어줘.',
    demoType: 'static',
  },
  {
    id: 'ui-table',
    slug: 'table',
    easyName: '행과 열로 정리한 표',
    koreanName: '표',
    englishName: 'Table',
    summary: '여러 항목의 속성을 행과 열로 정리해 비교하기 쉽게 만든 요소입니다.',
    category: 'display',
    keywords: ['표', '테이블', '데이터', '행', '열', '정렬'],
    aliases: ['데이터 테이블', '그리드'],
    states: ['기본', '열 정렬됨', '행 선택됨', '빈 상태'],
    serviceExamples: [
      {
        serviceId: 'google-drive',
        title: 'Google Drive 목록 보기',
        description: '이름, 소유자, 수정 날짜가 열로 정리되고 정렬할 수 있습니다.',
      },
      {
        serviceId: 'notion',
        title: 'Notion 표 데이터베이스',
        description: '속성을 열로 추가하며 표 형태로 데이터를 관리합니다.',
      },
    ],
    relatedUxIds: ['ux-sort', 'ux-multi-choice'],
    relatedUiIds: ['ui-list', 'ui-pagination', 'ui-checkbox'],
    deviceNotes: {
      desktop: '많은 열을 한눈에 비교하는 데 가장 강력합니다.',
      tablet: '중요도 낮은 열을 숨기거나 가로 스크롤을 허용합니다.',
      mobile: '표 대신 카드 목록으로 바꿔 한 항목씩 보여주는 편이 낫습니다.',
      hasMeaningfulDifference: true,
    },
    useWhen: [
      '여러 항목의 속성을 나란히 비교해야 할 때',
      '정렬과 필터로 데이터를 다뤄야 할 때',
    ],
    avoidWhen: [
      '모바일 중심 화면에서 열이 많은 표를 그대로 쓸 때',
      '항목이 몇 개뿐이라 목록으로 충분할 때',
    ],
    accessibilityChecks: [
      'table, th 요소와 scope 속성을 올바르게 썼는가?',
      '정렬 상태가 aria-sort로 전달되는가?',
      '표가 화면을 넘칠 때 가로 스크롤 컨테이너가 있는가?',
    ],
    vibePrompt:
      '파일 목록을 표로 보여줘.\n이름, 크기, 수정일 열을 만들고 헤더 클릭으로 정렬되게 해줘.\n정렬 상태를 aria-sort와 화살표 아이콘으로 표시하고,\n모바일에서는 카드 목록으로 전환해줘.',
    demoType: 'static',
  },
  {
    id: 'ui-avatar',
    slug: 'avatar',
    easyName: '사람을 나타내는 동그란 사진',
    koreanName: '아바타',
    englishName: 'Avatar',
    summary: '프로필 사진이나 이름 첫 글자로 사용자를 나타내는 요소입니다.',
    category: 'display',
    keywords: ['아바타', '프로필', '프로필 사진', '이니셜', '사용자'],
    aliases: ['프로필 이미지'],
    states: ['이미지', '이니셜 대체', '온라인 표시', '그룹(겹침)'],
    serviceExamples: [
      {
        serviceId: 'google-docs',
        title: 'Google Docs 접속자 아바타',
        description: '문서를 함께 보는 사람들의 아바타가 상단에 겹쳐 표시됩니다.',
      },
      {
        serviceId: 'kakaotalk',
        title: '카카오톡 프로필',
        description: '채팅 목록의 각 대화 상대가 동그란 프로필로 표시됩니다.',
      },
    ],
    relatedUxIds: ['ux-comments', 'ux-login'],
    relatedUiIds: ['ui-badge', 'ui-list', 'ui-notification-badge'],
    deviceNotes: {
      hasMeaningfulDifference: false,
    },
    useWhen: [
      '작성자, 참여자 등 사람을 표시할 때',
      '여러 참여자를 좁은 공간에 겹쳐 보여줄 때',
    ],
    avoidWhen: [
      '사진이 없는 사용자에게 깨진 이미지를 그대로 보여줄 때',
    ],
    accessibilityChecks: [
      '이미지에 사용자 이름 대체 텍스트가 있는가?',
      '사진이 없을 때 이니셜 등 대체 표시가 있는가?',
      '온라인 상태가 색상 외 방법으로도 전달되는가?',
    ],
    vibePrompt:
      '댓글 목록에 작성자 아바타를 추가해줘.\n사진이 없으면 이름 첫 글자를 배경색과 함께 보여주고,\n이미지에는 사용자 이름을 대체 텍스트로 넣어줘.',
    demoType: 'avatar',
  },
  {
    id: 'ui-badge',
    slug: 'badge',
    easyName: '상태를 알려주는 작은 표식',
    koreanName: '배지',
    englishName: 'Badge',
    summary: '새 글, 진행 중처럼 항목의 상태를 짧게 알려주는 작은 표식입니다.',
    category: 'display',
    keywords: ['배지', '뱃지', '상태', '라벨', 'NEW', '표식'],
    aliases: ['상태 배지', '라벨'],
    states: ['정보', '성공', '경고', '오류'],
    serviceExamples: [
      {
        serviceId: 'netflix',
        title: 'Netflix 신작 배지',
        description: '새로 올라온 콘텐츠에 새 에피소드 배지가 붙습니다.',
      },
      {
        serviceId: 'coupang',
        title: '쿠팡 로켓배송 배지',
        description: '상품 카드에 배송 유형을 알려주는 배지가 표시됩니다.',
      },
    ],
    relatedUxIds: ['ux-completion-feedback', 'ux-list-to-detail'],
    relatedUiIds: ['ui-tag', 'ui-notification-badge', 'ui-chip'],
    deviceNotes: {
      hasMeaningfulDifference: false,
    },
    useWhen: [
      '항목의 상태(신규, 완료, 오류)를 한눈에 보여줄 때',
      '목록에서 특정 항목을 구분해 강조할 때',
    ],
    avoidWhen: [
      '배지를 너무 많이 붙여 무엇이 중요한지 흐려질 때',
      '긴 문장을 배지에 담으려 할 때',
    ],
    confusedWith: '태그는 분류·주제 표시, 배지는 상태·속성 표시에 가깝습니다. 알림 배지는 개수를 알려주는 작은 점입니다.',
    accessibilityChecks: [
      '색상만으로 상태를 구분하지 않는가(텍스트 포함)?',
      '배경과 글자의 대비가 충분한가?',
    ],
    vibePrompt:
      '목록 항목에 상태 배지를 추가해줘.\n진행 중, 완료, 오류 세 가지를 색상과 텍스트로 함께 표시하고\n작은 글자여도 대비가 충분하게 해줘.',
    demoType: 'badge',
  },
  {
    id: 'ui-tag',
    slug: 'tag',
    easyName: '주제를 표시하는 꼬리표',
    koreanName: '태그',
    englishName: 'Tag',
    summary: '콘텐츠의 주제나 분류를 꼬리표처럼 붙여 보여주는 요소입니다.',
    category: 'display',
    keywords: ['태그', '꼬리표', '분류', '주제', '해시태그'],
    aliases: ['해시태그', '레이블'],
    serviceExamples: [
      {
        serviceId: 'instagram',
        title: 'Instagram 해시태그',
        description: '게시물에 붙은 해시태그로 같은 주제 글을 모아봅니다.',
      },
      {
        serviceId: 'notion',
        title: 'Notion 다중 선택 속성',
        description: '데이터베이스 항목에 색이 있는 태그를 여러 개 붙입니다.',
      },
    ],
    relatedUxIds: ['ux-filter', 'ux-search'],
    relatedUiIds: ['ui-chip', 'ui-badge', 'ui-filter-chip'],
    deviceNotes: {
      hasMeaningfulDifference: false,
    },
    useWhen: [
      '콘텐츠의 주제를 분류해 보여줄 때',
      '태그를 눌러 같은 주제를 모아보게 할 때',
    ],
    avoidWhen: [
      '한 항목에 태그를 대여섯 개 이상 붙여 어수선해질 때',
    ],
    confusedWith: '칩은 삭제·선택 조작이 가능한 조각이고, 태그는 주로 읽거나 눌러 이동하는 분류 표시입니다.',
    accessibilityChecks: [
      '태그가 링크라면 목적지를 알 수 있는 이름인가?',
      '색상 구분에 의존하지 않는가?',
    ],
    vibePrompt:
      '글 목록의 각 항목에 주제 태그를 붙여줘.\n태그를 누르면 같은 태그의 글만 걸러 보여주고,\n적용된 태그 필터를 상단에 표시해줘.',
    demoType: 'badge',
  },
  {
    id: 'ui-accordion',
    slug: 'accordion',
    easyName: '눌러서 펼치고 접는 목록',
    koreanName: '아코디언',
    englishName: 'Accordion',
    summary: '제목을 누르면 상세 내용이 펼쳐지고 다시 접히는 목록입니다.',
    category: 'display',
    keywords: ['아코디언', '펼치기', '접기', 'FAQ', '접이식'],
    aliases: ['익스팬더', '콜랩스', '디스클로저'],
    states: ['접힘', '펼침'],
    serviceExamples: [
      {
        serviceId: 'airbnb',
        title: 'Airbnb 자주 묻는 질문',
        description: '질문을 누르면 답변이 펼쳐지는 FAQ 구조입니다.',
      },
      {
        serviceId: 'notion',
        title: 'Notion 토글 블록',
        description: '토글 블록으로 긴 내용을 접어 두고 필요할 때 펼칩니다.',
      },
    ],
    relatedUxIds: ['ux-list-to-detail', 'ux-first-run-guide'],
    relatedUiIds: ['ui-list', 'ui-tab', 'ui-divider'],
    deviceNotes: {
      desktop: '여러 항목을 동시에 펼쳐 비교할 수 있게 하면 좋습니다.',
      tablet: '제목 행 전체를 터치 대상으로 만듭니다.',
      mobile: '긴 페이지를 줄여 주어 모바일에서 특히 유용합니다.',
      hasMeaningfulDifference: false,
    },
    useWhen: [
      'FAQ처럼 제목만 훑다가 필요한 것만 펼쳐 볼 때',
      '긴 상세 정보를 처음부터 다 보여줄 필요가 없을 때',
    ],
    avoidWhen: [
      '모든 사용자가 반드시 읽어야 하는 내용을 접어 둘 때',
      '내용이 한두 줄이라 접을 이유가 없을 때',
    ],
    confusedWith: '탭은 한 번에 하나의 묶음을 가로로 전환하고, 아코디언은 세로 목록에서 여러 개를 펼칠 수 있습니다.',
    accessibilityChecks: [
      '제목이 button으로 마크업되어 있는가?',
      'aria-expanded로 펼침 상태가 전달되는가?',
      '펼침 상태가 아이콘 방향 등으로 시각적으로도 보이는가?',
    ],
    vibePrompt:
      '자주 묻는 질문 아코디언을 만들어줘.\n질문 제목은 button으로 만들고 aria-expanded를 적용해줘.\n펼침·접힘을 화살표 아이콘 방향으로도 표시하고 키보드로 조작되게 해줘.',
    demoType: 'accordion',
    featured: true,
  },
  {
    id: 'ui-carousel',
    slug: 'carousel',
    easyName: '옆으로 넘겨 보는 콘텐츠 묶음',
    koreanName: '캐러셀',
    englishName: 'Carousel',
    summary: '여러 콘텐츠를 옆으로 넘기며 하나씩 보는 슬라이드 요소입니다.',
    category: 'display',
    keywords: ['캐러셀', '슬라이드', '슬라이더', '배너', '옆으로 넘기기'],
    aliases: ['슬라이드 쇼', '이미지 슬라이더'],
    states: ['기본', '이동 중', '첫 슬라이드', '마지막 슬라이드'],
    serviceExamples: [
      {
        serviceId: 'netflix',
        title: 'Netflix 콘텐츠 줄',
        description: '장르별 콘텐츠를 가로로 넘기며 탐색합니다.',
      },
      {
        serviceId: 'instagram',
        title: 'Instagram 여러 장 게시물',
        description: '한 게시물의 여러 사진을 옆으로 넘겨 봅니다.',
      },
      {
        serviceId: 'airbnb',
        title: 'Airbnb 숙소 사진',
        description: '숙소 카드 안에서 사진을 좌우로 넘겨 봅니다.',
      },
    ],
    relatedUxIds: ['ux-list-to-detail', 'ux-tab-switching'],
    relatedUiIds: ['ui-card', 'ui-pagination', 'ui-icon-button'],
    deviceNotes: {
      desktop: '좌우 화살표 버튼이 주된 조작 수단입니다.',
      tablet: '스와이프와 화살표를 함께 지원합니다.',
      mobile: '스와이프가 자연스럽고 현재 위치 점 표시가 중요합니다.',
      hasMeaningfulDifference: true,
    },
    useWhen: [
      '한 항목의 여러 이미지를 순서대로 보여줄 때',
      '좁은 공간에 많은 추천 콘텐츠를 담아야 할 때',
    ],
    avoidWhen: [
      '중요한 정보를 자동 슬라이드에 실어 놓칠 수 있을 때',
      '모든 항목을 반드시 봐야 하는 콘텐츠일 때',
    ],
    accessibilityChecks: [
      '이전·다음 버튼을 키보드로 조작할 수 있는가?',
      '현재 위치(몇 번째/전체)가 전달되는가?',
      '자동 재생이 있다면 멈춤 수단이 있는가?',
    ],
    vibePrompt:
      '추천 콘텐츠 캐러셀을 만들어줘.\n좌우 화살표 버튼과 현재 위치 점 표시를 넣고 모바일에서 스와이프를 지원해줘.\n자동 재생은 넣지 말고 키보드로도 넘길 수 있게 해줘.',
    demoType: 'static',
  },
  {
    id: 'ui-calendar',
    slug: 'calendar',
    easyName: '한 달을 한눈에 보는 달력',
    koreanName: '달력',
    englishName: 'Calendar',
    summary: '날짜와 일정을 월·주 단위 격자로 보여주는 요소입니다.',
    category: 'display',
    keywords: ['달력', '캘린더', '일정', '월간', '주간'],
    aliases: ['캘린더 뷰'],
    states: ['월 보기', '주 보기', '오늘 강조', '일정 표시'],
    serviceExamples: [
      {
        serviceId: 'google-calendar',
        title: 'Google Calendar 월 보기',
        description: '한 달 일정을 격자로 보고 날짜를 눌러 일정을 확인합니다.',
      },
      {
        serviceId: 'notion',
        title: 'Notion 캘린더 보기',
        description: '데이터베이스 항목을 달력 위에 배치해 봅니다.',
      },
    ],
    relatedUxIds: ['ux-date-selection', 'ux-list-to-detail'],
    relatedUiIds: ['ui-date-picker', 'ui-table', 'ui-segmented-control'],
    deviceNotes: {
      desktop: '월 격자에 일정 제목까지 함께 보여줄 수 있습니다.',
      tablet: '주 보기와 월 보기를 전환하며 씁니다.',
      mobile: '날짜 격자 + 아래 일정 목록 조합이 일반적입니다.',
      hasMeaningfulDifference: true,
    },
    useWhen: [
      '일정, 예약처럼 날짜 기반 정보를 보여줄 때',
      '요일 규칙이나 기간의 흐름이 중요할 때',
    ],
    avoidWhen: [
      '날짜가 큰 의미 없는 목록 데이터를 달력에 억지로 얹을 때',
    ],
    confusedWith: '날짜 선택기는 값을 입력받는 요소이고, 달력은 일정을 보여주는 표시 요소입니다.',
    accessibilityChecks: [
      '오늘 날짜가 색 외 방법으로도 표시되는가?',
      '키보드로 날짜 셀을 이동할 수 있는가?',
      '일정 개수가 많은 날의 축약 표시가 이해되는가?',
    ],
    vibePrompt:
      '월간 달력 화면을 만들어줘.\n오늘 날짜를 강조하고 일정이 있는 날에 점을 표시해줘.\n날짜를 누르면 아래에 그날 일정 목록이 나타나게 해줘.',
    demoType: 'static',
  },
  {
    id: 'ui-timeline',
    slug: 'timeline',
    easyName: '시간 순서대로 보여주는 줄',
    koreanName: '타임라인',
    englishName: 'Timeline',
    summary: '사건이나 기록을 시간 순서대로 한 줄로 늘어놓는 요소입니다.',
    category: 'display',
    keywords: ['타임라인', '시간순', '이력', '기록', '히스토리'],
    aliases: ['활동 기록', '히스토리'],
    serviceExamples: [
      {
        serviceId: 'coupang',
        title: '쿠팡 배송 조회',
        description: '주문부터 배송 완료까지 단계가 시간순으로 표시됩니다.',
      },
      {
        serviceId: 'google-drive',
        title: 'Google Drive 활동 내역',
        description: '파일의 세부정보 패널에서 편집·공유 활동이 시간순으로 나열됩니다.',
      },
    ],
    relatedUxIds: ['ux-version-history', 'ux-completion-feedback'],
    relatedUiIds: ['ui-list', 'ui-progress-bar', 'ui-badge'],
    deviceNotes: {
      desktop: '가로 타임라인으로 단계를 나란히 보여줄 수 있습니다.',
      tablet: '내용 길이에 따라 가로·세로를 선택합니다.',
      mobile: '세로 타임라인이 스크롤과 잘 맞습니다.',
      hasMeaningfulDifference: true,
    },
    useWhen: [
      '배송, 처리 단계처럼 진행 이력을 보여줄 때',
      '변경 기록을 시간순으로 확인해야 할 때',
    ],
    avoidWhen: [
      '순서가 중요하지 않은 항목을 시간축에 얹을 때',
    ],
    accessibilityChecks: [
      '목록 구조로 마크업되어 순서가 전달되는가?',
      '현재 단계가 색 외 방법으로도 표시되는가?',
    ],
    vibePrompt:
      '주문 배송 상태 타임라인을 만들어줘.\n결제 완료, 배송 준비, 배송 중, 배송 완료 단계를 세로로 나열하고\n현재 단계를 아이콘과 굵은 글씨로 강조해줘.',
    demoType: 'static',
  },
  {
    id: 'ui-code-block',
    slug: 'code-block',
    easyName: '코드를 보여주는 상자',
    koreanName: '코드 블록',
    englishName: 'Code Block',
    summary: '코드를 고정폭 글꼴과 복사 버튼과 함께 보여주는 상자입니다.',
    category: 'display',
    keywords: ['코드', '코드 블록', '복사', '스니펫', '프롬프트'],
    aliases: ['코드 스니펫'],
    states: ['기본', '복사 완료'],
    serviceExamples: [
      {
        serviceId: 'chatgpt',
        title: 'ChatGPT 코드 답변',
        description: '코드 답변이 복사 버튼이 달린 블록으로 표시됩니다.',
      },
      {
        serviceId: 'notion',
        title: 'Notion 코드 블록',
        description: '언어를 지정한 코드 블록을 문서에 넣습니다.',
      },
    ],
    relatedUxIds: ['ux-share-action', 'ux-completion-feedback'],
    relatedUiIds: ['ui-button', 'ui-toast'],
    deviceNotes: {
      desktop: '넓은 화면에서 줄바꿈 없이 코드를 보여줄 수 있습니다.',
      tablet: '가로 스크롤과 복사 버튼 조합으로 처리합니다.',
      mobile: '블록 안에서만 가로 스크롤되게 하고 페이지 전체가 밀리지 않게 합니다.',
      hasMeaningfulDifference: true,
    },
    useWhen: [
      '코드, 명령어, 프롬프트를 그대로 복사하게 할 때',
      '고정폭 정렬이 의미 있는 텍스트를 보여줄 때',
    ],
    avoidWhen: [
      '일반 문장을 코드 블록에 담아 강조 용도로만 쓸 때',
    ],
    accessibilityChecks: [
      '복사 버튼에 레이블이 있는가?',
      '복사 완료가 시각과 보조기기 모두에 전달되는가?',
      '가로 스크롤 영역에 키보드로 접근할 수 있는가?',
    ],
    vibePrompt:
      '프롬프트를 보여주는 코드 블록을 만들어줘.\n오른쪽 위에 복사 버튼을 두고 누르면 복사 완료 토스트를 띄워줘.\n내용이 길면 블록 안에서만 가로 스크롤되게 해줘.',
    demoType: 'static',
  },
];
