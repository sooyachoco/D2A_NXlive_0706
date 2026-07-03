import { getClips } from '@/services/clipService';
import ClipCard from '@/components/ClipCard';

export default async function ClipsPage() {
  const clips = await getClips();
  return (
    <main className="page">
      <div className="sect"><h2>클립 · 하이라이트</h2><span className="count">{clips.length}개</span></div>
      <div className="cards">{clips.map((c) => <ClipCard key={c.id} clip={c} />)}</div>
    </main>
  );
}
