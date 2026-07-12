import { describe, expect, it } from 'vitest';
import { uiItems } from '../data/uiItems';
import { uxPatterns } from '../data/uxPatterns';
import { services } from '../data/services';
import { deviceComparisons } from '../data/deviceComparisons';
import { checkDataIntegrity } from '../utils/integrity';
import { hasInteractiveDemo } from '../components/demos/InteractiveDemo';
import { uiCategories, uxCategories } from '../data/categories';

describe('콘텐츠 데이터 무결성', () => {
  it('UI·UX·서비스·비교 데이터의 연결 ID에 오류가 없다', () => {
    const report = checkDataIntegrity(uiItems, uxPatterns, services, deviceComparisons);
    expect(report.errors).toEqual([]);
  });

  it('초기 콘텐츠 수량 기준을 충족한다', () => {
    expect(uiItems.length).toBeGreaterThanOrEqual(55);
    expect(uxPatterns.length).toBeGreaterThanOrEqual(35);
    expect(services.length).toBeGreaterThanOrEqual(16);
    expect(deviceComparisons.length).toBeGreaterThanOrEqual(10);
  });

  it('UI 사전은 6개, UX 사전은 8개 분류로 구성된다', () => {
    expect(uiCategories).toHaveLength(6);
    expect(uxCategories).toHaveLength(8);
    for (const category of uiCategories) {
      expect(uiItems.some((item) => item.category === category.id)).toBe(true);
    }
    for (const category of uxCategories) {
      expect(uxPatterns.some((pattern) => pattern.category === category.id)).toBe(true);
    }
  });

  it('인터랙티브 데모가 20개 이상의 UI 항목에 연결되어 있다', () => {
    const interactive = uiItems.filter((item) => hasInteractiveDemo(item.demoType));
    expect(interactive.length).toBeGreaterThanOrEqual(20);
  });

  it('모든 UI 항목에 서비스 사례가 1개 이상 있다', () => {
    for (const item of uiItems) {
      expect(item.serviceExamples.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('모든 UX 패턴에 대표 흐름과 관련 UI 2개 이상이 있다', () => {
    for (const pattern of uxPatterns) {
      expect(pattern.flowSteps.length).toBeGreaterThan(0);
      expect(pattern.relatedUiIds.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('UI와 UX가 양방향으로 연결되어 있다', () => {
    const uiWithUx = uiItems.filter((item) => item.relatedUxIds.length > 0);
    expect(uiWithUx.length).toBeGreaterThan(50);
    const referencedUxIds = new Set(uiItems.flatMap((item) => item.relatedUxIds));
    expect(referencedUxIds.size).toBeGreaterThanOrEqual(25);
  });
});
