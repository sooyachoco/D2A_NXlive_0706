import Link from 'next/link';
import type { Live } from '@/types';
import { fmtCount as fmt } from '@/lib/format';

export default function LiveCard({ live }: { live: Live }) {
  return (
    <Link href={`/live/${live.channelId}`} className="card">
      <div className={`thumb g-${live.gameKey}`}>
        <span className="badge-live"><span className="livedot" />LIVE</span>
        <span className="vw">{fmt(live.viewers)}</span>
      </div>
      <div className="b">
        <div className="t">{live.title}</div>
        <div className="m"><span className="av" />{live.channelName} · 팔로워 {fmt(live.followers)}</div>
        <span className="ctag">{live.category}</span>
      </div>
    </Link>
  );
}
