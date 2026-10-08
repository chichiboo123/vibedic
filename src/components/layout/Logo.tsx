// VibeDic 로고. 잉크색 타일 위 펼친 사전과 라임색 반짝임, 산세리프와 이탤릭 세리프를 섞은 워드마크입니다.
export function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const mark = size === 'sm' ? 'h-7 w-7' : 'h-8 w-8';
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`relative flex ${mark} shrink-0 items-center justify-center rounded-[10px] bg-ink`}>
        <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden="true">
          <path
            d="M7.5 11c2.9-1.2 5.8-1 8.5.7v11.5c-2.7-1.7-5.6-1.9-8.5-.7V11Zm17 0c-2.9-1.2-5.8-1-8.5.7v11.5c2.7-1.7 5.6-1.9 8.5-.7V11Z"
            className="fill-background"
          />
          <path d="M24 4.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" className="fill-accent" />
        </svg>
      </span>
      <span className={`leading-none tracking-tight text-ink ${size === 'sm' ? 'text-[17px]' : 'text-[19px]'}`}>
        <span className="font-extrabold">Vibe</span>
        <span className="font-serif text-[1.18em] italic">Dic</span>
      </span>
    </span>
  );
}
