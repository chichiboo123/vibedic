import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useToast } from './ToastProvider';

export function CopyPromptButton({ text }: { text: string }) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    let success = false;
    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch {
      // 클립보드 API를 사용할 수 없는 환경 대비 폴백
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        success = document.execCommand('copy');
      } finally {
        document.body.removeChild(textarea);
      }
    }
    if (success) {
      setCopied(true);
      showToast('프롬프트를 복사했어요.');
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      showToast('복사에 실패했어요. 직접 선택해 복사해 주세요.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
    >
      {copied ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      {copied ? '복사 완료' : '프롬프트 복사'}
    </button>
  );
}
