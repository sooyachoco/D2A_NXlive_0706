'use client';
import { useState } from 'react';
import type { Live } from '@/types';
import { GAMES } from '@/mocks/data';
import LiveCard from './LiveCard';

export default function HomeLives({ lives }: { lives: Live[] }) {
  const [filter, setFilter] = useState<string>('all');
  const shown = filter === 'all' ? lives : lives.filter((l) => l.gameKey === filter);
  return (
    <>
      <div className="filters">
        <button className={`tag ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>전체</button>
        {GAMES.map((g) => (
          <button key={g.key} className={`tag ${filter === g.key ? 'on' : ''}`} onClick={() => setFilter(g.key)}>
            {g.name}
          </button>
        ))}
      </div>
      <div className="cards">
        {shown.map((l) => <LiveCard key={l.id} live={l} />)}
      </div>
    </>
  );
}
