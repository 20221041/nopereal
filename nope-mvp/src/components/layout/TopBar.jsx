import React from "react";

function Icon({ name }) {
  // 심플 라인 아이콘(의존성 없이)
  const common = { width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

  if (name === "search") {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7"></circle>
        <path d="M20 20l-3.5-3.5"></path>
      </svg>
    );
  }
  if (name === "bell") {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7"></path>
        <path d="M13.73 21a2 2 0 01-3.46 0"></path>
      </svg>
    );
  }
  return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M12 2l9 4v6c0 5-3.8 9.4-9 10-5.2-.6-9-5-9-10V6l9-4z"></path>
      <path d="M12 8v5"></path>
      <path d="M12 16h.01"></path>
    </svg>
  );
}

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="brand">
        <div className="logo">NOPE</div>
      </div>

      <div className="icon-row">
        <button className="icon-btn" aria-label="주의">
          <span className="badge-dot" />
        </button>
        <button className="icon-btn" aria-label="검색">
          <Icon name="search" />
        </button>
        <button className="icon-btn" aria-label="알림">
          <Icon name="bell" />
        </button>
      </div>
    </div>
  );
}