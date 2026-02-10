import React from "react";

const tabs = [
  { key: "news", label: "정보뉴스", icon: "📰" },
  { key: "chat", label: "챗봇", icon: "💬" },
  { key: "community", label: "커뮤니티", icon: "👥" },
  { key: "scrap", label: "스크랩", icon: "⭐" },
  { key: "my", label: "내 정보", icon: "👤" },
];

export default function BottomTabBar({ activeTab, onChange }) {
  return (
    <div className="bottom-tab">
      {tabs.map((t) => (
        <div
          key={t.key}
          className={`tab ${activeTab === t.key ? "active" : ""}`}
          onClick={() => onChange(t.key)}
          role="button"
          tabIndex={0}
        >
          <div className="dot" aria-hidden="true">{t.icon}</div>
          <div>{t.label}</div>
        </div>
      ))}
    </div>
  );
}