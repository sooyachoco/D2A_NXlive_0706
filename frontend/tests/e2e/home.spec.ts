import { test, expect } from '@playwright/test';

test('홈 — 라이브 발견 화면이 렌더된다', async ({ page }) => {
  await page.goto('/');
  // 헤더 로고
  await expect(page.getByRole('link', { name: 'NXlive' })).toBeVisible();
  // 섹션 제목
  await expect(page.getByRole('heading', { name: '지금 라이브' })).toBeVisible();
  // 라이브 카드(스트리머) 최소 1개
  await expect(page.getByText('김레인저').first()).toBeVisible();
});

test('홈 — 게임 필터로 카드 그리드가 걸러진다', async ({ page }) => {
  await page.goto('/');
  // 필터·카드 그리드는 하단 라이트 영역(main.page)에 있다 (다크 히어로/랭킹은 필터 무관)
  const grid = page.locator('main.page');
  await grid.getByRole('button', { name: 'FC ONLINE' }).click();
  await expect(grid.getByText('코트니').first()).toBeVisible();
  // 카드 그리드에서 다른 게임 스트리머는 사라짐
  await expect(grid.getByText('김레인저')).toHaveCount(0);
});
