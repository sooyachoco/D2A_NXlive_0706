# tasks — NXlive 라이브 스트리밍 MVP

> Task ID 형식: `T{phase}-{seq}` (혼용 금지) · 리뷰: `T{N}-review`
> Phase 0 은 create-spec Step 2.7 에서 완료됨(☑). Phase 2(API 연동)는 백엔드 결정 후 별도 분해.

## Phase 0: React Frontend + Mock (☑ 완료 — Step 2.7)

### T0-001: Next.js 15 스캐폴드 + NX Basic 토큰
**read**: design/design-direction.md
**write**: frontend/package.json, frontend/app/globals.css, frontend/app/layout.tsx
**done**:
  - file: frontend/package.json
  - cmd: cd frontend && npm run build
**deps**: -
**status**: ☑

### T0-002: 도메인 타입 + Mock 서비스 레이어
**read**: specs/001-nxlive-live-streaming/spec.md
**write**: frontend/types/index.ts, frontend/mocks/data.ts, frontend/services/liveService.ts, frontend/services/channelService.ts, frontend/services/clipService.ts, frontend/lib/store.ts
**done**:
  - file: frontend/services/liveService.ts
  - contains: frontend/services/liveService.ts :: NEXT_PUBLIC_USE_MOCK
**deps**: T0-001
**status**: ☑

### T0-003: 5페이지 구현 (홈/시청/채널/클립/검색)
**read**: specs/001-nxlive-live-streaming/spec.md#페이지-목록
**write**: frontend/app/page.tsx, frontend/app/live/[channelId]/page.tsx, frontend/app/channel/[channelId]/page.tsx, frontend/app/clips/page.tsx, frontend/app/search/page.tsx, frontend/components/*
**done**:
  - file: frontend/app/live/[channelId]/page.tsx
  - cmd: cd frontend && npm run build
**deps**: T0-002
**status**: ☑

## Phase 1: 프론트엔드 마감 + E2E (Mock 유지)

### T1-001: Playwright E2E 셋업
**read**: specs/001-nxlive-live-streaming/spec.md
**write**: frontend/playwright.config.ts, frontend/tests/e2e/home.spec.ts
**done**:
  - file: frontend/playwright.config.ts
  - cmd: cd frontend && npx playwright test tests/e2e/home.spec.ts --reporter=line
**deps**: T0-003
**status**: ☑

### T1-002: 라이브 시청 핵심 플로우 e2e (Happy + Error)
**read**: specs/001-nxlive-live-streaming/spec.md#기능별-요구사항
**write**: frontend/tests/e2e/live-watch.spec.ts
**done**:
  - file: frontend/tests/e2e/live-watch.spec.ts
  - cmd: cd frontend && npx playwright test tests/e2e/live-watch.spec.ts --reporter=line
**deps**: T1-001
**status**: ☑

### T1-003: 접근성·반응형 보강
**read**: specs/001-nxlive-live-streaming/spec.md#비기능-요구사항
**write**: frontend/app/globals.css
**done**:
  - cmd: cd frontend && npm run build
  - contains: frontend/app/globals.css :: prefers-reduced-motion
**deps**: T0-003
**status**: ☑

### T1-004: 팔로우 상태 지속성 (localStorage)
**read**: specs/001-nxlive-live-streaming/data-model.md
**write**: frontend/lib/store.ts
**done**:
  - cmd: cd frontend && npm run build
  - regex: frontend/lib/store.ts :: persist|localStorage
**deps**: T0-003
**status**: ☑

### T1-review: 서브에이전트 코드 리뷰
**read**: -
**write**: .claude/review-tokens/phase-1.token
**skill**: subagent-review
**done**:
  - file: .claude/review-tokens/phase-1.token
**deps**: T1-001, T1-002, T1-003, T1-004
**status**: ☑

## Phase 2: Mock → 실제 API 교체 (⬜ 보류 — 백엔드 D-12 결정 후)

> 백엔드 스택(D-12)·영상 인프라(D-13) 결정 후 `analyze-integrations` → 태스크 분해.
> contracts/api-spec.yaml 기준으로 services/*.ts 를 실제 fetch 로 교체, mocks/ 제거,
> `scripts/check-mock-cleanup.sh` 통과를 done 기준에 포함.
