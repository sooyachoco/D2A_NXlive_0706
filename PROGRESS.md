# 프로젝트 진행 상태

> 이 파일은 AI가 자동으로 갱신합니다.
> 이탈 후 돌아왔을 때 "어디까지 했지?" 라고 입력하면 현재 상태를 안내합니다.
> 세션 체크포인트 시 "새 채팅 → 이어서 해줘"로 이어서 작업합니다.
>
> 📊 **진행 현황 대시보드**: `.claude/status.html` 을 브라우저로 열면 전체 흐름(설치→세팅→명세→구현→점검→배포)과
> 현재 단계를 실시간으로 볼 수 있습니다 (매 응답 종료 시 자동 갱신).

---

## 현재 상태

| 항목 | 값 |
|---|---|
| **현재 단계** | Phase 1 **완료** (프론트 마감 + E2E + 리뷰) |
| **상태** | ✅ Phase 1 완료 — 로컬 실행 확인 대기 |
| **마지막 작업** | T1-review: 6명 리뷰 → Required 6건 수정(하이드레이션·접근성·aria) |
| **세션 체크포인트** | 2026-07-06 Phase 1 완료 |
| **review_status** | Phase 1: ✅ 2026-07-06 |
| **다음 행동** | 로컬 실행 확인 후 → Phase G(보안 점검) 또는 Phase H(배포). Phase 2(실 API)는 백엔드 결정 후 |

**Phase 0** ☑ · **Phase 1** ☑ 완료(E2E 5통과·리뷰 Blocker0) · **Phase 2** ⬜ 보류(백엔드 D-12 결정 후)

**확정 사항 요약**
- 프로젝트: NXlive — 넥슨 게임 라이브 스트리밍 (외부 유저, 신규)
- 디자인: **C — NX Basic 1.0v 다크+라이트** (DESIGN_SYSTEM=nxbasic)
- 프론트: Next.js 15 (App Router) + React 19 + TS + NX Basic / 데이터 더미 우선
- 백엔드: 나중 결정 (deferred) · 인프라: deferred
- E2E: Playwright (실제 설정은 create-spec Step 2.7) · 인증: none (host local-nxlive.test)
- HTTPS/Caddy: Windows 미지원으로 연기 (BLOCKED 기록)

> 상태 값: ⏳ 진행 중 / ⏸️ 사용자 확인 대기 / 🔄 세션 체크포인트 / ✅ 완료
>
> **review_status 값 규칙:**
> - `—` : Phase 구현 미시작
> - `⏳ pending` : 해당 Phase 소스 변경 있음, 리뷰 미실행 (run-phase Step 3-1이 설정)
> - `✅ YYYY-MM-DD` : 리뷰 완료 날짜 (subagent-review Step 5가 설정)
> - `N/A` : 해당 Phase 소스 변경 없음 (문서만 변경)

### 👉 다음에 할 일

```
채팅에 입력: @SETUP.md 프로젝트 셋팅해줘
```

---

## 완료 이력

| 날짜 | 단계 | 내용 | 세션 |
|---|---|---|---|
| — | — | — | — |

---

## Phase 체크리스트

### Phase A~C: 환경 설정
- [x] 보일러플레이트 설치
- [x] 참조 문서 확인 (refs/company-policies/, refs/gamescale-docs/)
- [x] MCP 서버 빌드

### Phase D: 프로젝트 세팅 위저드
- [x] 질문 응답 (Q1~Q4) — PRD 없음
- [x] Q5* 디자인 샘플 선택 — C (NX Basic 다크+라이트)
- [ ] **Phase 0: React + Mock UI 구현**
  - [ ] React 프로젝트 초기화 + 디자인 시스템 셋업
  - [ ] 공통 레이아웃 + GNB/INSIGN 연동
  - [ ] 각 페이지 UI 컴포넌트 (Mock 서비스 레이어)
  - [ ] **사용자 UI 확인 + 피드백 반영 → TypeScript 타입 확정(Step 2.8)**
- [ ] AI 기술 스택 제안 확인 (백엔드/DB/인프라)
- [ ] 사내 정보 확인 (해당 시)
- [ ] 세팅 결과 확정

### Phase E: 기능 명세
- [ ] spec.md 작성 + 사용자 확인 (Phase 0 React UI 기반)
- [ ] decisions.md + prerequisites.md
- [ ] plan.md 작성 + 사용자 확인
- [ ] data-model.md + api-spec.yaml
- [ ] tasks.md 생성 (Phase 0은 완료 상태)

### Phase F: 기능 구현

> `/run-phase` 실행 시 완료된 Phase를 [x]로 갱신한다.

- [ ] Phase 0.5: 외부 연동 검증
- [x] Phase 1: 프론트 마감 + E2E (리뷰 완료)
- [ ] Phase 2: {두 번째 기능 Phase}
- [ ] Phase N: … ← **진행 중**

### Phase G: 보안·품질 점검

> **트리거**: 모든 Feature Phase(Phase 1~N) ☑ 완료 직후 자동 진입.
> **실행**: `Skill("pre-launch-check")` 또는 `.claude/skills/pre-launch-check.md` 인라인 실행.
> **역할 분리**: subagent-review는 Phase 단위 코드 품질 점검 / Phase G는 전체 통합 보안·운영 점검.

- [ ] `"pre-launch-check 실행해줘"` 입력 — Step 2-D 반복 버그 패턴 자동 스캔
- [ ] Blocker(즉시수정) 0건 확인
- [ ] DB 안전성 항목 통과 (TOCTOU, 트랜잭션, 집계, 타임존)
- [ ] 보안 항목 통과 (신뢰 경계, NEXT_PUBLIC_ 인증 변수 없음)
- [ ] 사내 보안 진단 의뢰 (유저용 서비스 필수, 사내 도구 권장)

### Phase H: 배포
- [ ] 배포 준비 + 체크리스트
- [ ] 배포 실행 + 동작 확인

---

## 코드 패턴 메모

> 새 세션이 기존 코드와 일관된 스타일로 구현하기 위한 기술 브리핑.
> Phase 전환 / 블로커 발생 시 AI가 이 섹션을 갱신한다.
> 상세 설계 결정은 `decisions.md`에 영구 기록한다.

### 디렉터리 구조 (Phase 1 완료 기준)

```
frontend/  (Next.js 15 App Router · React 19 · TS)
  app/
    page.tsx                     ← 홈 (라이브 발견, 서버 컴포넌트)
    live/[channelId]/page.tsx    ← 라이브 시청 (서버 → LiveWatch 클라이언트)
    channel/[channelId]/page.tsx ← 채널
    clips/page.tsx               ← 클립
    search/page.tsx              ← 검색 (클라이언트)
    layout.tsx · globals.css     ← 루트 레이아웃 + NX Basic 토큰
  components/  Header · LiveCard · ClipCard · HomeLives · LiveWatch · FollowButton
  services/    liveService · channelService · clipService  (USE_MOCK 게이트)
  mocks/data.ts   더미 데이터
  lib/         store.ts(zustand persist) · format.ts(fmtCount)
  types/index.ts  Channel · Live · Clip · ChatMessage · GameKey
  tests/e2e/   home.spec.ts · live-watch.spec.ts  (playwright.config.ts)
```

### 공통 패턴

| 항목 | 패턴 |
|---|---|
| 데이터 접근 | 컴포넌트 → `services/*Service.ts` → `USE_MOCK ? mocks : fetch('/api/...')` |
| Mock 게이트 | `process.env.NEXT_PUBLIC_USE_MOCK === 'true'` (services 3파일) |
| 숫자 표시 | `import { fmtCount as fmt } from '@/lib/format'` (로케일 `ko-KR` 고정 — 하이드레이션 안전) |
| 전역 상태 | `useFollowStore` (zustand + persist, localStorage `nxlive-following`) |
| 서버/클라 경계 | 데이터 페칭 페이지=서버 컴포넌트, 인터랙션(store/타이머)=`'use client'` |
| 스타일 | `globals.css` NX Basic 토큰(CSS 변수) — 다크 `bc-1000/db·pc-500`, 라이트 `lb-200·pc-800` |

### 핵심 인터페이스

| 파일 | 이름 | 역할 |
|---|---|---|
| frontend/lib/format.ts | `fmtCount(n)` | 숫자→`ko-KR` 로케일 고정 표시 (SSR 안전) |
| frontend/lib/store.ts | `useFollowStore` | 팔로우 Set (persist, `has`/`toggle`) |
| frontend/services/liveService.ts | `getLives`/`getLive`/`getRanking` | 라이브 조회 (Mock↔API) |
| frontend/types/index.ts | `Live`/`Channel`/`Clip`/`GameKey` | 도메인 타입 단일 출처 |

### 다음 세션 사전 메모

- Phase 2(Mock→실제 API)는 백엔드 스택(D-12)·영상 인프라(D-13) 결정 후 착수. `contracts/api-spec.yaml`이 계약.
- Phase 2 진입 시 `services/*.ts`의 `fetch` 분기 활성화 + `mocks/` 제거 + `check-mock-cleanup.sh` 통과 필요.
- 잔여 Advisory는 `docs/technical-debt.md` 참조 (USE_MOCK 추출, baram 정합, dead code 등).
