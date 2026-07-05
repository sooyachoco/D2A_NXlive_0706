# 구현 계획 — NXlive

## 아키텍처 개요

```
[ Next.js 15 App Router (React 19) ]
   app/            ← 라우트 (홈/시청/채널/클립/검색)
   components/     ← UI 컴포넌트 (NX Basic 토큰 기반)
   services/       ← 데이터 접근 (Mock ↔ API 전환 게이트)  ── USE_MOCK
   mocks/          ← 더미 데이터
   lib/            ← Zustand 스토어 등
   types/          ← 도메인 타입
```

레이어 규칙: **컴포넌트 → services → (Mock | API)**. 컴포넌트가 mocks를 직접 import하지 않는다(현재 일부 클라이언트 컴포넌트는 시뮬레이션용 Mock 직접 참조 — Phase 2에서 정리).

## Phase 분리

| Phase | 이름 | 상태 | 내용 |
|---|---|---|---|
| **Phase 0** | React Frontend + Mock | ☑ 완료 | Next.js 스캐폴드 + 5페이지 + Mock 서비스 (Step 2.7) |
| **Phase 1** | 프론트엔드 마감 + E2E | ☐ 예정 | Playwright 셋업, 핵심 플로우 e2e, 접근성·반응형 보강, 팔로우 지속성 |
| **Phase 2** | Mock → 실제 API (deferred) | ⬜ 보류 | 백엔드(D-12)·영상(D-13) 결정 후 착수 |

## Phase별 산출물

- **Phase 0**: `frontend/` (완료)
- **Phase 1**: `frontend/tests/e2e/*.spec.ts`, `playwright.config.ts`, 접근성/반응형 개선 커밋, `.claude/review-tokens/phase-1.token`
- **Phase 2**: `contracts/api-spec.yaml` 기준 실제 서비스 구현, mocks 제거

## 기술 스택 (CLAUDE.md 헌법 기반)

- Next.js 15 · React 19 · TypeScript 5.7 · Zustand 5 · NX Basic 1.0v 토큰
- 테스트: Playwright(E2E) · (unit은 필요 시 Vitest)

## 리스크 및 대응

| 리스크 | 대응 |
|---|---|
| 백엔드 미결정으로 Phase 2 지연 | Phase 1을 Mock 유지 프론트 완성으로 독립 완결 |
| 영상 인프라 부재 | 플레이어 플레이스홀더 유지, 후속 integration으로 분리 |
| NX Basic 패키지 사내망 제약 | 토큰 기반 동등 컴포넌트 직접 구현 (현재 방식) |
