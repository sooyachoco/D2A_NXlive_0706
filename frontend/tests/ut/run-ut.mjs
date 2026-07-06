// AI 사용성 테스트 드라이버 — NXlive 3 페르소나 (Mock, auth none)
// 실행: (cd frontend) UT_BASE=http://localhost:3000 node tests/ut/run-ut.mjs
// 산출: specs/001-nxlive-live-streaming/ut/observations/raw-observations.json + screenshots/*.png
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.UT_BASE || 'http://localhost:3000';
const OUT = path.resolve('../specs/001-nxlive-live-streaming/ut');
const SHOTS = path.join(OUT, 'screenshots');
fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
const consoleErrors = [];
const rec = (o) => results.push({ timestamp: Date.now(), ...o });
const shot = async (page, name) => {
  const p = path.join(SHOTS, `${name}.png`);
  await page.screenshot({ path: p }).catch(() => {});
};
async function newPage(browser, persona) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push({ persona, text: m.text().slice(0, 200) }); });
  page.on('pageerror', (e) => consoleErrors.push({ persona, text: 'pageerror: ' + e.message.slice(0, 200) }));
  return { ctx, page };
}
const go = (page, url) => page.goto(url, { waitUntil: 'domcontentloaded' });

// ── 초보자: 느린 탐색 ──────────────────────────────
async function beginner(browser) {
  const { ctx, page } = await newPage(browser, 'beginner');
  // S-B01: 홈 → 카드 클릭 → 시청 진입
  try {
    const t0 = Date.now();
    await go(page, BASE);
    await page.waitForSelector('a.card', { timeout: 8000 });
    await page.waitForTimeout(600); // 느린 탐색
    await page.locator('a.card').first().click();
    await page.waitForURL(/\/live\//, { timeout: 8000 });
    const player = await page.locator('.player').isVisible().catch(() => false);
    const chat = await page.locator('.chat').isVisible().catch(() => false);
    await shot(page, 'beginner-S-B01-watch');
    rec({ persona: 'beginner', scenario: 'S-B01', action: 'enter-live',
      completed: player && chat, hesitationMs: 600, isError: !(player && chat),
      errorType: (player && chat) ? null : 'watch-not-rendered', durationMs: Date.now() - t0,
      note: `플레이어=${player}, 채팅=${chat}` });
  } catch (e) {
    rec({ persona: 'beginner', scenario: 'S-B01', completed: false, isError: true, errorType: 'exception', note: e.message.slice(0, 160) });
  }
  // S-B02: 게임 필터
  try {
    await go(page, BASE);
    await page.waitForSelector('main.page a.card', { timeout: 8000 });
    const before = await page.locator('main.page a.card').count();
    await page.locator('main.page .filters .tag', { hasText: 'FC ONLINE' }).click();
    await page.waitForTimeout(300);
    const after = await page.locator('main.page a.card').count();
    const filtered = after > 0 && after <= before;
    await shot(page, 'beginner-S-B02-filter');
    rec({ persona: 'beginner', scenario: 'S-B02', action: 'game-filter',
      completed: filtered, isError: !filtered, errorType: filtered ? null : 'filter-no-effect',
      note: `필터 전 카드=${before}, FC ONLINE 후=${after}` });
  } catch (e) {
    rec({ persona: 'beginner', scenario: 'S-B02', completed: false, isError: true, errorType: 'exception', note: e.message.slice(0, 160) });
  }
  await ctx.close();
}

// ── 파워유저: 빠른 탐색 ─────────────────────────────
async function powerUser(browser) {
  const { ctx, page } = await newPage(browser, 'power-user');
  // S-P01: 시청 → 팔로우 → 채팅
  try {
    const t0 = Date.now();
    await go(page, `${BASE}/live/ch-ranger`);
    await page.waitForSelector('.chat', { timeout: 8000 });
    const followBtn = page.getByRole('button', { name: '+ 팔로우' });
    await followBtn.click();
    const following = await page.getByRole('button', { name: '팔로잉' }).isVisible().catch(() => false);
    const input = page.getByLabel('채팅 입력');
    await input.fill('오늘 방송 최고네요');
    await page.getByRole('button', { name: '전송' }).click();
    const sent = await page.getByText('오늘 방송 최고네요').isVisible().catch(() => false);
    await shot(page, 'power-S-P01-follow-chat');
    rec({ persona: 'power-user', scenario: 'S-P01', action: 'follow+chat',
      completed: following && sent, isError: !(following && sent),
      errorType: (following && sent) ? null : 'follow-or-chat-fail', durationMs: Date.now() - t0,
      note: `팔로우전환=${following}, 채팅반영=${sent}` });
  } catch (e) {
    rec({ persona: 'power-user', scenario: 'S-P01', completed: false, isError: true, errorType: 'exception', note: e.message.slice(0, 160) });
  }
  // S-P02: 검색 탭 전환
  try {
    await go(page, `${BASE}/search`);
    const input = page.getByLabel('검색어');
    await input.fill('메이플');
    await page.waitForTimeout(200);
    const liveCount = await page.locator('main.page a.card').count();
    await page.locator('.tabs button', { hasText: '채널' }).click();
    await page.waitForTimeout(150);
    const channelTabActive = await page.locator('.tabs button.on', { hasText: '채널' }).isVisible().catch(() => false);
    await shot(page, 'power-S-P02-search');
    rec({ persona: 'power-user', scenario: 'S-P02', action: 'search+tab',
      completed: channelTabActive, isError: !channelTabActive, errorType: channelTabActive ? null : 'tab-switch-fail',
      note: `'메이플' 라이브 결과=${liveCount}, 채널탭 활성=${channelTabActive}` });
  } catch (e) {
    rec({ persona: 'power-user', scenario: 'S-P02', completed: false, isError: true, errorType: 'exception', note: e.message.slice(0, 160) });
  }
  await ctx.close();
}

// ── 접근성: 키보드 전용 ─────────────────────────────
async function a11y(browser) {
  const { ctx, page } = await newPage(browser, 'accessibility');
  // S-A01: 키보드 홈 탐색 + 필터 aria-pressed
  try {
    await go(page, BASE);
    await page.waitForSelector('.filters .tag', { timeout: 8000 });
    const ariaPressedCount = await page.locator('.filters .tag[aria-pressed]').count();
    let focusable = 0;
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('Tab');
      const tag = await page.evaluate(() => document.activeElement?.tagName);
      if (['A', 'BUTTON', 'INPUT'].includes(tag)) focusable++;
    }
    const outline = await page.evaluate(() => {
      const b = document.querySelector('.filters .tag');
      b?.focus();
      return getComputedStyle(b).outlineStyle + ' ' + getComputedStyle(b).outlineWidth;
    });
    await shot(page, 'a11y-S-A01-home-keyboard');
    rec({ persona: 'accessibility', scenario: 'S-A01', action: 'keyboard-nav+aria',
      completed: focusable >= 6 && ariaPressedCount >= 1, isError: !(focusable >= 6 && ariaPressedCount >= 1),
      errorType: (focusable >= 6 && ariaPressedCount >= 1) ? null : 'a11y-nav-fail',
      note: `Tab 포커스 요소=${focusable}, 필터 aria-pressed=${ariaPressedCount}개, focus outline=${outline}` });
  } catch (e) {
    rec({ persona: 'accessibility', scenario: 'S-A01', completed: false, isError: true, errorType: 'exception', note: e.message.slice(0, 160) });
  }
  // S-A02: 시청 화면 폼 접근성
  try {
    await go(page, `${BASE}/live/ch-ranger`);
    await page.waitForSelector('.chat', { timeout: 8000 });
    const chatInput = await page.getByLabel('채팅 입력').count();
    const sendBtn = await page.getByRole('button', { name: '전송' }).count();
    const followBtn = await page.getByRole('button', { name: /팔로우|팔로잉/ }).count();
    const ok = chatInput >= 1 && sendBtn >= 1 && followBtn >= 1;
    await shot(page, 'a11y-S-A02-watch-form');
    rec({ persona: 'accessibility', scenario: 'S-A02', action: 'form-a11y-names',
      completed: ok, isError: !ok, errorType: ok ? null : 'missing-accessible-name',
      note: `채팅input aria-label=${chatInput}, 전송버튼=${sendBtn}, 팔로우버튼=${followBtn}` });
  } catch (e) {
    rec({ persona: 'accessibility', scenario: 'S-A02', completed: false, isError: true, errorType: 'exception', note: e.message.slice(0, 160) });
  }
  await ctx.close();
}

const browser = await chromium.launch();
await beginner(browser);
await powerUser(browser);
await a11y(browser);
await browser.close();

const summary = {
  ranAt: new Date().toISOString(),
  base: BASE,
  total: results.length,
  completed: results.filter((r) => r.completed).length,
  errors: results.filter((r) => r.isError).length,
  consoleErrorCount: consoleErrors.length,
  consoleErrors,
  results,
};
fs.mkdirSync(path.join(OUT, 'observations'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'observations', 'raw-observations.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
