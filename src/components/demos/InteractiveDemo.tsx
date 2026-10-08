import type { ComponentType } from 'react';
import { Hand } from 'lucide-react';
import type { DemoType, UIItem } from '../../types';
import { MiniPreview } from '../dictionary/MiniPreview';
import {
  AutocompleteDemo,
  ButtonDemo,
  CheckboxDemo,
  ChipDemo,
  ComboBoxDemo,
  DatePickerDemo,
  FabDemo,
  FileUploadDemo,
  IconButtonDemo,
  PasswordFieldDemo,
  RadioDemo,
  RangeSliderDemo,
  SearchFieldDemo,
  SegmentedControlDemo,
  SelectDemo,
  StepperDemo,
  TextFieldDemo,
  ToggleDemo,
} from './controlDemos';
import {
  AccordionDemo,
  AlertDialogDemo,
  BottomSheetDemo,
  ModalDemo,
  PaginationDemo,
  ProgressDemo,
  SkeletonDemo,
  TabDemo,
  ToastDemo,
  TooltipDemo,
} from './overlayDemos';
import {
  FilterChipDemo,
  NumberInputDemo,
  OtpInputDemo,
  TextareaDemo,
  TimePickerDemo,
} from './inputDemos';
import {
  CardDemo,
  DividerDemo,
  FooterDemo,
  HeaderDemo,
  HeroSectionDemo,
  SidebarDemo,
  TopAppBarDemo,
} from './layoutDemos';
import {
  BottomNavigationDemo,
  BreadcrumbDemo,
  CommandPaletteDemo,
  ContextMenuDemo,
  DropdownMenuDemo,
  MainMenuDemo,
  NavigationDrawerDemo,
  NavigationRailDemo,
} from './navigationDemos';
import {
  AvatarDemo,
  BadgeDemo,
  CalendarDemo,
  CarouselDemo,
  CodeBlockDemo,
  ListDemo,
  TableDemo,
  TagDemo,
  TimelineDemo,
} from './displayDemos';
import {
  BannerDemo,
  DrawerDemo,
  EmptyStateDemo,
  NotificationBadgeDemo,
  PopoverDemo,
  SpinnerDemo,
} from './statusDemos';

// 모든 UI 항목은 자기만의 데모를 갖습니다.
// DemoType과 UI 항목이 1:1이라, 여기에 빠진 항목이 있으면 타입 검사에서 걸립니다.
const demoRegistry: Record<Exclude<DemoType, 'static'>, ComponentType> = {
  // 조작
  button: ButtonDemo,
  'icon-button': IconButtonDemo,
  fab: FabDemo,
  checkbox: CheckboxDemo,
  radio: RadioDemo,
  toggle: ToggleDemo,
  select: SelectDemo,
  'combo-box': ComboBoxDemo,
  chip: ChipDemo,
  'filter-chip': FilterChipDemo,
  'segmented-control': SegmentedControlDemo,
  'range-slider': RangeSliderDemo,
  stepper: StepperDemo,
  // 입력
  'text-field': TextFieldDemo,
  'search-field': SearchFieldDemo,
  textarea: TextareaDemo,
  'password-field': PasswordFieldDemo,
  'number-input': NumberInputDemo,
  'date-picker': DatePickerDemo,
  'time-picker': TimePickerDemo,
  'file-upload': FileUploadDemo,
  autocomplete: AutocompleteDemo,
  'otp-input': OtpInputDemo,
  // 내비게이션
  'main-menu': MainMenuDemo,
  tab: TabDemo,
  'bottom-navigation': BottomNavigationDemo,
  'navigation-drawer': NavigationDrawerDemo,
  'navigation-rail': NavigationRailDemo,
  breadcrumb: BreadcrumbDemo,
  pagination: PaginationDemo,
  'dropdown-menu': DropdownMenuDemo,
  'context-menu': ContextMenuDemo,
  'command-palette': CommandPaletteDemo,
  // 배치
  header: HeaderDemo,
  footer: FooterDemo,
  sidebar: SidebarDemo,
  'top-app-bar': TopAppBarDemo,
  card: CardDemo,
  divider: DividerDemo,
  'hero-section': HeroSectionDemo,
  // 보여주기
  list: ListDemo,
  table: TableDemo,
  avatar: AvatarDemo,
  badge: BadgeDemo,
  tag: TagDemo,
  accordion: AccordionDemo,
  carousel: CarouselDemo,
  calendar: CalendarDemo,
  timeline: TimelineDemo,
  'code-block': CodeBlockDemo,
  // 상태
  modal: ModalDemo,
  'alert-dialog': AlertDialogDemo,
  popover: PopoverDemo,
  tooltip: TooltipDemo,
  'bottom-sheet': BottomSheetDemo,
  drawer: DrawerDemo,
  toast: ToastDemo,
  banner: BannerDemo,
  spinner: SpinnerDemo,
  progress: ProgressDemo,
  skeleton: SkeletonDemo,
  'empty-state': EmptyStateDemo,
  'notification-badge': NotificationBadgeDemo,
};

// eslint-disable-next-line react-refresh/only-export-components
export function hasInteractiveDemo(demoType: DemoType): boolean {
  return demoType !== 'static' && Boolean(demoRegistry[demoType]);
}

export function InteractiveDemo({ item }: { item: UIItem }) {
  const Demo = item.demoType === 'static' ? undefined : demoRegistry[item.demoType];

  return (
    <div className="rounded-[1.5rem] border border-line bg-surface p-2 shadow-card">
      <p className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted">
        <span aria-hidden="true" className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">Live demo</span>
        <Hand className="h-3.5 w-3.5" aria-hidden="true" />
        {Demo ? '데모 영역 · 직접 조작해 보세요' : '데모 영역 · 실제 예시로 살펴보세요'}
      </p>
      <div className="dot-grid rounded-[1.1rem] border border-line/70 p-5 sm:p-8">
        {Demo ? (
          <Demo />
        ) : (
          <div>
            <p className="mb-3 text-sm text-muted">이 요소는 시각적 예시로 살펴볼 수 있어요.</p>
            <div className="max-w-xs">
              <MiniPreview item={item} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
