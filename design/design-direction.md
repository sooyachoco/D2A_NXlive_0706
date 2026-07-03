# NXlive — 디자인 방향 (Stage 1 / Q5* 진행 중)

- **프로젝트**: NXlive — 넥슨 게임 라이브 스트리밍 플랫폼
- **대상**: 외부 유저 (넥슨 회원)
- **첫인상 키워드**: 혁신/모던함 · 역동성 · 세련됨/고급감
- **디자인 시스템**: 미지정 (NX Basic 아님) — 웹 리서치 기반 커스텀 방향
- **인증 프로필**: none (host: local-nxlive.test)
- **GNB**: 미사용

## 웹 레퍼런스 리서치 요약 (2026-07)

검색 3회에서 도출한 라이브 스트리밍/콘텐츠 플랫폼 2026 트렌드:

- **다크 테마가 표준** — 순수 #000 지양, true grey 베이스(#0E~#1A). 레이어드 엘리베이션(배경 미세 단차)으로 깊이 표현.
- **1~2개의 채도 높은 액센트** — 네온-온-다크. 예: InsightStream(딥 차콜 + 바이브런트 핑크·그린).
- **실시간성 노출** — LIVE 뱃지, 실시간 시청자 수, 라이브 썸네일, 실시간 카운터가 기본 기대치.
- **모션 랭귀지** — 게이밍/스트리밍은 아트디렉션·모션이 핵심 (Awwwards 게이밍 사례).
- **동적 시각 + 직관적 내비** — 활기찬 액센트로 라이브 콘텐츠를 전면에.

참고 소스:
- Subframe — 25 Streaming Website Design Examples
- DesignRush — Best Streaming App Designs 2026
- Muzli — Best Dashboard/Dark mode Inspiration 2026
- AYDesign — Dark mode dashboard patterns 2026 (true grey / layered elevation / saturated accents)
- Awwwards — Games & Entertainment nominees

## 3가지 방향 (samples.html A/B/C)

| 방향 | 컨셉 | 레이아웃(첫 화면) | Primary | 폰트 |
|---|---|---|---|---|
| **A. Broadcast Bento** | 역동성 — 라이브 채널 모자이크 | 비대칭 벤토 그리드(크기 다른 타일) | 애시드 라임 `#B8FF2E` on `#101014` | Space Grotesk + Black Han Sans + Gothic A1 |
| **B. Cinematic Split** | 세련됨/고급감 — 에디토리얼 | 분할 스크린(좌 피처드 / 우 리스트) | 앰버 골드 `#F0A93B` on `#16130F` | Fraunces + Gowun Batang + Gothic A1 |
| **C. Neon Depth** | 혁신/모던함 — 레이어드 네온 | 겹치는 패널 + 대각선 깊이 | 네온 시안 `#22E0D6` + 마젠타 `#FF3D9A` on `#0B0E17` | Space Grotesk + Orbitron + Gothic A1 |
| **N. NX Basic 1.0v** | 넥슨 사내 디자인 시스템 — 정갈한 프로덕트 | 라이트 앱바+Tab / Card 그리드 / 랭킹 패널 | 블루 `pc-800 #0a74ff` + bc 뉴트럴 on `lb-200 #f9fafb` | Pretendard/Gothic A1 · type-default-16 |

> **N(NX Basic)**: `nxbasic-mcp` 실제 토큰(컬러 49종 중 pc-800 #0a74ff 프라이머리, bc 뉴트럴, type-default-16)과 컴포넌트(Tab·Card·Badge·Tag·Search·Button)로 구현. A/B/C(웹 리서치·다크)와 달리 라이트 테마 · 사내 시스템 준수형. 선택 시 `DESIGN_SYSTEM=nxbasic`.

> 각 방향은 레이아웃 구조·Primary 컬러·폰트가 서로 다르며, 중앙 히어로 패턴을 쓰지 않는다.
> AI 클리셰(인디고 #6366f1, Poppins+Inter, glassmorphism 남용, 이모지 아이콘) 배제.
> 도메인 아이콘(재생·라이브 도트·시그널·시청자·컨트롤러·파형)은 inline SVG로 직접 작성.

## ✅ 확정 방향: C — NX Basic 1.0v (다크+라이트 하이브리드)

- **DESIGN_SYSTEM = nxbasic** (넥슨 사내 디자인 시스템 준수 — 임의 변주 없이 토큰/컴포넌트 사용)
- **프론트엔드 프레임워크 = React** (NX Basic은 React 패키지 `import { Button } from 'nxbasic'`)
- **레이아웃**: 상단 다크(히어로+사이드 패널+카테고리) + 하단 라이트(라이브 카드 그리드)
- **토큰**:
  - 다크: 배경 `bc-1000 #17191c` · surface `db-200 #26282c` · elevated `db-100 #393c41` · 액센트 `pc-500 #6babff` · LIVE `r-200 #ef5d5d`
  - 라이트: 배경 `lb-200 #f9fafb` · 카드 `#fff` · 액센트 `pc-800 #0a74ff`
  - 타이포: `type-default-16` (16/24/-0.35px) · Pretendard→Gothic A1
  - 시맨틱: primary `pc-800`, danger `r-300`, success `g-300`
- **컴포넌트**: NX Basic 18종 매핑 (Tab · Card · Badge · Tag · Search · Button · Dialog · Table 등). 패키지 설치 시 `nxbasic` import 우선, 사내망 제약 시 Storybook props 참조 동등 구현.
- **참조**: `refs/design-systems/nxbasic-1.0v.md` · `nxbasic-mcp` (list_components / search_design_tokens / get_component_docs)

> 확정일: 2026-07-03 · `boilerplate-setup` Q5* [5단계] 사용자 C 선택 → NX Basic 전환본으로 락.
> Stage 1.5(웹 디자인 리서치)는 DESIGN_SYSTEM=nxbasic 이므로 생략하고 Stage 2로 진행.
