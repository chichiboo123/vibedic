import type { Service, UIItem, UXPattern, DeviceComparison } from '../types';

export type IntegrityReport = {
  errors: string[];
};

function checkDuplicates(label: string, values: string[], errors: string[]) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      errors.push(`${label} 중복: ${value}`);
    }
    seen.add(value);
  }
}

export function checkDataIntegrity(
  uiItems: UIItem[],
  uxPatterns: UXPattern[],
  services: Service[],
  comparisons: DeviceComparison[],
): IntegrityReport {
  const errors: string[] = [];

  const uiIds = new Set(uiItems.map((i) => i.id));
  const uxIds = new Set(uxPatterns.map((p) => p.id));
  const serviceIds = new Set(services.map((s) => s.id));

  checkDuplicates('UI ID', uiItems.map((i) => i.id), errors);
  checkDuplicates('UI slug', uiItems.map((i) => i.slug), errors);
  checkDuplicates('UX ID', uxPatterns.map((p) => p.id), errors);
  checkDuplicates('UX slug', uxPatterns.map((p) => p.slug), errors);
  checkDuplicates('서비스 ID', services.map((s) => s.id), errors);
  checkDuplicates('서비스 slug', services.map((s) => s.slug), errors);
  checkDuplicates('비교 ID', comparisons.map((c) => c.id), errors);
  checkDuplicates('비교 slug', comparisons.map((c) => c.slug), errors);

  for (const item of uiItems) {
    if (!item.summary.trim()) errors.push(`UI ${item.id}: summary가 비어 있음`);
    if (!item.vibePrompt.trim()) errors.push(`UI ${item.id}: vibePrompt가 비어 있음`);
    if (item.serviceExamples.length === 0) {
      errors.push(`UI ${item.id}: 서비스 사례가 없음`);
    }
    for (const relatedUx of item.relatedUxIds) {
      if (!uxIds.has(relatedUx)) errors.push(`UI ${item.id}: 존재하지 않는 UX ID ${relatedUx}`);
    }
    for (const relatedUi of item.relatedUiIds) {
      if (!uiIds.has(relatedUi)) errors.push(`UI ${item.id}: 존재하지 않는 UI ID ${relatedUi}`);
      if (relatedUi === item.id) errors.push(`UI ${item.id}: 자기 자신을 관련 항목으로 참조`);
    }
    for (const example of item.serviceExamples) {
      if (!serviceIds.has(example.serviceId)) {
        errors.push(`UI ${item.id}: 존재하지 않는 서비스 ID ${example.serviceId}`);
      }
    }
  }

  for (const pattern of uxPatterns) {
    if (!pattern.summary.trim()) errors.push(`UX ${pattern.id}: summary가 비어 있음`);
    if (!pattern.vibePrompt.trim()) errors.push(`UX ${pattern.id}: vibePrompt가 비어 있음`);
    if (pattern.flowSteps.length === 0) errors.push(`UX ${pattern.id}: 대표 흐름이 없음`);
    if (pattern.relatedUiIds.length < 2) {
      errors.push(`UX ${pattern.id}: 관련 UI가 2개 미만`);
    }
    for (const relatedUi of pattern.relatedUiIds) {
      if (!uiIds.has(relatedUi)) errors.push(`UX ${pattern.id}: 존재하지 않는 UI ID ${relatedUi}`);
    }
    for (const relatedUx of pattern.relatedUxIds ?? []) {
      if (!uxIds.has(relatedUx)) errors.push(`UX ${pattern.id}: 존재하지 않는 UX ID ${relatedUx}`);
      if (relatedUx === pattern.id) errors.push(`UX ${pattern.id}: 자기 자신을 관련 항목으로 참조`);
    }
    for (const example of pattern.serviceExamples) {
      if (!serviceIds.has(example.serviceId)) {
        errors.push(`UX ${pattern.id}: 존재하지 않는 서비스 ID ${example.serviceId}`);
      }
    }
  }

  for (const service of services) {
    if (!service.summary.trim()) errors.push(`서비스 ${service.id}: summary가 비어 있음`);
    for (const relatedUi of service.relatedUiIds) {
      if (!uiIds.has(relatedUi)) errors.push(`서비스 ${service.id}: 존재하지 않는 UI ID ${relatedUi}`);
    }
    for (const relatedUx of service.relatedUxIds) {
      if (!uxIds.has(relatedUx)) errors.push(`서비스 ${service.id}: 존재하지 않는 UX ID ${relatedUx}`);
    }
  }

  for (const comparison of comparisons) {
    if (!comparison.desktop.trim() || !comparison.tablet.trim() || !comparison.mobile.trim()) {
      errors.push(`비교 ${comparison.id}: 기기 설명이 비어 있음`);
    }
    for (const relatedUi of comparison.relatedUiIds) {
      if (!uiIds.has(relatedUi)) errors.push(`비교 ${comparison.id}: 존재하지 않는 UI ID ${relatedUi}`);
    }
    for (const relatedUx of comparison.relatedUxIds) {
      if (!uxIds.has(relatedUx)) errors.push(`비교 ${comparison.id}: 존재하지 않는 UX ID ${relatedUx}`);
    }
  }

  return { errors };
}
