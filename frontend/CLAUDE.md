# 프론트엔드 전용 지침

> 이 파일은 `frontend/` 디렉토리에서 작업할 때 루트 `CLAUDE.md`에 추가로 로드된다.
> 루트 CLAUDE.md의 헌법·공통 규칙이 먼저 적용되며, 이 파일은 프론트엔드 전용 규칙을 정의한다.
> **Claude Code 기반 개발을 전제한다.**

---

## 빌드 검사 (프론트엔드)

소스 파일 수정 후 **같은 턴에서** 빌드 검사를 실행한다:

```bash
npm run build   # 또는 yarn build / pnpm build
```

실패 시 수정 후 재검사. 연속 2회 실패 시 세션 체크포인트를 생성하고 사용자에게 보고한다.

---

## 디자인 품질 기준

`design-direction.md`가 존재하면 **`Read("design-direction.md")`로 반드시 먼저 읽고** 정의된 톤·색상·타이포를 준수한다.

아래 **필수 디자인 요소**와 **안티패턴**은 `design-direction.md`에 해당 항목이 명시되지 않은 경우의 기본 기준이다. `design-direction.md`가 명시한 항목은 해당 파일이 우선한다.

**AI 기본 출력 안티패턴 — 금지:**
- 모든 섹션에 동일한 `max-w-7xl mx-auto px-4` 반복
- 히어로 영역: 중앙 정렬 제목 + 부제목 + CTA 버튼 1개 (기본 배치)
- 카드 그리드: `grid-cols-3 gap-6`만 반복
- Primary 단색 + Neutral(회색)만 사용
- shadcn/MUI/Ant Design 기본 테마를 커스터마이징 없이 사용
- 트랜지션/애니메이션이 전혀 없는 정적 UI
- **콘텐츠 가로폭 1440px 미제한** — 뷰포트 전체 너비 사용 (넓은 모니터에서 레이아웃 붕괴)

**필수 디자인 요소:**
- 시각적 위계 3단계 이상
- 섹션 간 여백은 컴포넌트 내부 여백보다 최소 2배 이상
- Primary의 tint/shade 변형 활용 (최소 4단계)
- 카드/패널에 레벨별 그림자 토큰 사용
- 버튼 호버 시 배경 + scale(1.02) + shadow 변화
- 페이지 진입: 섹션별 staggered fade-in

접근성: WCAG AA 이상, `prefers-reduced-motion` 지원 필수.

---

## 콘텐츠 가로폭 규칙 (width-constraint)

**모든 페이지의 콘텐츠 가로폭은 1440px로 제한한다.**
1440px 초과 뷰포트에서 콘텐츠가 좌우로 무제한 늘어나면 가독성·레이아웃 비율이 붕괴된다.

요소 유형에 따라 두 패턴을 구분 적용한다:

**패턴 A — nav/header (배경은 풀스크린, 내용물만 1440px)**

```css
/* Xpx = 기존 좌우 padding 값 */
.site-nav,
.site-header {
  padding-left:  max(Xpx, calc((100vw - 1440px) / 2 + Xpx));
  padding-right: max(Xpx, calc((100vw - 1440px) / 2 + Xpx));
}
/* 뷰포트 ≤ 1440px → padding = Xpx 고정 / 뷰포트 > 1440px → 내용물이 1440px 중앙 정렬 */
```

**패턴 B — 콘텐츠 블록 (그리드·카드·사이드바+메인)**

```css
.content-wrapper,
.page-grid,
.sidebar-layout {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}
```

**Tailwind 프로젝트 적용 예시:**

```tsx
// 패턴 A: globals.css 또는 layout 컴포넌트
// .site-header { @apply px-6; padding-left: max(1.5rem, calc((100vw - 1440px) / 2 + 1.5rem)); ... }

// 패턴 B: 레이아웃 컴포넌트 wrapper
<div className="max-w-[1440px] mx-auto px-6">
  {children}
</div>
```

**섹션 간 가로폭 불일치 금지:**
- 페이지 내 모든 섹션의 콘텐츠 좌측 시작점이 동일해야 한다
- nav, hero, 카드 그리드, footer 등 전 섹션에 동일한 컨테이너 기준 적용

---

---

## 컴포넌트 작성 규칙

**파일 구조:**
```
ComponentName/
├── index.tsx          ← 진입점 (export만)
├── ComponentName.tsx  ← 구현
├── ComponentName.test.tsx
└── ComponentName.module.css  (CSS Modules 사용 시)
```

**상태 관리 (React 기준 — 다른 프레임워크는 해당 생태계의 동등 패턴 적용):**
- 서버 상태: React Query / SWR (로컬 캐시, 동기화)
- UI 상태: useState / useReducer (컴포넌트 스코프)
- 전역 상태: Context API 또는 Zustand (최소화)

**접근성:**
- 인터랙티브 요소는 키보드로 조작 가능해야 함
- `role`, `aria-label`, `aria-describedby` 적절히 사용
- 색상만으로 정보를 전달하지 않음 (아이콘 또는 텍스트 병행)

---

## inface.js 로드 (INSIGN 인증 프로젝트 필수)

**적용 대상**: `spec.md`에 외부 유저 인증(INSIGN)이 명시된 프로젝트

`window.inface` 객체는 inface.js가 로드된 이후에만 사용할 수 있다.
미로드 시 `window.inface?.auth?.getUserProfile()` 호출이 `undefined`를 반환하여 인증이 동작하지 않는다.

**GNB 없는 프로젝트 (`GNB_REQUIRED = false`):**

```tsx
// app/layout.tsx — <head> 내부
import Script from 'next/script'

// inface-web-auth: 허용 도메인 선언
// *.nexon.com이 아닌 도메인은 /insign 페이지 구현 + insign@nexon.co.kr 도메인 허용 요청 필수
<meta name="inface-web-auth" content={process.env.NEXT_PUBLIC_SERVICE_DOMAIN} />
<Script
  src="https://signin.nexon.com/sdk/inface.js"
  strategy="beforeInteractive"
/>
```

**GNB 있는 프로젝트 (`GNB_REQUIRED = true`):**

GNB 스크립트(ngb_head.js · gnb.min.js 등)는 inface.js를 자동 포함하지 않는다.
`ngb_head.js` 직후에 명시적으로 추가한다:

```tsx
// app/layout.tsx — <head> 내부 (순서 유지)
<Script src={`https://${sslDomain}/s1/global/ngb_head.js`} strategy="beforeInteractive" />
<meta name="inface-web-auth" content={process.env.NEXT_PUBLIC_SERVICE_DOMAIN} />
<Script
  src="https://signin.nexon.com/sdk/inface.js"
  strategy="beforeInteractive"
/>
```

> `NEXT_PUBLIC_SERVICE_DOMAIN`: boilerplate-setup Stage Q7-B에서 수집한 서비스 도메인 (예: `mygame.nexon.com`).
> `*.nexon.com` 외 도메인은 `insign@nexon.co.kr` 도메인 허용 요청이 선행되어야 한다 (refs/policies/authentication-external.md A-2d 참조).

---

## API 호출 패턴 (INFACE API Gateway, Next.js 기준)

> **적용 대상**: Nexon INFACE API Gateway를 사용하는 Next.js 프로젝트. 다른 스택은 해당 프레임워크의 동등 패턴으로 대체한다.

| 환경 | API 경로 | 인증 처리 |
|---|---|---|
| 로컬 | 백엔드 직접 호출 | inface.js에서 uid 추출 → `x-inface-user-uid` 헤더 수동 주입 |
| 스테이지/라이브 | API Gateway 경유 | Gateway가 `x-inface-user-uid` 자동 주입 |

### API 클라이언트

```typescript
// lib/api-client.ts
const USE_GATEWAY = process.env.NEXT_PUBLIC_USE_GATEWAY === 'true'
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

declare global {
  interface Window {
    inface?: {
      auth?: {
        getUserProfile?: () => Promise<{ data?: { uid?: string } }>
      }
    }
  }
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  if (USE_GATEWAY) return {}
  // 로컬: inface.js에서 uid 추출 후 헤더로 직접 전달
  const result = await window.inface?.auth?.getUserProfile?.()
  const uid = result?.data?.uid
  return uid ? { 'x-inface-user-uid': uid } : {}
}

export async function apiFetch(path: string, init: RequestInit = {}) {
  const authHeaders = await getAuthHeaders()
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...init.headers,
    },
  })

  // 401 → /login 으로 리다이렉트 시 원래 경로를 from 쿼리로 보존
  // (로그인 후 사용자가 원래 보려던 화면으로 복귀 가능)
  if (res.status === 401 && typeof window !== 'undefined') {
    const current = window.location.pathname + window.location.search
    // 이미 /login 페이지면 무한 루프 방지 — 호출자가 직접 처리
    if (!window.location.pathname.startsWith('/login')) {
      window.location.assign(`/login?from=${encodeURIComponent(current)}`)
    }
  }

  return res
}
```

> `/login` 페이지에서 로그인 성공 시 `useSearchParams().get('from')` 으로 원래 경로를 읽어
> 안전 검증(같은 origin, `/` 시작) 후 `router.push(from)` 으로 복귀시킨다.

### 환경변수

```bash
# .env.local — INSIGN(HTTPS) 로컬 개발
# ⚠️ HTTPS 프론트에서 http:// 백엔드를 NEXT_PUBLIC_API_BASE_URL로 직접 지정하면
#    브라우저가 Mixed Content로 차단한다. BACKEND_URL + rewrites() 프록시를 사용한다.
BACKEND_URL=http://localhost:8000   # next.config.ts rewrites() 대상 (server-side 전용)
NEXT_PUBLIC_USE_GATEWAY=false
# NEXT_PUBLIC_API_BASE_URL 미설정 → api-client.ts의 API_BASE = '' → rewrites()가 프록시 처리

# .env.production (스테이지/라이브)
NEXT_PUBLIC_API_BASE_URL=https://public.api.nexon.com/{서비스}
NEXT_PUBLIC_USE_GATEWAY=true
```

**주의**: `NEXT_PUBLIC_USE_GATEWAY=true`는 스테이지/라이브에만 설정. 로컬에서 `true`로 설정하면 uid가 전달되지 않아 모든 인증 API가 401을 반환한다.

### 로컬 개발 API 프록시 (next.config.ts)

로컬에서 프론트엔드 → 백엔드 API 호출 시 CORS 문제를 피하려면 Next.js 개발 서버를 프록시로 사용한다.

**⚠️ Self-referencing proxy 방지 필수**

`BACKEND_URL`이 Next.js 서버와 동일 포트이면 자기 자신에게 무한 프록시가 발생한다.
`isSelfProxy` 체크로 이를 방지한다.

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const backendUrl = process.env.BACKEND_URL;

// BACKEND_URL이 미설정이거나 Next.js 서버 자신을 가리키면 rewrites 비활성화
const isSelfProxy =
  !backendUrl ||
  backendUrl.includes("localhost:3000") ||
  backendUrl.includes("127.0.0.1:3000");

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    process.env.NEXT_PUBLIC_LOCAL_HOST ?? 'localhost',
  ],
  async rewrites() {
    if (isSelfProxy) return [];  // self-proxy 방지 — API Routes를 Next.js가 직접 처리
    return [
      {
        source: '/api/v1/:path*',
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ]
  },
}

export default nextConfig
```

> **사용 패턴**: 프론트+백 통합(Next.js API Routes만 사용) 시 `BACKEND_URL` 미설정 → `isSelfProxy=true` → rewrites 비활성.
> 분리된 백엔드 서버가 있을 때만 `BACKEND_URL=http://localhost:8000` (포트 다름) 설정.

```typescript
// lib/api-client.ts — API_BASE를 빈 문자열로 고정, rewrites()가 프록시 처리
const API_BASE = ''  // next.config.ts rewrites()로 /api/v1/* → 백엔드 프록시

// 로컬에서 inface.js 미설치 환경 대비 DEV_UID 폴백
async function getAuthHeaders(): Promise<Record<string, string>> {
  if (USE_GATEWAY) return {}
  const result = await window.inface?.auth?.getUserProfile?.()
  const uid = result?.data?.uid ?? process.env.NEXT_PUBLIC_DEV_UID  // 로컬 개발용 폴백
  return uid ? { 'x-inface-user-uid': uid } : {}
}
```

```bash
# .env.local 추가 항목
# 분리된 백엔드가 있을 때만 설정 (포트 3000과 다른 포트 사용)
# BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_LOCAL_HOST=local-{서비스}.nexon.com  # hosts 등록된 로컬 호스트
NEXT_PUBLIC_DEV_UID=                              # 로컬에서 inface.js 없을 때 테스트용 uid (NODE_ENV=development 가드 필수)
```

---

## SSR/하이드레이션 안전 패턴 (Next.js)

> 아래 규칙 위반은 개발 모드에서 "1 Issue" 오버레이로 나타나며,
> 프로덕션에서 콘솔 에러를 유발한다.

### 1. new Date() 서버 컴포넌트 직접 사용 금지

```typescript
// ❌ 금지 — SSR과 CSR의 new Date() 값이 다름 (타임존·시점 차이)
<div>{new Date().getFullYear()}년 {new Date().getMonth() + 1}월</div>

// ✅ useClientDate() 훅 사용 (클라이언트에서만 계산)
function useClientDate(): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); }, []);
  return now;
}

// 사용:
const now = useClientDate();
<div>{now ? `${now.getFullYear()}년 ${now.getMonth() + 1}월` : "..."}</div>
```

### 2. dangerouslySetInnerHTML 인라인 스크립트 — DOM 직접 조작 금지

```typescript
// ❌ 금지 — hydration 전에 DOM을 수정하면 서버/클라이언트 불일치 발생
<script dangerouslySetInnerHTML={{ __html: `
  document.documentElement.style.setProperty('--gnb-h', '60px');  // ← 하이드레이션 불일치
` }} />

// ✅ useEffect로 이관 — hydration 완료 후 실행
useEffect(() => {
  const h = parseInt(getComputedStyle(document.body).paddingTop, 10) || 60;
  document.documentElement.style.setProperty('--gnb-h', h + 'px');
}, []);

// 단, onGnbReady 콜백 선언 스크립트는 DOM 조작 없이 허용:
<script dangerouslySetInnerHTML={{ __html: `function onGnbReady(){}` }} />
```

### 3. toLocaleString() 직접 렌더링

```typescript
// ❌ 서버/클라이언트 로케일 차이로 불일치 가능
<em>{value.toLocaleString()}</em>

// ✅ suppressHydrationWarning 또는 클라이언트 상태
<em suppressHydrationWarning>{value?.toLocaleString() ?? "—"}</em>
```

---

