# 기술 결정 로그 — NXlive

> 결정 상태: ✅ 확정 / ⬜ 미결정 (구현 전 결정 필요)

| ID | 항목 | 결정 | 근거 | 상태 |
|---|---|---|---|---|
| D-01 | DESIGN_SYSTEM | NX Basic 1.0v | 사용자 Q5* C 선택 · `refs/design-systems/nxbasic-1.0v.md` | ✅ |
| D-02 | 프론트엔드 프레임워크 | React 19 | NX Basic이 React 패키지 | ✅ |
| D-03 | 메타 프레임워크 | Next.js 15 (App Router) | 공개 콘텐츠 발견형 서비스 SSR/SEO | ✅ |
| D-04 | 언어 | TypeScript 5.7 | 타입 안정성 | ✅ |
| D-05 | STATE_MANAGEMENT | Zustand | 엔티티 5개(3~6 구간 기본값) | ✅ |
| D-06 | 데이터 모드 | Mock 우선 (`NEXT_PUBLIC_USE_MOCK=true`) | 백엔드 미결정 · 서비스 레이어로 전환 가능 구조 | ✅ |
| D-07 | 인증 | 없음(none) | 사용자 선택 (공개 열람) · host `local-nxlive.test` | ✅ |
| D-08 | 라우팅 | Next.js App Router 파일 기반 | 프레임워크 표준 | ✅ |
| D-09 | 스타일링 | NX Basic 토큰(CSS 변수) + 글로벌 CSS | 시스템 준수 · Tailwind 미도입 | ✅ |
| D-10 | 실시간(채팅·시청자 수) | 클라이언트 타이머 시뮬레이션(Mock) | WebSocket 인프라 미결정 | ✅ |
| D-11 | E2E | Playwright | boilerplate-setup 통합 | ✅ |
| D-12 | **백엔드 스택** | ⬜ 미결정 (deferred) | 이번 MVP 범위 밖 — Phase 2(API 연동) 착수 전 결정 필요 | ⬜ |
| D-13 | **영상 재생 인프라** | ⬜ 미결정 (deferred) | HLS/CDN — 후속 integration, 후속 결정 | ⬜ |

> ⬜ 항목(D-12, D-13)은 이번 프론트 전용 MVP(Phase 0~1)에서는 불필요.
> Phase 2(Mock → 실제 API 교체) 착수 전에 결정한다.
