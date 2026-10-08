import { Bookmark } from 'lucide-react';
import type { SavedItemType } from '../../types';
import { useSavedItems } from '../../hooks/useSavedItems';
import { useToast } from './ToastProvider';

type SaveButtonProps = {
  type: SavedItemType;
  id: string;
  name: string;
  withLabel?: boolean;
};

export function SaveButton({ type, id, name, withLabel = false }: SaveButtonProps) {
  const { isSaved, toggleSaved } = useSavedItems();
  const { showToast } = useToast();
  const saved = isSaved(type, id);

  const handleClick = () => {
    const nowSaved = toggleSaved(type, id);
    showToast(nowSaved ? `저장함에 담았어요: ${name}` : `저장함에서 뺐어요: ${name}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? `${name} 저장 해제` : `${name} 저장`}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border px-3 text-sm transition-all active:scale-95 ${
        saved
          ? 'border-ink bg-ink text-background'
          : 'border-line bg-surface/70 text-muted backdrop-blur hover:border-ink/30 hover:text-ink'
      }`}
    >
      <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
      {withLabel && <span>{saved ? '저장됨' : '저장'}</span>}
    </button>
  );
}
