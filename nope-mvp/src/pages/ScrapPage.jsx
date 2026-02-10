import React, { useState } from "react";
import { useScrap } from "../state/ScrapContext.jsx";
import NewsCard from "../components/news/NewsCard.jsx";
import { useNavigate } from "react-router-dom";

export default function ScrapPage() {
  const navigate = useNavigate();
  const { scraps, toggleNews, togglePost } = useScrap();
  const [showAllPosts, setShowAllPosts] = useState(false);

  const handleNewsClick = (id) => navigate(`/news/${id}`);
  const handlePostClick = (id) => alert("MVP: 게시글 상세 페이지 연결 예정"); // Placeholder for post detail

  const sortedPosts = [...scraps.posts].sort((a, b) => b.createdAt - a.createdAt);
  const displayedPosts = showAllPosts ? sortedPosts : sortedPosts.slice(0, 3);

  const hasScraps = scraps.news.length > 0 || scraps.posts.length > 0;

  return (
    <div className="page">
      <div className="section-title">스크랩 페이지</div>

      {!hasScraps && (
        <p style={{ textAlign: "center", color: "var(--muted)", marginTop: "40px" }}>
          스크랩한 글이나 카드뉴스가 없습니다.
        </p>
      )}

      {/* 스크랩한 글 (커뮤니티 포스트) */}
      {scraps.posts.length > 0 && (
        <>
          <div className="section-title" style={{ marginTop: "20px" }}>스크랩한 글</div>
          <div className="grid">
            {displayedPosts.map((p) => (
              <div key={p.id} className="mini-card" onClick={() => handlePostClick(p.id)} style={{ cursor: "pointer" }}>
                <div className="row-between">
                  <div style={{ fontWeight: 900 }}>{p.title}</div>
                  <button className="pill-btn active-scrap" type="button" onClick={(e) => { e.stopPropagation(); togglePost(p); }} title="스크랩 해제">
                    해제
                  </button>
                </div>
                <div style={{ height: 8 }} />
                <div className="desc">{p.body}</div>
                <div style={{ height: 10 }} />
                <div className="row-between">
                  <div className="section-title">조회수 {p.views} · 댓글 {p.comments}</div>
                  <button className="pill-btn" type="button" onClick={(e) => { e.stopPropagation(); alert("MVP: 게시글 상세 페이지 연결 예정"); }}>
                    보기
                  </button>
                </div>
              </div>
            ))}
          </div>
          {sortedPosts.length > 3 && (
            <button
              className="primary-btn"
              type="button"
              onClick={() => setShowAllPosts(!showAllPosts)}
              style={{ width: "100%", marginTop: "14px" }}
            >
              {showAllPosts ? "간략히 보기" : "더보기"}
            </button>
          )}
        </>
      )}

      {/* 스크랩한 카드뉴스 */}
      {scraps.news.length > 0 && (
        <>
          <div className="section-title" style={{ marginTop: (scraps.posts.length > 0 ? "30px" : "20px") }}>스크랩한 카드뉴스</div>
          {scraps.news.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              onClick={() => handleNewsClick(item.id)}
              rightSlot={
                <button
                  className="pill-btn active-scrap"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleNews(item);
                  }}
                  title="스크랩 해제"
                >
                  해제
                </button>
              }
            />
          ))}
        </>
      )}
    </div>
  );
}