import React from "react";

export default function CategoryChips({ items, selectedId, onSelect }) {
  return (
    <div className="chips" aria-label="카테고리 필터">
      {items.map((c) => (
        <button
          key={c.id}
          className={`chip ${selectedId === c.id ? "selected" : ""}`}
          onClick={() => onSelect(c.id)}
          type="button"
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}