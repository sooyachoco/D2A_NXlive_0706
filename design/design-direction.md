# 디자인 방향

## 디자인 시스템

- 디자인 시스템: NX Basic 1.0v (DESIGN_SYSTEM=nxbasic)
- 적용 경로: Q5* N 선택
- 참조: `refs/design-systems/nxbasic-1.0v.md`

## 선택된 디자인 샘플

- 선택된 샘플: N · NX Desk (사이드바 + 콘텐츠 대시보드)
- 디자인 톤: 전문적·깔끔한 라이트 테마, NX Basic 시스템 토큰 준수
- UI 프레임워크: {Stage 2에서 확정}
- HTML 프리뷰: `design/samples.html` (Q5* 비교용 — 5종 중 N 선택)

## 레퍼런스

NX Basic 디자인 시스템 적용 — 외부 레퍼런스 리서치 생략

| 서비스 | URL | 참고 포인트 | 출처 |
|---|---|---|---|
| NX Basic 1.0v Storybook | https://sooyachoco.github.io/NXbasic1.0v/ | 컴포넌트 18종, 디자인 토큰 144개 | 사내 DS |

## 확정된 방향

- 레이아웃: 사이드바(240px) + 메인 콘텐츠 (피처드 스트림 → 스트림 그리드 → 인기 스트리머 → 편성표)
- 색상: NX Basic Primary Blue (#57A0FF) 기반 라이트 테마
- 톤앤매너: 전문적·체계적인 대시보드 UI, NX Basic 시스템 토큰 준수

## 색상 시스템

> NX Basic 1.0v Primary Color (pc) + Base Color (bc) + Semantic 토큰 적용.

| 역할 | 색상명 | Hex | 용도 |
|---|---|---|---|
| Primary 100 | pc-100 | #ECF1F9 | 가장 연한 배경, 호버 상태 |
| Primary 200 | pc-200 | #CCE2FF | 연한 배경, 선택 상태 |
| Primary 300 | pc-300 | #B8D7FF | 보조 배경, 테두리 |
| Primary 400 | pc-400 | #8FBFFF | 비활성 요소 |
| Primary 500 | pc-500 | #6BABFF | 보조 강조 |
| Primary 600 | pc-600 (action.primary) | #57A0FF | 기본 (버튼, 링크, 강조) |
| Primary 700 | pc-700 (action.primaryHover) | #3D91FF | 호버 상태 |
| Primary 800 | pc-800 | #0A74FF | 활성/눌림 상태 |
| Primary 900 | pc-900 | #0056C7 | 진한 텍스트 |
| Primary 1000 | pc-1000 | #1E4B85 | 가장 진한, 제목 강조 |
| Neutral 100 | bc-100 | #E8EBF2 | 카드 배경, 구분 |
| Neutral 200 | bc-200 | #D2D6E0 | 보조 배경 |
| Neutral 300 | bc-300 (border.default) | #C6CCD7 | 구분선, 테두리 |
| Neutral 400 | bc-400 | #B1B7C4 | placeholder 텍스트 |
| Neutral 500 | bc-500 | #A1A7B5 | 보조 텍스트 |
| Neutral 600 | bc-600 | #8F96A3 | 캡션 텍스트 |
| Neutral 700 | bc-700 | #747A86 | 본문 보조 텍스트 |
| Neutral 800 | bc-800 (text.secondary) | #51555D | 본문 텍스트 |
| Neutral 900 | bc-900 | #3D4148 | 강조 텍스트 |
| Neutral 1000 | bc-1000 (text.primary) | #17191C | 최진한 텍스트, 제목 |
| Surface Default | surface.default | #FCFCFD | 기본 배경 |
| Surface Muted | surface.muted | #F9FAFB | 페이지 배경 |
| Success | success | #59E387 | 성공 메시지, 완료 상태 |
| Warning | warning | #FFBB00 | 경고, 주의 |
| Error/Danger | danger | #EF5D5D | 에러, 삭제, LIVE 뱃지 |

## 타이포그래피

> NX Basic 1.0v 13단계 타입 스케일 적용.

| 요소 | 폰트 | 크기 | 굵기 | line-height | letter-spacing |
|---|---|---|---|---|---|
| Display | system-ui, Noto Sans KR | 54px | 800 | 82px | -0.5px |
| H1 | system-ui, Noto Sans KR | 36px | 700 | 54px | -0.5px |
| H2 | system-ui, Noto Sans KR | 28px | 700 | 42px | -0.5px |
| H3 | system-ui, Noto Sans KR | 22px | 600 | 34px | -0.4px |
| H4 | system-ui, Noto Sans KR | 18px | 600 | 28px | -0.36px |
| Body Large | system-ui, Noto Sans KR | 16px | 400 | 26px | -0.32px |
| Body | system-ui, Noto Sans KR | 14px | 400 | 22px | -0.28px |
| Body Small | system-ui, Noto Sans KR | 13px | 400 | 20px | -0.26px |
| Caption | system-ui, Noto Sans KR | 12px | 400 | 18px | -0.24px |
| Overline | system-ui, Noto Sans KR | 11px | 600 | 18px | 0.08em |

## 여백 시스템 (Spacing Scale)

> NX Basic spacing 토큰 (4px 기반 그리드).

| 토큰 | 값 | 용도 |
|---|---|---|
| space-1 | 4px | 인라인 요소 간 최소 간격 |
| space-2 | 8px | 밀접한 요소 간격 (라벨-입력 등) |
| space-3 | 12px | 컴포넌트 내부 패딩 (소) |
| space-4 | 16px | 컴포넌트 내부 패딩 (기본) |
| space-5 | 20px | 카드 내부 패딩 |
| space-6 | 24px | 관련 컴포넌트 그룹 간 간격 |
| space-8 | 32px | 섹션 내부 블록 간 간격 |
| space-10 | 40px | 콘텐츠 블록 간 간격 |
| space-12 | 48px | 소 섹션 간 간격 |
| space-16 | 64px | 섹션 간 간격 |
| space-20 | 80px | 대 섹션 간 간격 |
| space-24 | 96px | 히어로/주요 영역 여백 |

## 표면 & 깊이 (Surfaces & Elevation)

### 배경 레벨

| 레벨 | 용도 | 색상 | 예시 |
|---|---|---|---|
| level-0 | 페이지 배경 | #F9FAFB (surface.muted) | body 배경 |
| level-1 | 카드, 패널 | #FCFCFD (surface.default) | 카드, 사이드바 |
| level-2 | 강조 영역 | #EBF3FF (pc-100 변형) | 선택된 행, 활성 탭 |
| level-3 | 오버레이 | #FFFFFF | 모달, 드롭다운 |

### 그림자 토큰

| 토큰 | 값 | 용도 |
|---|---|---|
| shadow-1 | 0 1px 3px rgba(0,0,0,0.04) | 카드 기본 상태 |
| shadow-2 | 0 4px 16px rgba(0,0,0,0.06) | 카드 호버, 드롭다운 |
| shadow-3 | 0 8px 30px rgba(0,0,0,0.1) | 모달, 팝오버 |
| shadow-4 | 0 12px 40px rgba(0,0,0,0.14) | 토스트, 플로팅 버튼 |

### Border Radius 토큰

| 토큰 | 값 | 용도 |
|---|---|---|
| radius-sm | 4px | 뱃지, 태그, 작은 버튼 |
| radius-md | 8px | 버튼, 입력 필드 |
| radius-lg | 12px | 카드, 스트림 카드 |
| radius-xl | 16px | 피처드 스트림, 대형 카드 |
| radius-full | 9999px | 아바타, 라이브 링 |

## 모션 가이드

### Duration

| 토큰 | 값 | 용도 |
|---|---|---|
| duration-fast | 150ms | 호버, 포커스, 토글 |
| duration-normal | 300ms | 패널 열기/닫기, 드롭다운 |
| duration-slow | 500ms | 페이지 전환, 피처드 스트림 진입 |

### Easing

| 토큰 | 값 | 용도 |
|---|---|---|
| ease-out-expo | cubic-bezier(0.16, 1, 0.3, 1) | 요소 진입 |
| ease-in-out | cubic-bezier(0.4, 0, 0.2, 1) | 위치 이동, 크기 변화 |

### 마이크로 인터랙션 기준

| 요소 | 호버 | 포커스 | 클릭/액티브 |
|---|---|---|---|
| 버튼 | 배경 pc-700 + scale(1.02) | ring pc-300 | scale(0.98) |
| 카드 | translateY(-2px) + shadow-2 | ring pc-300 | — |
| 입력 필드 | — | border pc-600 + glow | — |
| 스트리머 아이템 | translateY(-2px) + shadow-2 | ring | — |
| 편성표 행 | 배경 surface.muted | — | — |

## 히어로/키비주얼 방향

### 대시보드 첫 화면 (히어로 대안)

- 피처드 스트림: 풀와이드 라운드 카드 (340px), 그래디언트 오버레이, LIVE 뱃지 + 시청자 수
- 스트림 그리드: 3칸 카드 그리드, 썸네일 + 메타정보
- 인기 스트리머: 5칸 아바타 스트립, LIVE 링 애니메이션
- 편성표: 테이블 형태, 시간/프로그램/채널/카테고리/상태 열, ON AIR 강조

## 에셋 가이드

### 일반 에셋

- 폰트 특성: 시스템 폰트 + Noto Sans KR (산세리프), 11~54px, 400/500/600/700/800
- 아이콘 특성: NX Basic Icon 컴포넌트 활용, 라인 스타일
- 이미지 특성: 그래디언트 배경 (pc 토큰 기반 linear-gradient)

## 컴포넌트 커스터마이징 방향

> NX Basic 토큰 준수 — 임의 변주를 추가하지 않는다 (design-quality-guard 면제).

- 버튼: NX Basic Button 컴포넌트 — pc-600 배경, 8px radius
- 카드: NX Basic Card 컴포넌트 — surface.default 배경, bc-100 border, 12px radius
- 테이블: NX Basic Table 컴포넌트 — 행 호버 surface.muted, 상태 뱃지 (danger/bc-100)
- 입력 필드: NX Basic TextField 컴포넌트 — bc-300 border, 포커스 시 pc-600

## NX Basic 컴포넌트 매핑

> 프로젝트 UI 요소를 NX Basic 18종 컴포넌트에 매핑한다.

| 프로젝트 UI 요소 | NX Basic 컴포넌트 | 비고 |
|---|---|---|
| 방송 시작/전체보기 버튼 | Button | primary/secondary variant |
| 스트림 카드 | Card | 썸네일 + 메타정보 |
| LIVE/ON AIR 뱃지 | Badge | danger color |
| 카테고리 태그 | Tag | bc-100 배경 |
| 검색창 | Search / TextField | 헤더 검색 |
| 사이드바 탭 | Tab | 채널 카테고리 전환 |
| 편성표 | Table | 시간/프로그램/채널/상태 열 |
| 알림 뱃지 | Badge | danger color, 숫자 표시 |
| 툴팁 | Tooltip | 호버 시 정보 표시 |
| 토글 (알림 설정 등) | Toggle | 사이드바 설정 |

## 디자인 프리뷰

| HTML 프리뷰 | 파일 경로 | 용도 | 상태 |
|---|---|---|---|
| 디자인 샘플 5종 | `design/samples.html` | Q5* 비교 선택용 | 선택 완료 — 샘플 N (NX Desk) |
