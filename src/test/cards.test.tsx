import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from './renderApp';
import { services } from '../data/services';
import { serviceBrandMarks, serviceFallbackBrands } from '../data/serviceLogos';

// 카드는 제목뿐 아니라 썸네일·아이콘 등 어디를 눌러도 상세로 들어가야 합니다.
// 링크 영역이 카드 전체를 덮는지는 "링크에 inset-0 오버레이가 있고
// 카드가 그 기준(position: relative)이 되는지"로 확인합니다.

function expectWholeCardIsClickable(card: HTMLElement, linkName: string | RegExp) {
  const link = within(card).getByRole('link', { name: linkName });
  expect(link.className).toContain('after:inset-0');
  expect(link.className).not.toContain('relative');
  expect(card.className).toContain('relative');
}

describe('카드 전체 클릭과 서비스 아이콘', () => {
  it('모든 서비스에 브랜드 아이콘이나 대체 타일이 지정되어 있다', () => {
    for (const service of services) {
      const hasMark = Boolean(serviceBrandMarks[service.id] || serviceFallbackBrands[service.id]);
      expect(hasMark, `${service.id}에 아이콘이 없습니다`).toBe(true);
    }
  });

  it('서비스 목록에 각 서비스 아이콘이 이름과 함께 표시된다', () => {
    renderApp('/services');
    expect(screen.getByRole('img', { name: 'Notion 아이콘' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '카카오톡 아이콘' })).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /아이콘$/ })).toHaveLength(services.length);
  });

  it('서비스 카드는 아이콘을 포함한 카드 전체가 상세 링크다', () => {
    renderApp('/services');
    const card = screen.getByRole('img', { name: 'Notion 아이콘' }).closest('article');
    expect(card).not.toBeNull();
    expectWholeCardIsClickable(card as HTMLElement, 'Notion');
  });

  it('UI 카드는 썸네일을 포함한 카드 전체가 상세 링크다', () => {
    renderApp('/ui?category=layout');
    const card = screen.getByRole('link', { name: '사이드바' }).closest('article');
    expectWholeCardIsClickable(card as HTMLElement, '사이드바');
  });

  it('UX 카드에 대표 흐름 썸네일이 생기고 카드 전체가 상세 링크다', async () => {
    const user = userEvent.setup();
    renderApp('/ux?category=find');

    const card = screen.getByRole('link', { name: '검색' }).closest('article');
    expect(card).not.toBeNull();
    expectWholeCardIsClickable(card as HTMLElement, '검색');
    // 대표 흐름의 첫 단계가 썸네일에 보입니다.
    expect(within(card as HTMLElement).getByText('검색창 선택')).toBeInTheDocument();
    expect(within(card as HTMLElement).getByText('+3단계')).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: '검색' }));
    expect(await screen.findByRole('heading', { level: 1, name: '검색' })).toBeInTheDocument();
  });

  it('서비스 상세 헤더와 사례 목록에도 같은 아이콘이 쓰인다', () => {
    renderApp('/services/notion');
    expect(screen.getByRole('img', { name: 'Notion 아이콘' })).toBeInTheDocument();
  });
});
