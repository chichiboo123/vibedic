export type DeviceNotes = {
  desktop?: string;
  tablet?: string;
  mobile?: string;
  hasMeaningfulDifference: boolean;
};

export type ServiceExample = {
  serviceId: string;
  title: string;
  description: string;
};

export type UICategoryId =
  | 'layout'
  | 'navigation'
  | 'control'
  | 'input'
  | 'display'
  | 'status';

export type UXCategoryId =
  | 'find'
  | 'enter'
  | 'choose'
  | 'move'
  | 'act'
  | 'wait'
  | 'share'
  | 'start';

// 항목마다 고유한 데모/썸네일을 갖도록, UI 항목 수만큼 세분화한 식별자입니다.
// 'static'은 대응하는 UI 항목이 없을 때(예: UX 패턴의 대표 요소를 못 찾은 경우)만 쓰는 예비값입니다.
export type DemoType =
  // 조작 (control)
  | 'button'
  | 'icon-button'
  | 'fab'
  | 'checkbox'
  | 'radio'
  | 'toggle'
  | 'select'
  | 'combo-box'
  | 'chip'
  | 'filter-chip'
  | 'segmented-control'
  | 'range-slider'
  | 'stepper'
  // 입력 (input)
  | 'text-field'
  | 'search-field'
  | 'textarea'
  | 'password-field'
  | 'number-input'
  | 'date-picker'
  | 'time-picker'
  | 'file-upload'
  | 'autocomplete'
  | 'otp-input'
  // 내비게이션 (navigation)
  | 'main-menu'
  | 'tab'
  | 'bottom-navigation'
  | 'navigation-drawer'
  | 'navigation-rail'
  | 'breadcrumb'
  | 'pagination'
  | 'dropdown-menu'
  | 'context-menu'
  | 'command-palette'
  // 배치 (layout)
  | 'header'
  | 'footer'
  | 'sidebar'
  | 'top-app-bar'
  | 'card'
  | 'divider'
  | 'hero-section'
  // 보여주기 (display)
  | 'list'
  | 'table'
  | 'avatar'
  | 'badge'
  | 'tag'
  | 'accordion'
  | 'carousel'
  | 'calendar'
  | 'timeline'
  | 'code-block'
  // 상태 (status)
  | 'modal'
  | 'alert-dialog'
  | 'popover'
  | 'tooltip'
  | 'bottom-sheet'
  | 'drawer'
  | 'toast'
  | 'banner'
  | 'spinner'
  | 'progress'
  | 'skeleton'
  | 'empty-state'
  | 'notification-badge'
  | 'static';

export type UIItem = {
  id: string;
  slug: string;
  easyName: string;
  koreanName: string;
  englishName: string;
  summary: string;
  category: UICategoryId;
  keywords: string[];
  aliases: string[];
  states?: string[];
  serviceExamples: ServiceExample[];
  relatedUxIds: string[];
  relatedUiIds: string[];
  deviceNotes: DeviceNotes;
  useWhen: string[];
  avoidWhen: string[];
  confusedWith?: string;
  accessibilityChecks: string[];
  vibePrompt: string;
  demoType: DemoType;
  featured?: boolean;
};

export type UXPattern = {
  id: string;
  slug: string;
  koreanName: string;
  englishName: string;
  userGoal: string;
  summary: string;
  category: UXCategoryId;
  keywords: string[];
  flowSteps: string[];
  relatedUiIds: string[];
  relatedUxIds?: string[];
  serviceExamples: ServiceExample[];
  badExperience?: string;
  betterExperience?: string;
  deviceNotes: DeviceNotes;
  checklist: string[];
  vibePrompt: string;
  featured?: boolean;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  officialUrl: string;
  relatedUiIds: string[];
  relatedUxIds: string[];
  deviceHighlights: string[];
};

export type DeviceComparison = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  desktop: string;
  tablet: string;
  mobile: string;
  relatedUiIds: string[];
  relatedUxIds: string[];
};

export type CategoryMeta<T extends string> = {
  id: T;
  easyName: string;
  name: string;
  description: string;
};

export type SavedItemType = 'ui' | 'ux';

export type SavedItemRef = {
  type: SavedItemType;
  id: string;
};

export type SearchResultType = 'ui' | 'ux' | 'service' | 'compare';
