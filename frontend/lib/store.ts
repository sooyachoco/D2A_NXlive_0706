'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 팔로우 상태 (Mock — 로컬 전용, 인증 없음)
// localStorage 지속: Set 은 JSON 직렬화가 안 되므로 replacer/reviver 로 배열 변환
interface FollowState {
  following: Set<string>;
  toggle: (channelId: string) => void;
  isFollowing: (channelId: string) => boolean;
}

export const useFollowStore = create<FollowState>()(
  persist(
    (set, get) => ({
      following: new Set<string>(),
      toggle: (channelId) =>
        set((s) => {
          const next = new Set(s.following);
          if (next.has(channelId)) next.delete(channelId);
          else next.add(channelId);
          return { following: next };
        }),
      isFollowing: (channelId) => get().following.has(channelId),
    }),
    {
      name: 'nxlive-following',
      storage: createJSONStorage(() => localStorage, {
        replacer: (_key, value) =>
          value instanceof Set ? { __set: Array.from(value) } : value,
        reviver: (_key, value) =>
          value && typeof value === 'object' && '__set' in (value as object)
            ? new Set((value as { __set: string[] }).__set)
            : value,
      }),
    }
  )
);
