import type { CategoryMeta, UICategoryId, UXCategoryId } from '../types';

export const uiCategories: CategoryMeta<UICategoryId>[] = [
  {
    id: 'layout',
    easyName: '화면 나누기',
    name: '화면을 나누는 요소',
    description: '헤더, 카드, 구분선처럼 화면의 큰 틀과 영역을 만드는 요소입니다.',
  },
  {
    id: 'navigation',
    easyName: '이동하기',
    name: '화면을 이동하는 요소',
    description: '탭, 메뉴, 페이지네이션처럼 다른 화면이나 내용으로 이동하게 돕는 요소입니다.',
  },
  {
    id: 'control',
    easyName: '누르고 선택하기',
    name: '누르고 선택하는 요소',
    description: '버튼, 체크박스, 토글처럼 눌러서 동작을 실행하거나 옵션을 고르는 요소입니다.',
  },
  {
    id: 'input',
    easyName: '입력하기',
    name: '내용을 입력하는 요소',
    description: '입력창, 날짜 선택기, 파일 업로드처럼 사용자가 내용을 직접 넣는 요소입니다.',
  },
  {
    id: 'display',
    easyName: '정보 보여주기',
    name: '정보를 보여주는 요소',
    description: '목록, 표, 아코디언처럼 콘텐츠와 데이터를 보기 좋게 정리해 주는 요소입니다.',
  },
  {
    id: 'status',
    easyName: '상태 알려주기',
    name: '상태를 알려주는 요소',
    description: '토스트, 스피너, 빈 상태처럼 지금 무슨 일이 일어나는지 알려주는 요소입니다.',
  },
];

export const uxCategories: CategoryMeta<UXCategoryId>[] = [
  {
    id: 'find',
    easyName: '원하는 정보를 찾고 싶어요',
    name: '찾기',
    description: '검색, 필터, 정렬로 많은 콘텐츠 중에서 원하는 것을 빠르게 찾는 경험입니다.',
  },
  {
    id: 'enter',
    easyName: '내용을 입력하고 수정하고 싶어요',
    name: '입력하기',
    description: '폼 작성, 유효성 검사, 자동 저장처럼 내용을 넣고 고치는 경험입니다.',
  },
  {
    id: 'choose',
    easyName: '여러 선택지 중 하나를 고르고 싶어요',
    name: '선택하기',
    description: '날짜, 수량, 옵션처럼 여러 후보 중에서 원하는 것을 고르는 경험입니다.',
  },
  {
    id: 'move',
    easyName: '다른 화면으로 이동하고 싶어요',
    name: '이동하기',
    description: '메뉴 이동, 탭 전환, 뒤로가기처럼 화면 사이를 오가는 경험입니다.',
  },
  {
    id: 'act',
    easyName: '저장하거나 전송하고 싶어요',
    name: '실행하고 확인하기',
    description: '저장, 삭제, 공유 같은 행동을 실행하고 결과를 확인하는 경험입니다.',
  },
  {
    id: 'wait',
    easyName: '처리 상태를 이해하고 싶어요',
    name: '기다리고 이해하기',
    description: '로딩, 진행률, 오류처럼 기다리는 동안 상황을 이해하는 경험입니다.',
  },
  {
    id: 'share',
    easyName: '다른 사람과 공유하고 싶어요',
    name: '공유하고 협업하기',
    description: '링크 공유, 초대, 댓글처럼 다른 사람과 함께 작업하는 경험입니다.',
  },
  {
    id: 'start',
    easyName: '처음 서비스를 시작하고 싶어요',
    name: '시작하고 익숙해지기',
    description: '로그인, 온보딩, 도움말처럼 서비스를 처음 시작하고 익히는 경험입니다.',
  },
];

export function uiCategoryById(id: UICategoryId): CategoryMeta<UICategoryId> {
  const found = uiCategories.find((c) => c.id === id);
  if (!found) throw new Error(`알 수 없는 UI 카테고리: ${id}`);
  return found;
}

export function uxCategoryById(id: UXCategoryId): CategoryMeta<UXCategoryId> {
  const found = uxCategories.find((c) => c.id === id);
  if (!found) throw new Error(`알 수 없는 UX 카테고리: ${id}`);
  return found;
}
