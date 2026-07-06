import { test, expect } from '@playwright/test';

test('라이브 시청 — 플레이어·채팅 렌더 + 메시지 전송 (Happy)', async ({ page }) => {
  await page.goto('/live/ch-ranger');
  // 메인 기능: 제목 · 플레이어 · 실시간 채팅
  await expect(page.getByText('신규 보스 세계 최초 클리어 도전')).toBeVisible();
  await expect(page.getByText('Mock 플레이어', { exact: false })).toBeVisible();
  await expect(page.getByText('실시간 채팅')).toBeVisible();
  // 채팅 전송
  const input = page.getByLabel('채팅 입력');
  await input.fill('테스트 응원 메시지');
  await page.getByRole('button', { name: '전송' }).click();
  await expect(page.getByText('테스트 응원 메시지')).toBeVisible();
});

test('라이브 시청 — 팔로우 토글', async ({ page }) => {
  await page.goto('/live/ch-ranger');
  const followBtn = page.getByRole('button', { name: '+ 팔로우' });
  await expect(followBtn).toBeVisible();
  await followBtn.click();
  await expect(page.getByRole('button', { name: '팔로잉' })).toBeVisible();
});

test('라이브 시청 — 없는 채널은 404 (Error)', async ({ page }) => {
  const res = await page.goto('/live/does-not-exist');
  expect(res?.status()).toBe(404);
});
