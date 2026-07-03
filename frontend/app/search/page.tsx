'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Live, Channel, Clip } from '@/types';
import { getLives } from '@/services/liveService';
import { getChannels } from '@/services/channelService';
import { getClips } from '@/services/clipService';
import LiveCard from '@/components/LiveCard';
import ClipCard from '@/components/ClipCard';

const fmt = (n: number) => (n >= 10000 ? `${(n / 10000).toFixed(1)}만` : n.toLocaleString());
type Tab = 'live' | 'channel' | 'clip';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<Tab>('live');
  const [lives, setLives] = useState<Live[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);

  useEffect(() => {
    getLives().then(setLives);
    getChannels().then(setChannels);
    getClips().then(setClips);
  }, []);

  const kw = q.trim().toLowerCase();
  const match = (...fields: string[]) => !kw || fields.some((f) => f.toLowerCase().includes(kw));

  const fLives = useMemo(() => lives.filter((l) => match(l.title, l.channelName, l.category)), [lives, kw]);
  const fChannels = useMemo(() => channels.filter((c) => match(c.name, c.about)), [channels, kw]);
  const fClips = useMemo(() => clips.filter((c) => match(c.title, c.channelName)), [clips, kw]);

  const counts = { live: fLives.length, channel: fChannels.length, clip: fClips.length };

  return (
    <main className="page">
      <div className="search-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8f96a3" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="게임 · 스트리머 · 클립 검색" aria-label="검색어" autoFocus />
      </div>

      <div className="tabs">
        <button className={tab === 'live' ? 'on' : ''} onClick={() => setTab('live')}>라이브 ({counts.live})</button>
        <button className={tab === 'channel' ? 'on' : ''} onClick={() => setTab('channel')}>채널 ({counts.channel})</button>
        <button className={tab === 'clip' ? 'on' : ''} onClick={() => setTab('clip')}>클립 ({counts.clip})</button>
      </div>

      {tab === 'live' && (
        fLives.length ? <div className="cards">{fLives.map((l) => <LiveCard key={l.id} live={l} />)}</div>
          : <div className="empty">검색 결과가 없습니다.</div>
      )}

      {tab === 'channel' && (
        fChannels.length ? (
          <div>
            {fChannels.map((c) => (
              <Link key={c.id} href={`/channel/${c.id}`} className="lrow">
                <span className={`rt g-${c.gameKey}`} />
                <span className="ri">
                  <span className="t">{c.name} {c.live && <span style={{ color: '#d84141', fontSize: 12 }}>● LIVE</span>}</span>
                  <span className="m">팔로워 {fmt(c.followers)} · {c.about}</span>
                </span>
              </Link>
            ))}
          </div>
        ) : <div className="empty">검색 결과가 없습니다.</div>
      )}

      {tab === 'clip' && (
        fClips.length ? <div className="cards">{fClips.map((c) => <ClipCard key={c.id} clip={c} />)}</div>
          : <div className="empty">검색 결과가 없습니다.</div>
      )}
    </main>
  );
}
