import { useEffect } from 'react';

const BASE_TITLE = 'VibeDic | 바이브코딩 UI UX 사전';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | VibeDic` : BASE_TITLE;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
}
