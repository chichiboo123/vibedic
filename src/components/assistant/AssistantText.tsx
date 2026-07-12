import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { findUIItemBySlug } from '../../data/uiItems';
import { findUXPatternBySlug } from '../../data/uxPatterns';
import { CopyPromptButton } from '../common/CopyPromptButton';

// 어시스턴트 답변 텍스트를 렌더링합니다.
// - ``` 코드 블록 → 복사 버튼이 있는 프롬프트 상자
// - [[ui:slug]], [[ux:slug]] → 사전 항목 링크 카드
const ITEM_MARKER = /\[\[(ui|ux):([a-z0-9-]+)\]\]/g;

function InlineWithLinks({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(ITEM_MARKER.source, 'g');

  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, type, slug] = match;
    const item = type === 'ui' ? findUIItemBySlug(slug) : undefined;
    const pattern = type === 'ux' ? findUXPatternBySlug(slug) : undefined;
    const name = item?.koreanName ?? pattern?.koreanName;

    if (name) {
      parts.push(
        <Link
          key={`${match.index}-${slug}`}
          to={`/${type}/${slug}`}
          className="mx-0.5 inline-flex items-center gap-0.5 rounded-md bg-primary-soft px-1.5 py-0.5 text-xs font-semibold text-primary-strong hover:underline"
        >
          <span aria-hidden="true">{type === 'ui' ? 'UI' : 'UX'}</span>
          {name}
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </Link>,
      );
    } else {
      // 사전에 없는 slug는 링크 없이 텍스트로만 보여줍니다.
      parts.push(match[0]);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return <>{parts}</>;
}

export function AssistantText({ text }: { text: string }) {
  // 코드 펜스를 기준으로 일반 텍스트와 프롬프트 블록을 나눕니다.
  const segments = text.split(/```[a-z]*\n?/);

  return (
    <div className="space-y-2">
      {segments.map((segment, index) => {
        const trimmed = segment.trim();
        if (!trimmed) return <Fragment key={index} />;
        if (index % 2 === 1) {
          return (
            <div key={index} className="rounded-md border border-line bg-background p-2">
              <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed">
                {trimmed}
              </pre>
              <div className="mt-2">
                <CopyPromptButton text={trimmed} />
              </div>
            </div>
          );
        }
        return (
          <div key={index} className="space-y-1">
            {trimmed.split('\n').map((line, lineIndex) => {
              const listItem = line.trim().startsWith('- ');
              return (
                <p key={lineIndex} className={`text-sm leading-relaxed ${listItem ? 'pl-3' : ''}`}>
                  {listItem && (
                    <span aria-hidden="true" className="mr-1 text-muted">
                      ·
                    </span>
                  )}
                  <InlineWithLinks text={listItem ? line.trim().slice(2) : line} />
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
