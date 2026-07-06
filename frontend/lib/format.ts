// 숫자 표시 포맷 — 로케일 고정('ko-KR')으로 SSR/CSR 하이드레이션 결과를 결정화한다.
// (frontend/CLAUDE.md SSR §3: 서버 컴포넌트에서 로케일 의존 toLocaleString() 직접 렌더 금지)
export const fmtCount = (n: number): string =>
  n >= 10000 ? `${(n / 10000).toFixed(1)}만` : n.toLocaleString('ko-KR');
