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

export type DemoType =
  | 'button'
  | 'icon-button'
  | 'fab'
  | 'checkbox'
  | 'radio'
  | 'toggle'
  | 'tab'
  | 'select'
  | 'combo-box'
  | 'search-field'
  | 'autocomplete'
  | 'modal'
  | 'alert-dialog'
  | 'tooltip'
  | 'accordion'
  | 'toast'
  | 'bottom-sheet'
  | 'progress'
  | 'date-picker'
  | 'file-upload'
  | 'range-slider'
  | 'stepper'
  | 'chip'
  | 'segmented-control'
  | 'text-field'
  | 'password-field'
  | 'pagination'
  | 'breadcrumb'
  | 'skeleton'
  | 'avatar'
  | 'badge'
  | 'banner'
  | 'spinner'
  | 'empty-state'
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
