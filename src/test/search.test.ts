import { describe, expect, it } from 'vitest';
import { searchAll } from '../hooks/useSearch';

describe('통합 검색', () => {
  it('한글 검색어로 UI 항목을 찾는다', () => {
    const results = searchAll('토글');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((result) => result.type === 'ui' && result.slug === 'toggle-switch')).toBe(
      true,
    );
  });

  it('영문 검색어로도 찾는다 (대소문자 무시)', () => {
    const results = searchAll('bottom sheet');
    expect(results.some((result) => result.slug === 'bottom-sheet')).toBe(true);

    const upper = searchAll('TOGGLE');
    expect(upper.some((result) => result.slug === 'toggle-switch')).toBe(true);
  });

  it('띄어쓰기 차이를 흡수한다', () => {
    const withSpace = searchAll('검색 창');
    expect(withSpace.some((result) => result.slug === 'search-field')).toBe(true);
  });

  it('UI, UX, 서비스 결과 유형을 함께 반환한다', () => {
    const results = searchAll('검색');
    const types = new Set(results.map((result) => result.type));
    expect(types.has('ui')).toBe(true);
    expect(types.has('ux')).toBe(true);
  });

  it('서비스 이름으로도 검색된다', () => {
    const results = searchAll('Notion');
    expect(results.some((result) => result.type === 'service' && result.slug === 'notion')).toBe(
      true,
    );
  });

  it('의미 없는 검색어는 빈 결과를 돌려준다', () => {
    expect(searchAll('zzzzqqqq존재하지않는검색어')).toEqual([]);
    expect(searchAll('   ')).toEqual([]);
  });
});
