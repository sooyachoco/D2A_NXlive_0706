import type { Channel } from '@/types';
import { MOCK_CHANNELS } from '@/mocks/data';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getChannel(channelId: string): Promise<Channel | null> {
  if (USE_MOCK) return Promise.resolve(MOCK_CHANNELS.find((c) => c.id === channelId) ?? null);
  const res = await fetch(`/api/channels/${channelId}`);
  return res.ok ? res.json() : null;
}

export async function getChannels(): Promise<Channel[]> {
  if (USE_MOCK) return Promise.resolve([...MOCK_CHANNELS]);
  const res = await fetch('/api/channels');
  return res.json();
}
