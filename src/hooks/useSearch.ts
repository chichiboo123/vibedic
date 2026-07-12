import { useMemo } from 'react';
import Fuse from 'fuse.js';
import type { SearchResultType } from '../types';
import { uiItems } from '../data/uiItems';
import { uxPatterns } from '../data/uxPatterns';
import { services } from '../data/services';
import { deviceComparisons } from '../data/deviceComparisons';
import { uiCategoryById, uxCategoryById } from '../data/categories';

export type SearchDoc = {
  type: SearchResultType;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  haystack: string[];
  compact: string;
};

function compactText(values: string[]): string {
  return values.join(' ').replaceAll(/\s+/g, '').toLowerCase();
}

function buildDocs(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const item of uiItems) {
    const category = uiCategoryById(item.category);
    const haystack = [
      item.easyName,
      item.koreanName,
      item.englishName,
      item.summary,
      category.easyName,
      category.name,
      ...item.keywords,
      ...item.aliases,
      ...item.serviceExamples.map((example) => example.title),
    ];
    docs.push({
      type: 'ui',
      id: item.id,
      slug: item.slug,
      title: item.koreanName,
      subtitle: item.englishName,
      description: item.summary,
      href: `/ui/${item.slug}`,
      haystack,
      compact: compactText(haystack),
    });
  }

  for (const pattern of uxPatterns) {
    const category = uxCategoryById(pattern.category);
    const haystack = [
      pattern.koreanName,
      pattern.englishName,
      pattern.userGoal,
      pattern.summary,
      category.easyName,
      category.name,
      ...pattern.keywords,
      ...pattern.serviceExamples.map((example) => example.title),
    ];
    docs.push({
      type: 'ux',
      id: pattern.id,
      slug: pattern.slug,
      title: pattern.koreanName,
      subtitle: pattern.englishName,
      description: pattern.summary,
      href: `/ux/${pattern.slug}`,
      haystack,
      compact: compactText(haystack),
    });
  }

  for (const service of services) {
    const haystack = [service.name, service.summary, ...service.deviceHighlights];
    docs.push({
      type: 'service',
      id: service.id,
      slug: service.slug,
      title: service.name,
      subtitle: '유명 서비스',
      description: service.summary,
      href: `/services/${service.slug}`,
      haystack,
      compact: compactText(haystack),
    });
  }

  for (const comparison of deviceComparisons) {
    const haystack = [comparison.title, comparison.summary, 'PC 모바일 차이', '기기별 비교'];
    docs.push({
      type: 'compare',
      id: comparison.id,
      slug: comparison.slug,
      title: comparison.title,
      subtitle: '기기별 비교',
      description: comparison.summary,
      href: `/compare#${comparison.slug}`,
      haystack,
      compact: compactText(haystack),
    });
  }

  return docs;
}

let cachedDocs: SearchDoc[] | null = null;
let cachedFuse: Fuse<SearchDoc> | null = null;

export function getSearchIndex() {
  if (!cachedDocs || !cachedFuse) {
    cachedDocs = buildDocs();
    cachedFuse = new Fuse(cachedDocs, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'subtitle', weight: 2 },
        { name: 'haystack', weight: 2 },
        { name: 'description', weight: 1 },
      ],
      threshold: 0.34,
      ignoreLocation: true,
      minMatchCharLength: 1,
    });
  }
  return { docs: cachedDocs, fuse: cachedFuse };
}

export function searchAll(query: string): SearchDoc[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const { docs, fuse } = getSearchIndex();

  const fuseResults = fuse.search(trimmed, { limit: 30 }).map((result) => result.item);

  // 띄어쓰기 차이와 부분 일치를 보완하는 압축 문자열 검색
  const compactQuery = trimmed.replaceAll(/\s+/g, '').toLowerCase();
  const compactMatches = compactQuery
    ? docs.filter((doc) => doc.compact.includes(compactQuery))
    : [];

  const merged: SearchDoc[] = [];
  const seen = new Set<string>();
  for (const doc of [...compactMatches, ...fuseResults]) {
    const key = `${doc.type}:${doc.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(doc);
  }
  return merged.slice(0, 30);
}

export function useSearch(query: string): SearchDoc[] {
  return useMemo(() => searchAll(query), [query]);
}
