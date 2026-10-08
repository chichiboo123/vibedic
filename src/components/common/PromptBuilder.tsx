import { useId, useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { buildPrompt, promptAddons, promptStacks } from '../../data/promptKit';
import { readJSON, writeJSON } from '../../utils/storage';
import { CopyPromptButton } from './CopyPromptButton';

const STORAGE_KEY = 'vibedic:prompt-options';

type PromptOptions = { stack: string; addons: string[] };

const defaultOptions: PromptOptions = { stack: 'none', addons: [] };

function readOptions(): PromptOptions {
  const stored = readJSON<Partial<PromptOptions>>(STORAGE_KEY, defaultOptions);
  return {
    stack: promptStacks.some((option) => option.id === stored.stack) ? stored.stack! : 'none',
    addons: Array.isArray(stored.addons)
      ? stored.addons.filter((id) => promptAddons.some((addon) => addon.id === id))
      : [],
  };
}

// 항목의 기본 프롬프트에 기술 스택과 공통 조건을 골라 덧붙이는 영역입니다.
// 고른 옵션은 저장해 두어 다른 항목에서도 그대로 이어집니다.
export function PromptBuilder({ base }: { base: string }) {
  const [options, setOptions] = useState<PromptOptions>(readOptions);
  const stackGroupId = useId();
  const addonGroupId = useId();

  const update = (next: PromptOptions) => {
    setOptions(next);
    writeJSON(STORAGE_KEY, next);
  };

  const prompt = useMemo(
    () => buildPrompt(base, options.stack, options.addons),
    [base, options],
  );
  const addedCount = options.addons.length + (options.stack === 'none' ? 0 : 1);

  return (
    <div className="surface-card overflow-hidden">
      <div className="space-y-3 border-b border-line bg-background/60 p-4">
        <p className="flex items-center gap-1.5 text-sm font-semibold">
          <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
          내 프로젝트에 맞게 조건 더하기
        </p>
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
          <span id={stackGroupId} className="w-16 shrink-0 text-xs font-semibold text-muted">
            기술 스택
          </span>
          <div role="group" aria-labelledby={stackGroupId} className="flex flex-wrap gap-1.5">
            {promptStacks.map((stack) => (
              <button
                key={stack.id}
                type="button"
                aria-pressed={options.stack === stack.id}
                onClick={() => update({ ...options, stack: stack.id })}
                className="pill min-h-9 px-3 text-xs"
              >
                {stack.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
          <span id={addonGroupId} className="w-16 shrink-0 text-xs font-semibold text-muted">
            공통 조건
          </span>
          <div role="group" aria-labelledby={addonGroupId} className="flex flex-wrap gap-1.5">
            {promptAddons.map((addon) => {
              const active = options.addons.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  type="button"
                  aria-pressed={active}
                  title={addon.description}
                  onClick={() =>
                    update({
                      ...options,
                      addons: active
                        ? options.addons.filter((id) => id !== addon.id)
                        : [...options.addons, addon.id],
                    })
                  }
                  className="pill min-h-9 px-3 text-xs"
                >
                  {active ? '✓ ' : '+ '}
                  {addon.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="p-4">
        <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-md bg-background p-4 font-mono text-sm leading-relaxed">
          {prompt}
        </pre>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <CopyPromptButton text={prompt} />
          <p className="text-xs text-muted" aria-live="polite">
            {addedCount > 0 ? `조건 ${addedCount}개를 더했어요.` : 'ChatGPT, Claude, Gemini 등 어디에 붙여 넣어도 돼요.'}
          </p>
        </div>
      </div>
    </div>
  );
}
