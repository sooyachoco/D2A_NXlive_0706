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

> 각 방향은 레이아웃 구조·Primary 컬러·폰트가 서로 다르며, 중앙 히어로 패턴을 쓰지 않는다.
> AI 클리셰(인디고 #6366f1, Poppins+Inter, glassmorphism 남용, 이모지 아이콘) 배제.
> 도메인 아이콘(재생·라이브 도트·시그널·시청자·컨트롤러·파형)은 inline SVG로 직접 작성.

**최종 선택 대기** → 사용자가 A / B / C / N(NX Basic) / D(직접) 중 선택하면 이 문서를 확정 방향으로 갱신.
