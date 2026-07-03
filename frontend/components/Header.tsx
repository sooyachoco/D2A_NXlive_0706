'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: '라이브' },
  { href: '/clips', label: '클립' },
  { href: '/search', label: '검색' },
];

export default function Header() {
  const path = usePathname();
  const isActive = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));
  return (
    <header className="site-header">
      <div className="in">
        <Link href="/" className="logo">NX<span>live</span></Link>
        <nav>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={isActive(n.href) ? 'active' : ''}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="right">
          <Link href="/search" className="search-chip">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8f96a3" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
            게임·스트리머 검색
          </Link>
          <button className="btn btn-primary">방송 시작</button>
        </div>
      </div>
    </header>
  );
}
