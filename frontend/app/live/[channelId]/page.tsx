import { notFound } from 'next/navigation';
import { getLive } from '@/services/liveService';
import { getChannel } from '@/services/channelService';
import LiveWatch from '@/components/LiveWatch';

export default async function LivePage({ params }: { params: Promise<{ channelId: string }> }) {
  const { channelId } = await params;
  const [live, channel] = await Promise.all([getLive(channelId), getChannel(channelId)]);
  if (!live || !channel) notFound();
  return <LiveWatch live={live} channel={channel} />;
}
