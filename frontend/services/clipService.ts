import type { Clip } from '@/types';
import { MOCK_CLIPS } from '@/mocks/data';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getClips(): Promise<Clip[]> {
  if (USE_MOCK) return Promise.resolve([...MOCK_CLIPS]);
  const res = await fetch('/api/clips');
  return res.json();
}

export async function getClipsByChannel(channelId: string): Promise<Clip[]> {
  if (USE_MOCK) return Promise.resolve(MOCK_CLIPS.filter((c) => c.channelId === channelId));
  const res = await fetch(`/api/channels/${channelId}/clips`);
  return res.json();
}
