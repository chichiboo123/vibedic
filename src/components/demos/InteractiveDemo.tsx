import type { ComponentType } from 'react';
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

const demoRegistry: Partial<Record<DemoType, ComponentType>> = {
  button: ButtonDemo,
  'icon-button': IconButtonDemo,
  fab: FabDemo,
  checkbox: CheckboxDemo,
  radio: RadioDemo,
  toggle: ToggleDemo,
  tab: TabDemo,
  select: SelectDemo,
  'combo-box': ComboBoxDemo,
  'search-field': SearchFieldDemo,
  autocomplete: AutocompleteDemo,
  modal: ModalDemo,
  'alert-dialog': AlertDialogDemo,
  tooltip: TooltipDemo,
  accordion: AccordionDemo,
  toast: ToastDemo,
  'bottom-sheet': BottomSheetDemo,
  progress: ProgressDemo,
  'date-picker': DatePickerDemo,
  'file-upload': FileUploadDemo,
  'range-slider': RangeSliderDemo,
  stepper: StepperDemo,
  chip: ChipDemo,
  'segmented-control': SegmentedControlDemo,
  'text-field': TextFieldDemo,
  'password-field': PasswordFieldDemo,
  pagination: PaginationDemo,
  skeleton: SkeletonDemo,
};

// eslint-disable-next-line react-refresh/only-export-components
export function hasInteractiveDemo(demoType: DemoType): boolean {
  return Boolean(demoRegistry[demoType]);
}

export function InteractiveDemo({ item }: { item: UIItem }) {
  const Demo = demoRegistry[item.demoType];

  return (
    <div className="rounded-card border-2 border-dashed border-primary/40 bg-primary-soft/40 p-1.5">
      <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-primary-strong">
        데모 영역 · 직접 조작해 보세요
      </p>
      <div className="mt-1.5 rounded-[calc(var(--radius-lg)-4px)] bg-surface p-5">
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
