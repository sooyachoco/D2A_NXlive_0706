'use client';
import { useEffect, useRef, useState } from 'react';
import type { Live, Channel, ChatMessage } from '@/types';
import { INITIAL_CHAT, makeChatMessage } from '@/mocks/data';
import { useFollowStore } from '@/lib/store';
import { fmtCount as fmt } from '@/lib/format';

export default function LiveWatch({ live, channel }: { live: Live; channel: Channel }) {
  const [viewers, setViewers] = useState(live.viewers);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [input, setInput] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);
  const seedRef = useRef(INITIAL_CHAT.length);

  const following = useFollowStore((s) => s.following.has(channel.id));
  const toggle = useFollowStore((s) => s.toggle);

  // 시청자 수 시뮬레이션 (실제 WebSocket 대체 — Mock)
  useEffect(() => {
    const t = setInterval(() => {
      setViewers((v) => Math.max(0, v + Math.floor((Math.sin(Date.now() / 900) * 40))));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  // 채팅 자동 유입 시뮬레이션 (Mock)
  useEffect(() => {
    const t = setInterval(() => {
      setMessages((prev) => {
        const next = [...prev, makeChatMessage(seedRef.current++)];
        return next.slice(-60);
      });
    }, 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: `me-${seedRef.current++}`, user: '나', text }].slice(-60));
    setInput('');
  };

  return (
    <main className="page">
      <div className="watch">
        <div>
          {/* 플레이어 (Mock 플레이스홀더) */}
          <div className="player">
            <div className={`art g-${live.gameKey}`} />
            <span className="live-badge"><span className="livedot" />LIVE</span>
            <div className="ctrl">
              <div className="play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><polygon points="6 4 20 12 6 20 6 4" /></svg>
              </div>
              <div className="ph">Mock 플레이어 — 실제 영상은 후속 HLS/CDN 연동</div>
            </div>
          </div>

          {/* 메타 */}
          <div className="meta">
            <div className="title">{live.title}</div>
            <div className="row">
              <span className={`av g-${channel.gameKey}`} />
              <div>
                <div className="cn">{channel.name}</div>
                <div className="fo">팔로워 {fmt(channel.followers)}</div>
              </div>
              <div className="spacer">
                <span className="viewers"><span className="livedot" style={{ background: '#d84141' }} /> {fmt(viewers)} 시청 중</span>
                <button className={`btn ${following ? 'btn-outline' : 'btn-primary'}`} onClick={() => toggle(channel.id)}>
                  {following ? '팔로잉' : '+ 팔로우'}
                </button>
              </div>
            </div>
            <span className="cat">{live.category}</span>
          </div>
        </div>

        {/* 채팅 */}
        <div className="chat">
          <div className="head"><span className="livedot" style={{ background: '#d84141' }} /> 실시간 채팅</div>
          <div className="body" ref={bodyRef}>
            {messages.map((m) => (
              <div className="msg" key={m.id}>
                <span className="u">{m.user}</span><span className="x">{m.text}</span>
              </div>
            ))}
          </div>
          <div className="foot">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
              placeholder="채팅에 참여하기"
              aria-label="채팅 입력"
            />
            <button onClick={send}>전송</button>
          </div>
        </div>
      </div>
    </main>
  );
}
