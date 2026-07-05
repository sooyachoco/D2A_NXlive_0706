# 사전 확인 — NXlive

## 외부 연동

이번 MVP(Phase 0~1)는 **외부 연동이 없다** (전부 Mock · 자체 개발).
`analyze-integrations` / `collect-prerequisites` 는 Phase 2(실제 API·영상) 착수 시 실행한다.

| 항목 | 이번 MVP | 후속 |
|---|---|---|
| 인증(INSIGN/NXAS) | ❌ 없음 (auth=none) | — |
| 백엔드 API | ❌ 없음 (Mock) | Phase 2 — D-12 결정 후 |
| 영상 재생(HLS/CDN) | ❌ 없음 (플레이스홀더) | 후속 integration — D-13 결정 후 |
| 실시간(WebSocket) | ❌ 없음 (타이머 시뮬) | Phase 2 — 백엔드 결정 후 |

## 로컬 실행 사전 조건

| 항목 | 상태 |
|---|---|
| Node.js | ✅ v24 |
| frontend 의존성 설치 | ✅ `frontend/npm install` 완료 |
| dev 서버 | `cd frontend && npm run dev` → http://localhost:3000 |
| HTTPS/Caddy | ⏸ 연기 (Windows 미지원, auth=none이라 불필요) |

> ✅ 이번 MVP는 외부 연동 검증 없이 AUTONOMOUS ZONE(Phase 1) 진입 가능.
