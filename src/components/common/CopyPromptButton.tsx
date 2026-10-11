import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useToast } from './ToastProvider';

type CopyPromptButtonProps = {
  /** 복사할 글. 함수를 주면 누르는 순간의 값을 씁니다(저장된 옵션을 반영할 때). */
  text: string | (() => string);
  label?: string;
  variant?: 'accent' | 'secondary';
};

export function CopyPromptButton({ text, label = '프롬프트 복사', variant = 'accent' }: CopyPromptButtonProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const value = typeof text === 'function' ? text() : text;
    let success = false;
    try {
      await navigator.clipboard.writeText(value);
      success = true;
    } catch {
      // 클립보드 API를 사용할 수 없는 환경 대비 폴백
      const textarea = document.createElement('textarea');
      textarea.value = value;
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
      className={
        variant === 'accent' ? 'btn bg-accent text-accent-ink hover:-translate-y-px hover:shadow-raised' : 'btn-secondary px-4'
      }
    >
      {copied ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      {copied ? '복사 완료' : label}
    </button>
  );
}
