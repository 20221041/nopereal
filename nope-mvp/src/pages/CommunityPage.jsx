import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, communityPosts } from "../data/mock.js";
import CategoryChips from "../components/news/CategoryChips.jsx";
import { useScrap } from "../state/ScrapContext.jsx";
import { useCommunity } from "../state/CommunityContext.jsx";

export default function CommunityPage() {
  const navigate = useNavigate();
  const { posts } = useCommunity();
  const [selectedCategoryId, setSelectedCategoryId] = useState("voice");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest");

  const scrapApi = useScrap();
  const { togglePost, hasPost } = scrapApi;

  const items = useMemo(() => {
    let list = posts
      .filter((p) => (selectedCategoryId === "more" ? true : p.categoryId === selectedCategoryId))
      .filter((p) => {
        if (!query.trim()) return true;
        const q = query.trim().toLowerCase();
        return (p.title + " " + p.body).toLowerCase().includes(q);
      });

    if (sort === "popular") list = [...list].sort((a, b) => (b.views + b.comments) - (a.views + a.comments));
    else list = [...list];

    return list;
  }, [posts, selectedCategoryId, query, sort]);

  return (
    <div className="page" style={{ position: "relative" }}>
      <div className="section-title">커뮤니티</div>

      <CategoryChips items={categories} selectedId={selectedCategoryId} onSelect={setSelectedCategoryId} />

      <div className="search-row">
        <button className="pill-btn" type="button" onClick={() => setSort(sort === "latest" ? "popular" : "latest")}>
          {sort === "latest" ? "최신순" : "인기순"}
        </button>
        <input className="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="게시글 검색" />
      </div>

      <div className="grid">
        {items.map((p) => (
          <div key={p.id} className="mini-card">
            <div className="row-between">
              <div style={{ fontWeight: 900 }}>{p.title}</div>
              <button className={`pill-btn ${hasPost(p.id) ? 'active-scrap' : ''}`} type="button" onClick={() => togglePost(p)} title="스크랩 토글">
                {hasPost(p.id) ? "해제" : "스크랩"}
              </button>
            </div>
            <div style={{ height: 8 }} />
            <div className="desc">{p.body}</div>
            <div style={{ height: 10 }} />
            <div className="row-between">
              <div className="section-title">조회수 {p.views} · 댓글 {p.comments}</div>
              <button className="pill-btn" type="button" onClick={() => alert("MVP: 게시글 상세 페이지 연결 예정")}>
                보기
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="fab"
        type="button"
        aria-label="글쓰기"
        onClick={() => navigate("/community/write")}
      >
        +
      </button>
    </div>
  );
}