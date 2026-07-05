// NXlive 도메인 타입 — Step 2.8 확정 (승인된 UI 컴포넌트 props 기반)
export type GameKey =
  | 'maple' | 'dnf' | 'fc' | 'sudden' | 'blue' | 'kart' | 'mabi' | 'baram';

export interface Game {
  key: GameKey;
  name: string;
}

export interface Channel {
  id: string;
  name: string;          // 스트리머명
  followers: number;
  about: string;
  live: boolean;
  gameKey: GameKey;
}

export interface Live {
  id: string;            // = channelId 기준 라이브
  channelId: string;
  channelName: string;
  title: string;
  gameKey: GameKey;
  viewers: number;
  followers: number;
  category: string;      // 게임명 (표시용)
}

export interface Clip {
  id: string;
  channelId: string;
  channelName: string;
  title: string;
  gameKey: GameKey;
  views: number;
  duration: string;      // "01:24"
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  color?: string;
}
