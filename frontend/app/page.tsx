import Link from 'next/link';
import { getLives, getRanking } from '@/services/liveService';
import HomeLives from '@/components/HomeLives';
import { fmtCount as fmt } from '@/lib/format';

export default async function HomePage() {
  const [lives, ranked] = await Promise.all([getLives(), getRanking()]);
  const featured = ranked[0];
  const totalViewers = lives.reduce((s, l) => s + l.viewers, 0);

  return (
    <>
      {/* 다크 히어로 밴드 */}
      <section className="home-dark">
        <div className="in">
          <Link href={`/live/${featured.channelId}`} className="hero">
            <div className={`art g-${featured.gameKey}`} />
            <div className="bar" />
            <span className="live-badge"><span className="livedot" />LIVE</span>
            <span className="views">👁 {fmt(featured.viewers)} 시청 중</span>
            <div className="cap">
              <div className="k">{featured.category.toUpperCase()} · 인기 라이브</div>
              <div className="t">{featured.title}</div>
              <div className="who"><span className="av" />{featured.channelName} · 팔로워 {fmt(featured.followers)}</div>
            </div>
          </Link>

          <div className="side">
            <div className="panel-dark">
              <h3><span className="livedot" /> 실시간 통계</h3>
              <div className="metric"><span className="l">동시 방송</span><span className="v cy">{lives.length.toLocaleString('ko-KR')}</span></div>
              <div className="metric"><span className="l">실시간 시청자</span><span className="v mag">{totalViewers.toLocaleString('ko-KR')}</span></div>
              <div className="metric"><span className="l">오늘 신규 클립</span><span className="v cy">3,912</span></div>
            </div>
            <div className="panel-dark">
              <h3>🔥 실시간 인기 랭킹</h3>
              {ranked.slice(0, 5).map((l, i) => (
                <Link key={l.id} href={`/live/${l.channelId}`} className="rankrow">
                  <span className="rn">{i + 1}</span>
                  <span className={`rt g-${l.gameKey}`} />
                  <span className="ri"><span className="t">{l.title}</span><span className="m">{l.channelName} · {l.category}</span></span>
                  <span className="vn">{fmt(l.viewers)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 라이트 카드 그리드 */}
      <main className="page">
        <div className="sect"><h2>지금 라이브</h2><span className="count">{lives.length}개 방송 중</span></div>
        <HomeLives lives={lives} />
      </main>
    </>
  );
}
