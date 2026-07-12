import { MODEL_CHAIN } from '../../assistant/gemini';

// 현재 대화에 사용 중인 Gemini 모델을 배터리 눈금처럼 표시합니다.
// 체인 위쪽(최신) 모델일수록 눈금이 가득 차고, 폴백될수록 눈금이 줄어듭니다.
export function ModelBattery({ modelIndex }: { modelIndex: number }) {
  const total = MODEL_CHAIN.length;
  const filled = total - modelIndex; // index 0 → total칸, 마지막 → 1칸
  const model = MODEL_CHAIN[modelIndex];

  // 남은 눈금에 따라 색을 바꿉니다 (가득=초록, 중간=주황, 낮음=빨강).
  const level = filled / total;
  const color = level > 0.6 ? 'bg-emerald-500' : level > 0.3 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <span
      className="ml-auto flex items-center gap-1.5"
      title={`현재 ${model.label}로 대화 중`}
      aria-label={`현재 ${model.label}로 대화 중 (모델 우선순위 ${total}단계 중 ${modelIndex + 1}단계)`}
    >
      <span className="hidden text-[10px] font-medium text-muted sm:inline">{model.label}</span>
      <span aria-hidden="true" className="flex items-center">
        <span className="flex h-3.5 items-center gap-px rounded-[3px] border border-line bg-surface px-[2px]">
          {Array.from({ length: total }, (_, cellIndex) => {
            // 왼쪽부터 채워지도록: cellIndex가 filled보다 작으면 채움
            const on = cellIndex < filled;
            return (
              <span
                key={cellIndex}
                className={`h-2 w-1 rounded-[1px] ${on ? color : 'bg-line/50'}`}
              />
            );
          })}
        </span>
        {/* 배터리 양극 단자 */}
        <span className="h-1.5 w-[2px] rounded-r-sm bg-line" />
      </span>
    </span>
  );
}
