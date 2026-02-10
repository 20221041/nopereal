import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/mock.js";
import { useCommunity } from "../state/CommunityContext.jsx";

export default function WritePostPage() {
  const navigate = useNavigate();
  const { addPost } = useCommunity();

  // "…" 같은 more 제외
  const boardOptions = useMemo(() => categories.filter((c) => c.id !== "more"), []);

  const [categoryId, setCategoryId] = useState(boardOptions[0]?.id ?? "voice");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const canSubmit = title.trim().length >= 2 && body.trim().length >= 5;

  const handleSubmit = () => {
    if (!canSubmit) return;
    addPost({
      categoryId,
      title: title.trim(),
      body: body.trim(),
    });
    navigate("/community");
  };

  return (
    <div className="page">
      <div className="section-title">글쓰기</div>

      <div className="mini-card">
        <div className="kv">
          <div className="k">게시판 선택</div>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="pill-btn"
            style={{ height: 40 }}
          >
            {boardOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ height: 12 }} />

        <div className="section-title">제목</div>
        <input
          className="search"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요 (2자 이상)"
        />

        <div style={{ height: 12 }} />

        <div className="section-title">내용</div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="상황을 간단히 적어주세요 (5자 이상)"
          style={{
            width: "100%",
            minHeight: 160,
            borderRadius: 18,
            border: "1px solid var(--line)",
            padding: 14,
            background: "rgba(255,255,255,.85)",
            resize: "vertical",
            outline: "none",
          }}
        />

        <div style={{ height: 14 }} />

        <div className="row-between">
          <button className="pill-btn" type="button" onClick={() => navigate(-1)}>
            취소
          </button>
          <button className="primary-btn" type="button" onClick={handleSubmit} disabled={!canSubmit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}