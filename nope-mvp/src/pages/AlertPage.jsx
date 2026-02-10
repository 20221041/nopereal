import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { communityPosts, newsItems } from "../data/mock.js";

export default function AlertPage() {
  const navigate = useNavigate();

  const today = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  }, []);

  const topNews = useMemo(() => {
    // featured 우선 + 최신 느낌으로 상단 3개
    // (mock.js에 featured 필드가 없으므로, 일단 모든 newsItems에서 상위 3개만 가져오도록 수정)
    return [...newsItems].slice(0, 3);
  }, [newsItems]); // newsItems를 의존성 배열에 추가

  const hotPosts = useMemo(() => {
    // 조회수+댓글 높은 글 3개
    return [...communityPosts]
      .sort((a, b) => (b.views + b.comments) - (a.views + a.comments))
      .slice(0, 3);
  }, [communityPosts]); // communityPosts를 의존성 배열에 추가

  return (
    <div className="page">
      <div className="section-title">사기 주의보</div>

      {/* 헤더 카드 */}
      <div className="card" style={{ padding: 16 }}>
        <div className="row-between">
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{today} 기준</div>
            <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>
              오늘 주의해야 할 접근 유형
            </div>
            <div style={{ marginTop: 8, color: "var(--muted)", fontSize: 14, lineHeight: 1.5 }}>
              통화·문자·DM 등 어떤 채널이든 “지금 바로 처리”와 “비밀 유지”를 요구하면
              일단 멈추고 확인하세요.
            </div>
          </div>

          <button className="pill-btn" type="button" onClick={() => navigate(-1)}>
            뒤로
          </button>
        </div>

        <div style={{ height: 12 }} />

        <div className="kv">
          <div className="k">핵심 신호</div>
          <div className="v">시간 압박 · 비밀 유지 · 금전/인증 요구</div>
        </div>
        <div className="kv">
          <div className="k">권장 행동</div>
          <div className="v">끊기 → 공식 번호 확인 → 증거 저장</div>
        </div>
      </div>

      <div style={{ height: 12 }} />

      {/* 카테고리별 경고 */}
      <div className="mini-card">
        <div style={{ fontWeight: 900, marginBottom: 10 }}>유형별 주의 포인트</div>

        <div className="kv">
          <div className="k">보이스피싱</div>
          <div className="v">기관 사칭 + 즉시 조치 요구 시 통화 종료 후 재확인</div>
        </div>
        <div className="kv">
          <div className="k">불법 링크(스미싱)</div>
          <div className="v">링크 클릭 대신 공식 앱/사이트에서 직접 조회</div>
        </div>
        <div className="kv">
          <div className="k">로맨스 스캠</div>
          <div className="v">영상통화 회피 + 금전 얘기 시작되면 즉시 거리두기</div>
        </div>
        <div className="kv">
          <div className="k">투자 스캠</div>
          <div className="v">고수익·단기 수익 강조 + 단톡방 유도는 의심</div>
        </div>
      </div>

      <div style={{ height: 12 }} />

      {/* 즉시 행동 가이드 */}
      <div className="mini-card">
        <div style={{ fontWeight: 900, marginBottom: 10 }}>지금 당장 할 수 있는 3가지</div>

        <div className="kv">
          <div className="k">1</div>
          <div className="v">통화/대화 종료 후 공식 채널로 다시 확인</div>
        </div>
        <div className="kv">
          <div className="k">2</div>
          <div className="v">대화 내용 캡처·통화 기록 등 증거 저장</div>
        </div>
        <div className="kv">
          <div className="k">3</div>
          <div className="v">혼자 판단하지 말고 가족/지인에게 공유</div>
        </div>

        <div style={{ height: 12 }} />
        <div className="row-between">
          <button className="pill-btn" type="button" onClick={() => navigate("/chat")}>
            상황 점검하기
          </button>
          <button className="primary-btn" type="button" onClick={() => navigate("/community")}>
            유사 사례 보기
          </button>
        </div>
      </div>

      <div style={{ height: 12 }} />

      {/* 오늘의 추천 뉴스 */}
      <div className="mini-card">
        <div className="row-between">
          <div style={{ fontWeight: 900 }}>오늘의 추천 정보</div>
          <button className="pill-btn" type="button" onClick={() => navigate("/news")}>
            뉴스로
          </button>
        </div>

        <div style={{ height: 10 }} />
        {topNews.map((n) => (
          <div key={n.id} className="kv" style={{ cursor: "pointer" }} onClick={() => navigate(`/news/${n.id}`)}>
            <div>
              <div className="k">{n.tag}</div>
              <div className="v">{n.title}</div>
            </div>
            <div style={{ color: "var(--muted)" }}>›</div>
          </div>
        ))}
      </div>

      <div style={{ height: 12 }} />

      {/* 커뮤니티 핫 글 */}
      <div className="mini-card">
        <div className="row-between">
          <div style={{ fontWeight: 900 }}>커뮤니티 실시간 반응</div>
          <button className="pill-btn" type="button" onClick={() => navigate("/community")}>
            커뮤니티로
          </button>
        </div>

        <div style={{ height: 10 }} />
        {hotPosts.map((p) => (
          <div key={p.id} className="kv">
            <div>
              <div className="k">조회수 {p.views} · 댓글 {p.comments}</div>
              <div className="v">{p.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 10 }} />
    </div>
  );
}