import Link from 'next/link';
import type { Clip } from '@/types';

const fmt = (n: number) => (n >= 10000 ? `${(n / 10000).toFixed(1)}만` : n.toLocaleString());

export default function ClipCard({ clip }: { clip: Clip }) {
  return (
    <Link href={`/channel/${clip.channelId}`} className="card">
      <div className={`thumb g-${clip.gameKey}`}>
        <span className="dur">{clip.duration}</span>
      </div>
      <div className="b">
        <div className="t">{clip.title}</div>
        <div className="m"><span className="av" />{clip.channelName} · 조회 {fmt(clip.views)}</div>
      </div>
    </Link>
  );
}
