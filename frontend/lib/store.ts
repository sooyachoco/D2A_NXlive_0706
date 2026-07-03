'use client';
import { create } from 'zustand';

// 팔로우 상태 (Mock — 로컬 전용, 인증 없음)
interface FollowState {
  following: Set<string>;
  toggle: (channelId: string) => void;
  isFollowing: (channelId: string) => boolean;
}

export const useFollowStore = create<FollowState>((set, get) => ({
  following: new Set<string>(),
  toggle: (channelId) =>
    set((s) => {
      const next = new Set(s.following);
      if (next.has(channelId)) next.delete(channelId);
      else next.add(channelId);
      return { following: next };
    }),
  isFollowing: (channelId) => get().following.has(channelId),
}));
