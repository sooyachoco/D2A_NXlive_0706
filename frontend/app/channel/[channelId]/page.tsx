import { notFound } from 'next/navigation';
import { getChannel } from '@/services/channelService';
import { getClipsByChannel } from '@/services/clipService';
import FollowButton from '@/components/FollowButton';
import ClipCard from '@/components/ClipCard';

const fmt = (n: number) => (n >= 10000 ? `${(n / 10000).toFixed(1)}만` : n.toLocaleString());

export default async function ChannelPage({ params }: { params: Promise<{ channelId: string }> }) {
  const { channelId } = await params;
  const channel = await getChannel(channelId);
  if (!channel) notFound();
  const clips = await getClipsByChannel(channelId);

  return (
    <main className="page">
      <div className="ch-head">
        <span className={`av g-${channel.gameKey}`} />
        <div>
          <div className="nm">
            {channel.name}
            <span className={`badge ${channel.live ? 'on' : 'off'}`}>{channel.live ? 'LIVE' : 'OFFLINE'}</span>
          </div>
          <div className="fo">팔로워 {fmt(channel.followers)}</div>
          <div className="ab">{channel.about}</div>
        </div>
        <div className="spacer"><FollowButton channelId={channel.id} /></div>
      </div>

      <div className="sect" style={{ marginTop: 28 }}><h2>클립</h2><span className="count">{clips.length}개</span></div>
      {clips.length ? (
        <div className="cards">{clips.map((c) => <ClipCard key={c.id} clip={c} />)}</div>
      ) : (
        <div className="empty">아직 등록된 클립이 없습니다.</div>
      )}
    </main>
  );
}
