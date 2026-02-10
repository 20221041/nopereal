import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, newsItems } from "../data/mock.js";
import CategoryChips from "../components/news/CategoryChips.jsx";
import NewsCard from "../components/news/NewsCard.jsx";
import { useScrap } from "../state/ScrapContext.jsx";

export default function NewsPage() {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState("romance");
  const [query, setQuery] = useState("");
  const { toggleNews, hasNews } = useScrap();

  const filtered = useMemo(() => {
    return newsItems
      .filter((n) => (selectedCategoryId === "more" ? true : n.categoryId === selectedCategoryId))
      .filter((n) => {
        if (!query.trim()) return true;
        const q = query.trim().toLowerCase();
        return (n.title + " " + n.desc + " " + n.tag).toLowerCase().includes(q);
      });
  }, [selectedCategoryId, query]);

  const goDetail = (id) => navigate(`/news/${id}`);

  return (
    <div className="page">
      <div className="section-title">정보뉴스</div>

      <CategoryChips
        items={categories}
        selectedId={selectedCategoryId}
        onSelect={setSelectedCategoryId}
      />

      <div className="search-row">
        <input
          className="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="키워드로 검색"
        />
        <button className="pill-btn" type="button" onClick={() => setQuery("")}>
          초기화
        </button>
      </div>

      {filtered.map((item) => (
        <NewsCard
          key={item.id}
          item={item}
          onClick={goDetail}
          rightSlot={
            <button
              className={`pill-btn ${hasNews(item.id) ? 'active-scrap' : ''}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleNews(item);
              }}
              title="스크랩 토글"
            >
              {hasNews(item.id) ? "해제" : "스크랩"}
            </button>
          }
        />
      ))}

      <div className="banner">
        <div>
          <div style={{ fontSize: 14, opacity: 0.9 }}>오늘의 주의 메시지</div>
          <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>사기 주의보</div>
        </div>
        <button
          className="cta"
          type="button"
          onClick={() => navigate("/alert")}
        >
          확인하기
        </button>
      </div>
    </div>
  );
}
