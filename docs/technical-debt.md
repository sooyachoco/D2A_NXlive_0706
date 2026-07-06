# Technical Debt — NXlive

## Phase 1 Advisory — 2026-07-03 (subagent-review --full, 6명)

> Required 6건은 Phase 1 Step 4에서 모두 수정 완료 (하이드레이션 1 + 접근성 대비 4 + aria-pressed 1).
> 아래는 Advisory — 프로덕션 전 개선 권장 (Phase 2 또는 여유 시).

| 리뷰어 | 위치 | 내용 | 상태 |
|---|---|---|---|
| Architecture | 6곳 `fmt` 중복 | `lib/format.ts`로 추출 | ✅ 해결 (Step 4) |
| Accessibility | `.ch-head .badge.off` | OFFLINE 뱃지 대비 | ✅ 해결 (Step 4) |
| Architecture | `services/*.ts` `USE_MOCK` 3중 중복 | `services/config.ts`로 추출 | ⬜ Phase 2 |
| Arch/Spec/Feature | `GameKey`에 `baram` 선언, `GAMES`/Mock 미사용 | GAMES 추가 또는 유니온 제거 | ⬜ 제품 판단 |
| Architecture | `HomeLives` filter 타입 `string` | `'all' \| GameKey`로 좁히기 | ⬜ |
| Feature/Spec | dead code `isFollowing`(store), `gameName`(mocks) | 제거 또는 사용 통일 | ⬜ |
| Accessibility | 경계 대비(`.card .ctag`, `.tabs.on`) 3.7~4.1:1 | `pc-900`로 상향 검토 | ⬜ |
| Accessibility | 터치 타깃 44px (전송/방송 시작 버튼) | 모바일 최소 높이 | ⬜ |
| Accessibility | 채팅/시청자 수 `aria-live` | polite live region (낭독 빈도 검토) | ⬜ |
| Spec | 768px 태블릿 브레이크포인트 명시 | 1080/640으로 커버 중, 문서 동기화 | ⬜ |
| Spec/Feature | F-07 클립 클릭 = 채널 이동(재생 아님) | 재생 모달 또는 spec 명시 | ⬜ Phase 2(영상) |
| Performance | `search/page.tsx` 서버/클라 분리 | 실 API 시 초기 로드 SSR | ⬜ Phase 2 |
| Perf/Feature | 시청자 수 시뮬 표류 | 랜덤 델타 방식 | ⬜ (선택) |

> Blocker/Blocker(즉시수정): 0건 — Phase 1 완료 차단 요소 없음.

## AI 사용성 테스트 백로그 — 2026-07-06 (ai-usability-test, 3 페르소나)

> 게이트 S4=0 · S3=2 통과. 상세: `specs/001-nxlive-live-streaming/ut/`. 완료율 83%, 접근성 우수(aria-pressed·focus·labels 통과).

| 우선 | 결함 | 내용 | 개선안 | 배치 |
|---|---|---|---|---|
| **P1** | F-001 (S3) | 하이드레이션 창 초기 인터랙션 무시(로딩/비활성 상태 없음) | `useHydrated()` 게이트 + 스켈레톤 | 다음 스프린트 |
| P2 | F-002 (S3) | 팔로잉 뷰 부재 → P2 리텐션 동선 단절 | 홈 팔로잉 레일 + `/following` | 다음 이터레이션(spec 갱신) |
| P3 | F-003 (S2) | 라이브 진입 로딩 스켈레톤 부재 | `loading.tsx` | Phase 2 |
| P4 | F-004 (S2) | 전환적 하이드레이션 경고(비재현) | 재발 시 persist skipHydration | 모니터 |
