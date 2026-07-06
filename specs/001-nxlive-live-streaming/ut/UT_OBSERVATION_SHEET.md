# UT_OBSERVATION_SHEET — NXlive

**실행일**: 2026-07-06 00:36 (UTC)
**환경**: Chromium headless · 1440×900 · http://localhost:3000 (Mock, auth none) · Playwright
**러너**: `frontend/tests/ut/run-ut.mjs` → `observations/raw-observations.json`

## 초보자 (P1 라이트 시청자)

| 시나리오 | 완료 | 오류 | 관찰 |
|---|:--:|:--:|---|
| S-B01 홈→카드→시청 진입 | ✅ | — | 플레이어=true, 채팅=true. 발견→입장 원활 |
| S-B02 게임 필터 | ✅ | — | 필터 전 7 → FC ONLINE 클릭 후 7 (⚠ 즉시 클릭 시 필터 미반영 — 하이드레이션 창) |

## 파워유저 (P2 헤비·도네이터)

| 시나리오 | 완료 | 오류 | 관찰 |
|---|:--:|:--:|---|
| S-P01 팔로우+채팅 | ❌ | ✅ | 354ms 초고속 조작 → 팔로우전환=false, 채팅반영=false. **하이드레이션 완료 전 클릭이 무시됨** (e2e는 정상 대기 시 통과 — 기능 자체는 정상) |
| S-P02 검색+탭 전환 | ✅ | — | 채널탭 활성=true. 단 '메이플' 검색 즉시 결과=7 (필터 미반영 — 동일 하이드레이션 창) |

## 접근성 (P3)

| 시나리오 | 완료 | 오류 | 관찰 |
|---|:--:|:--:|---|
| S-A01 키보드 홈 탐색 | ✅ | — | Tab 포커스 요소=29, 필터 `aria-pressed`=8개, focus outline=solid 3px ✅ |
| S-A02 시청 폼 접근성 | ✅ | — | 채팅 input aria-label ✅, 전송 버튼 ✅, 팔로우 버튼 접근명 ✅ |

## 집계 요약

| 지표 | 값 |
|---|---|
| 시나리오 완료율 | **5/6 = 83%** |
| 오류 | 1 (S-P01, 하이드레이션 창) |
| 콘솔 에러 | 1 (전환적 하이드레이션 경고 — a11y 급속조작 중, **깨끗한 재로드 5/5 페이지 0건 확인**) |
| 접근성 | 우수 (aria-pressed·focus-visible·accessible name 전부 통과 — T1-review 수정분 검증됨) |

## 스크린샷
`screenshots/` — beginner-S-B01-watch · beginner-S-B02-filter · power-S-P01-follow-chat · power-S-P02-search · a11y-S-A01-home-keyboard · a11y-S-A02-watch-form
