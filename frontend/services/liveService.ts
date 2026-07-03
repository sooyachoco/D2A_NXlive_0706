import type { Live } from '@/types';
import { MOCK_LIVES } from '@/mocks/data';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getLives(): Promise<Live[]> {
  if (USE_MOCK) return Promise.resolve([...MOCK_LIVES]);
  const res = await fetch('/api/lives');
  return res.json();
}

export async function getLive(channelId: string): Promise<Live | null> {
  if (USE_MOCK) return Promise.resolve(MOCK_LIVES.find((l) => l.channelId === channelId) ?? null);
  const res = await fetch(`/api/lives/${channelId}`);
  return res.ok ? res.json() : null;
}

export async function getRanking(): Promise<Live[]> {
  if (USE_MOCK) return Promise.resolve([...MOCK_LIVES].sort((a, b) => b.viewers - a.viewers));
  const res = await fetch('/api/lives/ranking');
  return res.json();
}
