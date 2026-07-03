import type { Game, Channel, Live, Clip, ChatMessage } from '@/types';

export const GAMES: Game[] = [
  { key: 'maple', name: '메이플스토리' },
  { key: 'dnf', name: '던전앤파이터' },
  { key: 'fc', name: 'FC ONLINE' },
  { key: 'sudden', name: '서든어택' },
  { key: 'blue', name: '블루 아카이브' },
  { key: 'kart', name: '카트라이더' },
  { key: 'mabi', name: '마비노기 모바일' },
];

export const gameName = (k: string): string =>
  GAMES.find((g) => g.key === k)?.name ?? k;

export const MOCK_LIVES: Live[] = [
  { id: 'ch-ranger', channelId: 'ch-ranger', channelName: '김레인저', title: '신규 보스 세계 최초 클리어 도전', gameKey: 'maple', viewers: 42180, followers: 214000, category: '메이플스토리' },
  { id: 'ch-courtney', channelId: 'ch-courtney', channelName: '코트니', title: '랭커 매치 · 감독 모드 실시간 공략', gameKey: 'fc', viewers: 18902, followers: 89000, category: 'FC ONLINE' },
  { id: 'ch-dnfmaster', channelId: 'ch-dnfmaster', channelName: '던파장인', title: '레기온 레이드 실시간 트라이', gameKey: 'dnf', viewers: 14510, followers: 121000, category: '던전앤파이터' },
  { id: 'ch-starnight', channelId: 'ch-starnight', channelName: '별밤', title: '신규 이벤트 풀 클리어 방송', gameKey: 'blue', viewers: 7720, followers: 63000, category: '블루 아카이브' },
  { id: 'ch-booster', channelId: 'ch-booster', channelName: '부스터', title: '스피드 개인전 티어 결정전', gameKey: 'kart', viewers: 9430, followers: 45000, category: '카트라이더' },
  { id: 'ch-headshot', channelId: 'ch-headshot', channelName: '헤드샷', title: '클랜전 실시간 중계', gameKey: 'sudden', viewers: 6110, followers: 50000, category: '서든어택' },
  { id: 'ch-bard', channelId: 'ch-bard', channelName: '음유시인', title: '신규 지역 탐험', gameKey: 'mabi', viewers: 5240, followers: 38000, category: '마비노기 모바일' },
];

export const MOCK_CHANNELS: Channel[] = MOCK_LIVES.map((l) => ({
  id: l.channelId,
  name: l.channelName,
  followers: l.followers,
  about: `${l.category} 전문 스트리머 ${l.channelName} 입니다. 매일 저녁 방송으로 찾아뵙습니다.`,
  live: true,
  gameKey: l.gameKey,
}));

export const MOCK_CLIPS: Clip[] = [
  { id: 'clip-1', channelId: 'ch-ranger', channelName: '김레인저', title: '보스 마지막 페이즈 원킬 순간', gameKey: 'maple', views: 128000, duration: '00:58' },
  { id: 'clip-2', channelId: 'ch-courtney', channelName: '코트니', title: '역전 결승골 하이라이트', gameKey: 'fc', views: 74300, duration: '01:12' },
  { id: 'clip-3', channelId: 'ch-dnfmaster', channelName: '던파장인', title: '레이드 노데스 클리어', gameKey: 'dnf', views: 65200, duration: '02:04' },
  { id: 'clip-4', channelId: 'ch-booster', channelName: '부스터', title: '마지막 랩 인코스 역전', gameKey: 'kart', views: 51900, duration: '00:47' },
  { id: 'clip-5', channelId: 'ch-starnight', channelName: '별밤', title: '이벤트 최속 클리어 기록', gameKey: 'blue', views: 42100, duration: '01:33' },
  { id: 'clip-6', channelId: 'ch-headshot', channelName: '헤드샷', title: '1대4 클러치 라운드', gameKey: 'sudden', views: 38800, duration: '00:39' },
];

const CHAT_USERS = ['방구석고수', '메린이', '길드장', '뉴비123', '고인물', '치킨각', '롱런시청자', '별빛나라', '콤보장인', '오늘첫방'];
const CHAT_TEXTS = [
  'ㅋㅋㅋㅋ 미쳤다', '이번 판 각 나오는데?', 'GG', '와 이걸 잡네', '오늘 폼 미쳤음',
  '팔로우하고 갑니다', '해설 좋아요', '이거 어케함?', '가즈아', '개잘한다 진짜',
  '방송 존잼', '다음 판 기대', '컨트롤 뭐지', '역대급 각', '집중',
];

export function makeChatMessage(seed: number): ChatMessage {
  const u = CHAT_USERS[seed % CHAT_USERS.length];
  const t = CHAT_TEXTS[(seed * 7) % CHAT_TEXTS.length];
  return { id: `m-${seed}-${(seed * 31) % 997}`, user: u, text: t };
}

export const INITIAL_CHAT: ChatMessage[] = Array.from({ length: 12 }, (_, i) => makeChatMessage(i));
