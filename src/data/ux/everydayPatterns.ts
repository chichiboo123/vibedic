import type { UXPattern } from '../../types';

// 1.1에서 추가한, 일상적인 서비스에서 자주 만나는 UX 패턴들입니다.
// 분류별로 나눠 내보내고 uxPatterns.ts에서 각 분류 뒤에 이어 붙입니다.

export const moreFindPatterns: UXPattern[] = [
  {
    id: 'ux-load-more',
    slug: 'load-more',
    koreanName: '더 불러오기와 무한 스크롤',
    englishName: 'Load More & Infinite Scroll',
    userGoal: '목록을 끊김 없이 계속 보고 싶어요.',
    summary: '목록 끝에 다다르면 다음 내용을 이어서 불러와 페이지를 넘기지 않고 계속 보는 경험입니다.',
    category: 'find',
    keywords: ['무한 스크롤', '더보기', '더 보기 버튼', '다음 페이지', '피드', '스크롤 로딩', 'load more'],
    flowSteps: ['목록 스크롤', '목록 끝 도달', '다음 내용 로딩 표시', '새 항목 이어 붙이기', '끝이면 마지막 안내'],
    relatedUiIds: ['ui-list', 'ui-skeleton', 'ui-spinner', 'ui-pagination', 'ui-button'],
    relatedUxIds: ['ux-loading', 'ux-list-to-detail', 'ux-back-navigation'],
    serviceExamples: [
      {
        serviceId: 'instagram',
        title: 'Instagram 피드 이어 보기',
        description: '피드 끝에 가까워지면 다음 게시물이 자동으로 이어 붙어 스크롤이 끊기지 않습니다.',
      },
      {
        serviceId: 'youtube',
        title: 'YouTube 홈 추천 이어 보기',
        description: '홈 화면을 내릴수록 추천 영상 카드가 스켈레톤을 거쳐 계속 채워집니다.',
      },
      {
        serviceId: 'naver',
        title: '네이버 뉴스 더보기',
        description: '목록 아래 더보기 버튼을 눌러 다음 기사 묶음을 펼치고, 푸터에도 닿을 수 있게 합니다.',
      },
    ],
    badExperience:
      '끝없이 내용이 붙어서 푸터의 고객센터 링크에 영원히 닿을 수 없고, 상세에 들어갔다 오면 맨 위로 돌아가 버립니다.',
    betterExperience:
      '피드처럼 끝이 없는 목록엔 무한 스크롤, 찾고 비교하는 목록엔 더보기 버튼을 쓰고, 뒤로 오면 보던 위치를 복원합니다.',
    deviceNotes: {
      desktop: '푸터나 사이드 정보에 접근해야 하므로 더보기 버튼이나 페이지네이션이 더 편할 때가 많습니다.',
      tablet: '터치 스크롤이 자연스러워 무한 스크롤도 잘 맞지만, 위치 복원은 꼭 챙깁니다.',
      mobile: '엄지로 계속 내리는 흐름이라 무한 스크롤이 가장 자연스럽습니다. 맨 위로 가기 버튼을 함께 둡니다.',
      hasMeaningfulDifference: true,
    },
    checklist: [
      '새로 불러오는 동안 로딩 상태가 보이고 보조기기에도 알려지는가?',
      '더 불러올 내용이 없을 때 끝났다는 안내가 있는가?',
      '상세에서 돌아왔을 때 보던 위치가 유지되는가?',
      '키보드 사용자도 푸터와 다른 영역으로 이동할 수 있는가?',
    ],
    vibePrompt:
      '상품 목록에 더 불러오기 기능을 만들어줘.\n처음엔 20개를 보여주고, 목록 아래 "더 보기" 버튼을 누르면 다음 20개를 이어 붙여줘.\n불러오는 동안엔 버튼 자리에 스켈레톤 카드 3개를 보여주고, 더 이상 없으면 "모든 상품을 다 봤어요" 문구로 바꿔줘.\n상세 페이지에 갔다가 뒤로 오면 보던 스크롤 위치를 복원해줘.',
  },
  {
    id: 'ux-recent-history',
    slug: 'recent-history',
    koreanName: '최근 기록 다시 찾기',
    englishName: 'Recent History',
    userGoal: '아까 봤던 걸 다시 찾고 싶어요.',
    summary: '최근 검색어나 최근 본 항목을 남겨 두어, 기억을 더듬지 않고 바로 다시 찾게 하는 경험입니다.',
    category: 'find',
    keywords: ['최근 검색어', '최근 본 상품', '시청 기록', '방문 기록', '히스토리', '기록 삭제'],
    flowSteps: ['검색창이나 기록 화면 열기', '최근 기록 목록 확인', '항목 선택해 다시 열기', '필요 없는 기록 개별 삭제'],
    relatedUiIds: ['ui-list', 'ui-search-field', 'ui-chip', 'ui-icon-button'],
    relatedUxIds: ['ux-search', 'ux-autocomplete', 'ux-list-to-detail'],
    serviceExamples: [
      {
        serviceId: 'coupang',
        title: '쿠팡 최근 본 상품',
        description: '둘러본 상품이 따로 모여 있어 비교하다 놓친 상품을 다시 찾기 쉽습니다.',
      },
      {
        serviceId: 'youtube',
        title: 'YouTube 시청 기록',
        description: '본 영상을 날짜별로 모아 보여주고, 하나씩 지우거나 기록을 멈출 수 있습니다.',
      },
      {
        serviceId: 'naver',
        title: '네이버 최근 검색어',
        description: '검색창을 누르면 최근 검색어가 칩처럼 나타나고 X 버튼으로 하나씩 지울 수 있습니다.',
      },
    ],
    badExperience: '기록이 쌓이기만 하고 지울 방법이 없어, 남에게 화면을 보여주기 곤란해집니다.',
    betterExperience: '최근 기록은 가장 최근 것부터 보여주고, 개별 삭제·전체 삭제·기록 끄기를 함께 제공합니다.',
    deviceNotes: {
      hasMeaningfulDifference: false,
    },
    checklist: [
      '최근 항목이 가장 위에 오고 중복이 정리되는가?',
      '기록을 하나씩, 그리고 한꺼번에 지울 수 있는가?',
      '삭제 버튼에 어떤 기록을 지우는지 알 수 있는 레이블이 있는가?',
      '기록이 없을 때 빈 상태 안내가 있는가?',
    ],
    vibePrompt:
      '검색창에 최근 검색어 기능을 만들어줘.\n검색할 때마다 localStorage에 최대 8개까지 저장하고, 같은 검색어는 맨 앞으로 올려줘.\n검색창을 누르면 최근 검색어를 칩 목록으로 보여주고, 각 칩에는 "최근 검색어 삭제: 검색어" 레이블의 X 버튼을 달아줘.\n목록 위에는 전체 삭제 버튼을 둬줘.',
  },
];

export const moreChoosePatterns: UXPattern[] = [
  {
    id: 'ux-plan-comparison',
    slug: 'plan-comparison',
    koreanName: '비교하며 고르기',
    englishName: 'Comparison Choice',
    userGoal: '여러 요금제를 나란히 비교해 보고 고르고 싶어요.',
    summary: '요금제·상품처럼 비슷한 선택지의 차이를 한눈에 비교하고 나에게 맞는 것을 고르는 경험입니다.',
    category: 'choose',
    keywords: ['요금제', '플랜', '가격표', '비교표', '구독', '추천 플랜', 'pricing'],
    flowSteps: ['선택지 나란히 보기', '결제 주기 전환', '차이 나는 기능 확인', '추천 표시 참고', '선택하고 다음 단계로'],
    relatedUiIds: ['ui-card', 'ui-table', 'ui-badge', 'ui-segmented-control', 'ui-button'],
    relatedUxIds: ['ux-single-choice', 'ux-default-values', 'ux-input-confirm'],
    serviceExamples: [
      {
        serviceId: 'chatgpt',
        title: 'ChatGPT 요금제 비교',
        description: '요금제를 카드로 나란히 놓고 각 카드에 포함된 기능을 목록으로 비교하게 합니다.',
      },
      {
        serviceId: 'notion',
        title: 'Notion 요금제 표',
        description: '월간·연간 결제를 전환하면 가격이 바뀌고, 아래 표에서 기능 차이를 자세히 비교합니다.',
      },
      {
        serviceId: 'canva',
        title: 'Canva 무료와 Pro 비교',
        description: '무료와 유료의 차이를 나란히 보여주고, 추천 요금제에 배지를 붙여 시선을 모읍니다.',
      },
    ],
    badExperience: '요금제마다 설명 순서가 달라서 무엇이 다른지 직접 대조해야 하고, 가격에 세금 포함 여부도 알 수 없습니다.',
    betterExperience: '같은 기준을 같은 줄에 맞춰 보여주고, 차이 나는 부분만 강조하며, 최종 결제 금액을 미리 알려줍니다.',
    deviceNotes: {
      desktop: '세 개 안팎의 요금제 카드를 가로로 나란히 두고 아래에 상세 비교표를 붙입니다.',
      tablet: '카드는 두 열로, 비교표는 가로 스크롤 컨테이너에 담습니다.',
      mobile: '카드를 세로로 쌓거나 세그먼티드 컨트롤로 하나씩 전환해 보여줍니다. 비교표는 요금제별로 접어 둡니다.',
      hasMeaningfulDifference: true,
    },
    checklist: [
      '모든 선택지가 같은 기준과 같은 순서로 설명되는가?',
      '추천 표시를 색뿐 아니라 글자로도 알 수 있는가?',
      '결제 주기를 바꾸면 가격이 즉시 바뀌고 할인율이 보이는가?',
      '모바일에서도 비교 정보가 잘리지 않는가?',
    ],
    vibePrompt:
      '요금제 선택 화면을 만들어줘.\n무료·프로·팀 세 가지 요금제를 카드로 나란히 보여주고, 상단에 월간/연간 세그먼티드 컨트롤을 둬서 누르면 가격이 바뀌게 해줘.\n프로 카드에는 "추천" 배지를 달고, 카드마다 포함 기능을 같은 순서의 체크 목록으로 보여줘.\n모바일에서는 카드를 세로로 쌓아줘.',
  },
];

export const moreActPatterns: UXPattern[] = [
  {
    id: 'ux-favorite',
    slug: 'favorite',
    koreanName: '찜과 좋아요',
    englishName: 'Favorite & Like',
    userGoal: '마음에 드는 걸 표시해 두고 나중에 다시 보고 싶어요.',
    summary: '하트나 북마크 버튼 한 번으로 마음에 드는 항목을 표시하고, 모아 둔 곳에서 다시 꺼내 보는 경험입니다.',
    category: 'act',
    keywords: ['찜', '좋아요', '하트', '북마크', '위시리스트', '즐겨찾기', '관심 상품'],
    flowSteps: ['하트·북마크 버튼 누르기', '즉시 채워진 아이콘으로 바뀜', '짧은 확인 알림', '모아 보기 화면에서 다시 보기'],
    relatedUiIds: ['ui-icon-button', 'ui-toast', 'ui-badge', 'ui-list'],
    relatedUxIds: ['ux-save-action', 'ux-undo', 'ux-recent-history'],
    serviceExamples: [
      {
        serviceId: 'airbnb',
        title: 'Airbnb 위시리스트',
        description: '숙소 사진 위 하트를 누르면 위시리스트에 담기고, 어느 목록에 담을지 고를 수 있습니다.',
      },
      {
        serviceId: 'instagram',
        title: 'Instagram 게시물 저장',
        description: '북마크 아이콘을 누르면 아이콘이 채워지고, 프로필의 저장됨 탭에서 다시 볼 수 있습니다.',
      },
      {
        serviceId: 'coupang',
        title: '쿠팡 찜한 상품',
        description: '상품의 하트를 눌러 찜하고, 찜 목록에서 가격 변동과 함께 다시 확인합니다.',
      },
    ],
    badExperience: '하트를 눌러도 서버 응답을 기다리느라 한참 뒤에 바뀌어서, 여러 번 누르다 오히려 취소됩니다.',
    betterExperience: '누르는 즉시 아이콘을 바꾸고(낙관적 업데이트), 실패하면 원래대로 돌리며 이유를 알려줍니다.',
    deviceNotes: {
      desktop: '카드에 마우스를 올렸을 때 하트를 보여줄 수 있지만, 키보드로도 닿을 수 있어야 합니다.',
      tablet: '호버가 없으므로 하트를 항상 보이게 두고 터치 영역을 충분히 줍니다.',
      mobile: '두 번 탭으로 좋아요를 누르는 제스처를 더할 수 있지만, 버튼도 반드시 함께 둡니다.',
      hasMeaningfulDifference: true,
    },
    checklist: [
      '버튼에 aria-pressed 같은 눌림 상태가 있는가?',
      '레이블이 "찜하기"/"찜 해제"처럼 현재 상태에 맞게 바뀌는가?',
      '누르면 즉시 반응하고 실패 시 되돌리는가?',
      '모아 둔 항목을 다시 볼 수 있는 곳이 분명한가?',
    ],
    vibePrompt:
      '상품 카드에 찜 버튼을 만들어줘.\n하트 아이콘 버튼을 누르면 즉시 채워진 하트로 바꾸고 "찜 목록에 담았어요" 토스트를 띄워줘.\n버튼에는 aria-pressed와 "찜하기"/"찜 해제" 레이블을 상태에 맞게 넣어줘.\n저장 요청이 실패하면 아이콘을 원래대로 돌리고 오류 토스트를 보여줘.',
  },
];

export const moreSharePatterns: UXPattern[] = [
  {
    id: 'ux-notifications',
    slug: 'notifications',
    koreanName: '알림 확인',
    englishName: 'Notifications',
    userGoal: '새 소식을 놓치지 않고 확인하고 싶어요.',
    summary: '댓글, 초대, 일정처럼 나와 관련된 새 소식을 한곳에 모아 보여주고 읽음 상태를 관리하는 경험입니다.',
    category: 'share',
    keywords: ['알림', '알림 센터', '종 아이콘', '읽음', '안 읽음', '푸시', '알림 설정'],
    flowSteps: ['종 아이콘의 숫자 확인', '알림 목록 열기', '안 읽은 알림부터 확인', '알림 눌러 해당 화면으로 이동', '모두 읽음 처리'],
    relatedUiIds: ['ui-notification-badge', 'ui-popover', 'ui-list', 'ui-toggle-switch'],
    relatedUxIds: ['ux-comments', 'ux-permission-request'],
    serviceExamples: [
      {
        serviceId: 'youtube',
        title: 'YouTube 알림 목록',
        description: '종 아이콘을 누르면 구독 채널의 새 영상과 댓글 답글이 목록으로 열립니다.',
      },
      {
        serviceId: 'notion',
        title: 'Notion 받은 편지함',
        description: '멘션과 페이지 변경을 받은 편지함에 모으고, 읽은 알림은 보관할 수 있습니다.',
      },
      {
        serviceId: 'google-calendar',
        title: 'Google Calendar 일정 알림',
        description: '일정 시작 전에 알림을 보내고, 일정마다 알림 시간을 따로 정할 수 있습니다.',
      },
    ],
    badExperience: '모든 활동을 알림으로 보내서 중요한 소식이 묻히고, 결국 알림을 통째로 꺼 버리게 됩니다.',
    betterExperience: '알림 종류별로 켜고 끌 수 있게 하고, 안 읽은 알림을 구분해 보여주며, 누르면 정확한 위치로 이동합니다.',
    deviceNotes: {
      desktop: '헤더의 종 아이콘을 누르면 팝오버로 최근 알림을 보여주고 전체 보기로 이어집니다.',
      tablet: '팝오버 대신 오른쪽 드로어로 알림 목록을 열 수 있습니다.',
      mobile: '하단 내비게이션의 탭이나 전체 화면 목록으로 알림을 보여줍니다.',
      hasMeaningfulDifference: true,
    },
    checklist: [
      '안 읽은 알림을 색 말고도 점이나 글자로 구분하는가?',
      '알림 숫자가 보조기기에 "안 읽은 알림 3개"처럼 읽히는가?',
      '알림을 누르면 관련 화면의 정확한 위치로 이동하는가?',
      '알림 종류별로 받을지 말지 정할 수 있는가?',
    ],
    vibePrompt:
      '헤더에 알림 센터를 만들어줘.\n종 아이콘 버튼에 안 읽은 알림 수 배지를 붙이고, 누르면 팝오버로 최근 알림 목록을 보여줘.\n안 읽은 알림은 왼쪽에 점과 "새 알림" 숨김 텍스트로 구분하고, 상단에 "모두 읽음" 버튼을 둬줘.\n버튼 레이블은 "알림, 안 읽은 알림 3개"처럼 개수를 포함해줘.',
  },
];

export const moreStartPatterns: UXPattern[] = [
  {
    id: 'ux-permission-request',
    slug: 'permission-request',
    koreanName: '권한 요청',
    englishName: 'Permission Request',
    userGoal: '왜 필요한지 알고 나서 허용하고 싶어요.',
    summary: '위치, 알림, 카메라처럼 기기 권한이 필요할 때 이유를 먼저 설명하고 필요한 순간에 요청하는 경험입니다.',
    category: 'start',
    keywords: ['권한', '위치 권한', '알림 권한', '카메라 권한', '허용', '거부', '브라우저 권한'],
    flowSteps: ['권한이 필요한 기능 사용', '이유를 설명하는 안내 표시', '사용자가 계속하기 선택', '브라우저·기기 권한 창', '거부 시 대안 안내'],
    relatedUiIds: ['ui-modal', 'ui-banner', 'ui-button', 'ui-alert-dialog'],
    relatedUxIds: ['ux-onboarding', 'ux-notifications', 'ux-error-recovery'],
    serviceExamples: [
      {
        serviceId: 'naver',
        title: '네이버 지도 내 위치',
        description: '내 위치 버튼을 누른 순간에 위치 권한을 요청해, 왜 필요한지 맥락이 분명합니다.',
      },
      {
        serviceId: 'google-calendar',
        title: 'Google Calendar 브라우저 알림 허용',
        description: '일정 알림을 켜려 할 때 브라우저 알림 권한이 필요하다고 먼저 안내합니다.',
      },
      {
        serviceId: 'kakaotalk',
        title: '카카오톡 사진 전송 권한',
        description: '사진을 보내려는 순간 사진 접근 권한을 요청하고, 일부 사진만 허용하는 선택지도 따릅니다.',
      },
    ],
    badExperience: '앱을 열자마자 위치·알림·카메라 권한 창이 연달아 떠서 이유도 모른 채 모두 거부하게 됩니다.',
    betterExperience: '기능을 쓰려는 순간에 한 가지 권한만, 이유와 함께 요청하고, 거부해도 쓸 수 있는 대안을 남겨 둡니다.',
    deviceNotes: {
      desktop: '브라우저 주소창 근처에 권한 창이 뜨므로, 화면 안에서 미리 어디를 눌러야 하는지 알려줍니다.',
      tablet: '운영체제 권한 창이 화면 가운데를 덮으므로 직전 안내 화면에서 이유를 충분히 설명합니다.',
      mobile: '한 번 거부하면 다시 묻기 어려우므로, 설정 앱으로 가는 방법을 안내하는 대안 화면이 필요합니다.',
      hasMeaningfulDifference: true,
    },
    checklist: [
      '권한이 필요한 순간에, 필요한 권한 하나만 요청하는가?',
      '시스템 권한 창 전에 왜 필요한지 설명하는가?',
      '거부해도 서비스를 계속 쓸 수 있는 대안이 있는가?',
      '나중에 다시 허용하는 방법을 안내하는가?',
    ],
    vibePrompt:
      '내 주변 매장 찾기 기능에 위치 권한 요청 흐름을 만들어줘.\n"내 위치로 찾기" 버튼을 누르면 먼저 모달로 위치가 왜 필요한지 설명하고 [계속하기]/[주소 직접 입력] 버튼을 보여줘.\n계속하기를 누를 때만 navigator.geolocation을 호출하고, 거부되면 주소 입력창으로 안내하는 배너를 보여줘.',
  },
];
