'use client';
import { useFollowStore } from '@/lib/store';

export default function FollowButton({ channelId }: { channelId: string }) {
  const following = useFollowStore((s) => s.following.has(channelId));
  const toggle = useFollowStore((s) => s.toggle);
  return (
    <button className={`btn ${following ? 'btn-outline' : 'btn-primary'}`} onClick={() => toggle(channelId)}>
      {following ? '팔로잉' : '+ 팔로우'}
    </button>
  );
}
