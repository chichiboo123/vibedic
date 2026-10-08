import type { VersusTopic } from '../types';

// "이거랑 저거랑 뭐가 달라요?"에 답하는 비교 주제입니다.
// 같은 기준(행)으로 나란히 놓아, 어떤 요소를 골라야 할지 바로 판단할 수 있게 합니다.
export const versusTopics: VersusTopic[] = [
  {
    id: 'versus-modal-sheet-drawer',
    slug: 'modal-sheet-drawer',
    title: '모달 · 바텀 시트 · 드로어',
    question: '화면 위에 뜨는 창, 셋 중 무엇을 써야 하나요?',
    uiIds: ['ui-modal', 'ui-bottom-sheet', 'ui-drawer'],
    rows: [
      { label: '나타나는 자리', values: ['화면 가운데', '화면 아래에서 위로', '화면 옆에서 안쪽으로'] },
      { label: '잘 맞는 기기', values: ['PC·태블릿', '모바일', 'PC·태블릿의 넓은 화면'] },
      {
        label: '대표 용도',
        values: ['짧은 입력, 설정 확인', '공유·옵션 같은 선택지 목록', '목록을 보면서 상세·필터 확인'],
      },
      {
        label: '뒤 화면',
        values: ['어둡게 가리고 조작 불가', '어둡게 가리거나 일부 보임', '그대로 보이며 함께 볼 수 있음'],
      },
      {
        label: '닫는 방법',
        values: ['닫기 버튼, ESC, 배경 클릭', '아래로 끌어내리기, 배경 탭', '닫기 버튼, ESC, 바깥 클릭'],
      },
    ],
    rule: '집중이 필요하면 모달, 모바일에서 고를 게 있으면 바텀 시트, 목록을 보면서 옆에 상세를 펼치려면 드로어.',
    promptTip:
      '"PC에서는 모달, 모바일(640px 미만)에서는 바텀 시트로 열리게 해줘"처럼 기기별로 함께 지정하면 반응형 창을 한 번에 만들 수 있어요.',
  },
  {
    id: 'versus-modal-alert',
    slug: 'modal-vs-alert-dialog',
    title: '모달 · 경고 다이얼로그',
    question: '둘 다 가운데 뜨는 창인데 뭐가 다른가요?',
    uiIds: ['ui-modal', 'ui-alert-dialog'],
    rows: [
      { label: '목적', values: ['한 가지 작업에 집중', '되돌리기 어려운 행동 확인'] },
      { label: '내용 양', values: ['폼, 목록 등 비교적 많음', '한두 문장과 버튼 두 개'] },
      { label: '배경 클릭', values: ['보통 닫힘', '닫히지 않음, 반드시 선택'] },
      { label: '기본 포커스', values: ['첫 입력 칸이나 제목', '안전한 쪽(취소) 버튼'] },
      { label: 'ARIA 역할', values: ['role="dialog"', 'role="alertdialog"'] },
    ],
    rule: '무언가를 "하게" 하려면 모달, 무언가를 "확인받으려면" 경고 다이얼로그.',
    promptTip:
      '"삭제 버튼을 누르면 경고 다이얼로그(role=alertdialog)로 파일 이름을 보여주고, 기본 포커스는 취소에 둬줘"처럼 역할과 포커스까지 말해 주세요.',
  },
  {
    id: 'versus-toast-banner-alert',
    slug: 'toast-banner-alert',
    title: '토스트 · 배너 · 경고 다이얼로그',
    question: '사용자에게 알릴 때 무엇을 골라야 하나요?',
    uiIds: ['ui-toast', 'ui-banner', 'ui-alert-dialog'],
    rows: [
      { label: '나타나는 자리', values: ['화면 아래나 구석', '화면 위쪽 띠', '화면 가운데'] },
      { label: '사라지는 때', values: ['몇 초 뒤 자동으로', '사용자가 닫거나 상황이 끝날 때', '사용자가 선택할 때'] },
      { label: '작업 방해', values: ['방해하지 않음', '거의 방해하지 않음', '작업을 멈추고 응답 요구'] },
      { label: '어울리는 내용', values: ['저장됨, 복사됨 같은 결과', '점검 예정, 오프라인 같은 지속 상태', '삭제 확인처럼 결정이 필요한 일'] },
    ],
    rule: '결과 알림은 토스트, 계속 알아야 하는 상태는 배너, 결정이 필요하면 경고 다이얼로그.',
    promptTip:
      '토스트를 요청할 때는 "3초 뒤 사라지고 role=status로 읽히게, 실행 취소 버튼 포함"처럼 시간과 접근성 조건을 붙이면 좋아요.',
  },
  {
    id: 'versus-checkbox-toggle-radio',
    slug: 'checkbox-toggle-radio',
    title: '체크박스 · 토글 스위치 · 라디오 버튼',
    question: '켜고 끄고 고르는 요소, 언제 무엇을 쓰나요?',
    uiIds: ['ui-checkbox', 'ui-toggle-switch', 'ui-radio-button'],
    rows: [
      { label: '고를 수 있는 수', values: ['여러 개 (0개도 가능)', '하나의 켜기/끄기', '여러 개 중 딱 하나'] },
      { label: '적용 시점', values: ['보통 저장·제출할 때', '누르는 즉시', '보통 저장·제출할 때'] },
      { label: '대표 예', values: ['약관 동의, 여러 관심사 선택', '알림 받기, 다크 모드', '배송 방법, 결제 수단'] },
      { label: '모양', values: ['네모와 체크 표시', '좌우로 움직이는 손잡이', '동그라미와 가운데 점'] },
    ],
    rule: '여러 개 고르면 체크박스, 바로 켜고 끄면 토글, 하나만 고르면 라디오.',
    promptTip:
      '토글은 "누르는 즉시 적용", 체크박스는 "저장 버튼으로 적용"처럼 적용 시점을 프롬프트에 함께 쓰면 동작이 헷갈리지 않아요.',
  },
  {
    id: 'versus-select-combo-autocomplete',
    slug: 'select-combobox-autocomplete',
    title: '셀렉트 · 콤보 박스 · 자동 완성',
    question: '목록에서 고르는 입력, 무엇이 다른가요?',
    uiIds: ['ui-select', 'ui-combo-box', 'ui-autocomplete'],
    rows: [
      { label: '직접 타이핑', values: ['안 함, 펼쳐서 고름', '함, 글자로 목록을 거름', '함, 추천을 받음'] },
      { label: '목록 밖 값', values: ['입력 불가', '보통 불가(목록 중 선택)', '가능, 추천은 도움일 뿐'] },
      { label: '어울리는 선택지 수', values: ['10개 안팎', '수십~수백 개', '정해지지 않음(검색어 등)'] },
      { label: '대표 예', values: ['정렬 기준, 국가 코드 일부', '시간대, 도시 선택', '검색창, 주소 입력'] },
    ],
    rule: '선택지가 적으면 셀렉트, 많아서 찾아야 하면 콤보 박스, 자유 입력에 도움을 주려면 자동 완성.',
    promptTip:
      '"선택지가 100개가 넘으니 글자로 거를 수 있는 콤보 박스로 만들어줘"처럼 선택지 수를 알려주면 AI가 알맞은 요소를 고릅니다.',
  },
  {
    id: 'versus-tooltip-popover',
    slug: 'tooltip-vs-popover',
    title: '툴팁 · 팝오버',
    question: '요소 옆에 뜨는 작은 창, 어떻게 구분하나요?',
    uiIds: ['ui-tooltip', 'ui-popover'],
    rows: [
      { label: '여는 방법', values: ['마우스 올리기, 키보드 포커스', '클릭이나 탭'] },
      { label: '내용', values: ['한 줄 이름이나 설명', '여러 줄, 버튼·링크 포함 가능'] },
      { label: '안의 요소 조작', values: ['불가', '가능'] },
      { label: '모바일', values: ['호버가 없어 잘 맞지 않음', '탭으로 자연스럽게 사용'] },
    ],
    rule: '"이게 뭐지?"에 답하면 툴팁, 그 자리에서 "무언가를 하게" 하면 팝오버.',
    promptTip: '아이콘 버튼의 이름은 툴팁으로, 공유 옵션처럼 눌러야 하는 내용은 팝오버로 요청하세요.',
  },
  {
    id: 'versus-chip-tag-badge',
    slug: 'chip-tag-badge',
    title: '칩 · 태그 · 배지',
    question: '작고 둥근 조각들, 이름이 다 다른 이유가 뭔가요?',
    uiIds: ['ui-chip', 'ui-tag', 'ui-badge'],
    rows: [
      { label: '역할', values: ['선택 값·키워드 표시와 조작', '주제·분류 꼬리표', '상태나 개수를 짧게 표시'] },
      { label: '누를 수 있나', values: ['보통 가능(선택, 삭제)', '눌러서 같은 분류로 이동하기도 함', '보통 불가'] },
      { label: '대표 예', values: ['받는 사람 칩, 검색어 칩', '#해시태그, 글 분류', 'NEW, 로켓배송, 진행 중'] },
    ],
    rule: '조작하면 칩, 분류하면 태그, 상태를 알리면 배지.',
    promptTip: '"상태 배지는 색과 함께 글자로도 상태를 써줘"라고 덧붙이면 색만으로 구분하는 실수를 막을 수 있어요.',
  },
  {
    id: 'versus-tab-segmented',
    slug: 'tab-vs-segmented-control',
    title: '탭 · 세그먼티드 컨트롤',
    question: '둘 다 하나를 골라 전환하는데 무엇이 다른가요?',
    uiIds: ['ui-tab', 'ui-segmented-control'],
    rows: [
      { label: '바꾸는 것', values: ['서로 다른 내용 묶음', '같은 내용의 보기 방식이나 모드'] },
      { label: '모양', values: ['밑줄이나 강조된 글자 줄', '붙어 있는 버튼 묶음'] },
      { label: '적당한 개수', values: ['2~7개', '2~5개'] },
      { label: '대표 예', values: ['상품 정보 / 리뷰 / 문의', '일 / 주 / 월 보기, 목록 / 격자'] },
    ],
    rule: '내용이 바뀌면 탭, 같은 내용을 다르게 보면 세그먼티드 컨트롤.',
    promptTip: '탭은 "role=tablist와 화살표 키 이동"을, 세그먼티드 컨트롤은 "aria-pressed 버튼 묶음"을 요청하면 접근성까지 챙길 수 있어요.',
  },
  {
    id: 'versus-loading',
    slug: 'spinner-progress-skeleton',
    title: '스피너 · 진행률 막대 · 스켈레톤',
    question: '기다리는 동안 무엇을 보여줘야 하나요?',
    uiIds: ['ui-spinner', 'ui-progress-bar', 'ui-skeleton'],
    rows: [
      { label: '알려주는 것', values: ['무언가 처리 중', '얼마나 진행됐는지', '곧 나타날 내용의 모양'] },
      { label: '어울리는 시간', values: ['1~3초 정도의 짧은 대기', '업로드처럼 길고 측정 가능한 작업', '목록·카드가 처음 뜰 때'] },
      { label: '대표 예', values: ['버튼 안 저장 중 표시', '파일 업로드 73%', '피드 첫 로딩의 회색 틀'] },
    ],
    rule: '짧으면 스피너, 길고 셀 수 있으면 진행률, 화면이 처음 채워질 땐 스켈레톤.',
    promptTip: '"목록을 불러오는 동안 실제 카드와 같은 크기의 스켈레톤 3개를 보여줘"처럼 크기를 맞춰 달라고 하면 화면이 덜 흔들려요.',
  },
  {
    id: 'versus-dropdown-select',
    slug: 'dropdown-menu-vs-select',
    title: '드롭다운 메뉴 · 셀렉트',
    question: '둘 다 아래로 펼쳐지는데 같은 것 아닌가요?',
    uiIds: ['ui-dropdown-menu', 'ui-select'],
    rows: [
      { label: '고르면 일어나는 일', values: ['동작이 실행됨(복제, 삭제 등)', '값이 선택되어 남음'] },
      { label: '고른 뒤 버튼 모양', values: ['그대로', '고른 값이 표시됨'] },
      { label: '폼 제출', values: ['관련 없음', '폼 값으로 함께 제출'] },
      { label: '대표 예', values: ['⋯ 더보기 메뉴', '정렬 기준, 지역 선택'] },
    ],
    rule: '"무엇을 할까"는 드롭다운 메뉴, "무엇으로 할까"는 셀렉트.',
    promptTip: '"더보기 버튼을 누르면 수정·복제·삭제 드롭다운 메뉴(role=menu)를 열어줘"처럼 동작 목록임을 분명히 해 주세요.',
  },
  {
    id: 'versus-sidebar-drawer-rail',
    slug: 'sidebar-drawer-rail',
    title: '사이드바 · 내비게이션 드로어 · 내비게이션 레일',
    question: '옆에 붙는 메뉴, 화면 크기마다 무엇을 쓰나요?',
    uiIds: ['ui-sidebar', 'ui-navigation-drawer', 'ui-navigation-rail'],
    rows: [
      { label: '평소 상태', values: ['항상 펼쳐져 있음', '숨어 있다가 버튼으로 열림', '얇게 항상 보임'] },
      { label: '잘 맞는 화면', values: ['PC', '모바일', '태블릿'] },
      { label: '보여주는 정보', values: ['아이콘, 글자, 하위 메뉴까지', '전체 메뉴 목록', '아이콘과 짧은 글자 3~7개'] },
    ],
    rule: '넓으면 사이드바, 중간이면 레일, 좁으면 드로어(또는 하단 내비게이션).',
    promptTip: '"1024px 이상은 사이드바, 768~1023px는 내비게이션 레일, 그보다 좁으면 햄버거 버튼과 드로어로 바꿔줘"처럼 구간을 숫자로 주세요.',
  },
  {
    id: 'versus-buttons',
    slug: 'button-icon-button-fab',
    title: '버튼 · 아이콘 버튼 · 플로팅 버튼',
    question: '누르는 버튼에도 종류가 있나요?',
    uiIds: ['ui-button', 'ui-icon-button', 'ui-fab'],
    rows: [
      { label: '모양', values: ['글자(와 아이콘)', '아이콘만', '화면 위에 떠 있는 둥근 버튼'] },
      { label: '자리', values: ['폼 아래, 카드 안 등 어디든', '툴바, 카드 구석', '화면 오른쪽 아래 고정'] },
      { label: '개수', values: ['화면당 주요 버튼은 하나', '여러 개 나란히', '화면당 하나'] },
      { label: '꼭 챙길 것', values: ['동작이 드러나는 레이블', '보이지 않는 aria-label', '콘텐츠를 가리지 않는 위치'] },
    ],
    rule: '보통은 버튼, 공간이 좁고 뜻이 분명한 아이콘이면 아이콘 버튼, 화면의 대표 행동 하나는 플로팅 버튼.',
    promptTip: '아이콘 버튼을 요청할 땐 "aria-label은 \'닫기\'로"처럼 화면에 안 보이는 이름까지 지정해 주세요.',
  },
];

const bySlug = new Map(versusTopics.map((topic) => [topic.slug, topic]));

export function findVersusBySlug(slug: string): VersusTopic | undefined {
  return bySlug.get(slug);
}
