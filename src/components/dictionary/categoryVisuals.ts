import {
  CircleDot,
  Compass,
  Footprints,
  Hourglass,
  Keyboard,
  LayoutPanelTop,
  ListChecks,
  Megaphone,
  MousePointerClick,
  PanelsTopLeft,
  PencilLine,
  Play,
  Search,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { UICategoryId, UXCategoryId } from '../../types';

export type Tone = 'blue' | 'green' | 'yellow' | 'pink' | 'violet' | 'orange';

export type CategoryVisual = {
  Icon: LucideIcon;
  tone: Tone;
};

// 분류마다 아이콘과 파스텔 강조색을 하나씩 정해, 목록·홈·상세에서 같은 분류가
// 같은 색으로 보이게 합니다. 색만으로 구분하지 않도록 항상 이름과 함께 씁니다.
export const uiCategoryVisuals: Record<UICategoryId, CategoryVisual> = {
  layout: { Icon: LayoutPanelTop, tone: 'blue' },
  navigation: { Icon: Compass, tone: 'green' },
  control: { Icon: MousePointerClick, tone: 'violet' },
  input: { Icon: Keyboard, tone: 'yellow' },
  display: { Icon: PanelsTopLeft, tone: 'pink' },
  status: { Icon: Megaphone, tone: 'orange' },
};

export const uxCategoryVisuals: Record<UXCategoryId, CategoryVisual> = {
  find: { Icon: Search, tone: 'blue' },
  enter: { Icon: PencilLine, tone: 'yellow' },
  choose: { Icon: ListChecks, tone: 'violet' },
  move: { Icon: Footprints, tone: 'green' },
  act: { Icon: Play, tone: 'pink' },
  wait: { Icon: Hourglass, tone: 'orange' },
  share: { Icon: Users, tone: 'blue' },
  start: { Icon: Sparkles, tone: 'green' },
};

export const fallbackVisual: CategoryVisual = { Icon: CircleDot, tone: 'violet' };
