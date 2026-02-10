// src/pages/NewsDetailPage.jsx
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newsDetailById } from "../data/newsDetail";

const TABS = [
  { key: "definition", label: "정의" },
  { key: "prevention", label: "예방 수칙" },
  { key: "response", label: "대처 방법" },
];

export default function NewsDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // /news/:id
  const [activeTab, setActiveTab] = useState("definition");

  const detail = useMemo(() => newsDetailById[id], [id]);

  if (!detail) {
    return (
      <div className="page">
        <TopBar title="정보뉴스" onBack={() => navigate(-1)} />
        <div className="mini-card" style={{ marginTop: 12 }}>
          해당 글을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  const tabData = detail.tabs[activeTab];

  return (
    <div className="page" style={{ paddingBottom: 84 }}>
      <TopBar title="정보뉴스" onBack={() => navigate(-1)} />

      <div style={{ marginTop: 10 }}>
        <div style={{ color: "rgba(0,0,0,.55)", fontSize: 13 }}>
          {detail.subTag}
        </div>
        <div style={{ fontSize: 20, lineHeight: 1.25, marginTop: 6 }}>
          {detail.headerTitle}
        </div>
      </div>

      <SegmentTabs value={activeTab} onChange={setActiveTab} />

      {detail.heroImageUrl ? (
        <div className="mini-card" style={{ padding: 10 }}>
          <img
            src={detail.heroImageUrl}
            alt=""
            style={{
              width: "100%",
              borderRadius: 14,
              display: "block",
            }}
          />
        </div>
      ) : null}

      <div style={{ marginTop: 14 }}>
        {activeTab === "definition" && (
          <DefinitionSection data={tabData} />
        )}

        {activeTab === "prevention" && (
          <PreventionSection data={tabData} />
        )}

        {activeTab === "response" && (
          <ResponseSection data={tabData} />
        )}
      </div>
    </div>
  );
}

function TopBar({ title, onBack }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "var(--bg, #fff)",
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: "1px solid rgba(0,0,0,.06)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "36px 1fr 36px",
          alignItems: "center",
        }}
      >
        <button
          onClick={onBack}
          style={iconBtnStyle()}
          aria-label="back"
          title="back"
        >
          ←
        </button>

        <div style={{ textAlign: "center", fontSize: 15 }}>{title}</div>

        <div />
      </div>
    </div>
  );
}

function SegmentTabs({ value, onChange }) {
  return (
    <div
      className="mini-card"
      style={{
        marginTop: 12,
        padding: 6,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 6,
      }}
    >
      {TABS.map((t) => {
        const active = value === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            style={{
              border: "1px solid rgba(0,0,0,.08)",
              background: active ? "rgba(90, 110, 255, .12)" : "transparent",
              color: active ? "var(--primary)" : "rgba(0,0,0,.7)",
              borderRadius: 12,
              padding: "10px 8px",
              fontSize: 13,
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function DefinitionSection({ data }) {
  return (
    <>
      <div style={sectionTitleStyle()}>{data.title}</div>

      <div className="mini-card" style={{ padding: 14 }}>
        {data.body?.map((p, idx) => (
          <div
            key={idx}
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "rgba(0,0,0,.78)",
              marginBottom: idx === data.body.length - 1 ? 0 : 10,
            }}
          >
            {p}
          </div>
        ))}
      </div>

      <div style={{ ...sectionTitleStyle(), marginTop: 14 }}>
        수법 유형 예시
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 10,
        }}
      >
        {data.typeCards?.map((c, idx) => (
          <div key={idx} className="mini-card" style={{ padding: 12 }}>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,.55)" }}>
              {c.label}
            </div>
            <div style={{ marginTop: 6, fontSize: 15 }}>{c.title}</div>
            {c.desc ? (
              <div
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: "rgba(0,0,0,.7)",
                }}
              >
                {c.desc}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}

function PreventionSection({ data }) {
  return (
    <>
      <div style={sectionTitleStyle()}>{data.title}</div>

      <div className="mini-card" style={{ padding: 14 }}>
        {data.bullets?.map((b, idx) => (
          <div
            key={idx}
            style={{
              display: "grid",
              gridTemplateColumns: "18px 1fr",
              gap: 8,
              alignItems: "start",
              padding: "8px 0",
              borderTop: idx === 0 ? "none" : "1px solid rgba(0,0,0,.06)",
            }}
          >
            <div style={{ color: "var(--primary)", fontSize: 14 }}>•</div>
            <div style={{ fontSize: 14, lineHeight: 1.55 }}>{b}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ResponseSection({ data }) {
  return (
    <>
      <div style={sectionTitleStyle()}>{data.title}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 10,
        }}
      >
        {data.keyCards?.map((k, idx) => (
          <div key={idx} className="mini-card" style={{ padding: 12 }}>
            <div style={{ fontSize: 15 }}>{k.title}</div>
            <div
              style={{
                marginTop: 6,
                fontSize: 13,
                lineHeight: 1.45,
                color: "rgba(0,0,0,.7)",
              }}
            >
              {k.desc}
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...sectionTitleStyle(), marginTop: 14 }}>
        단계별 안내
      </div>

      <div className="mini-card" style={{ padding: 14 }}>
        {data.steps?.map((s, idx) => (
          <div
            key={idx}
            style={{
              padding: "10px 0",
              borderTop: idx === 0 ? "none" : "1px solid rgba(0,0,0,.06)",
            }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "start" }}>
              <div
                style={{
                  minWidth: 22,
                  height: 22,
                  borderRadius: 999,
                  background: "rgba(90, 110, 255, .12)",
                  color: "var(--primary)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                {idx + 1}
              </div>
              <div>
                <div style={{ fontSize: 14, lineHeight: 1.45 }}>{s.title}</div>
                {s.desc ? (
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "rgba(0,0,0,.7)",
                    }}
                  >
                    {s.desc}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10, color: "rgba(0,0,0,.55)", fontSize: 12 }}>
        안내는 판단을 돕기 위한 정보이며, 상황에 따라 확인 경로가 달라질 수 있습니다.
      </div>
    </>
  );
}

function sectionTitleStyle() {
  return {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  };
}

function iconBtnStyle() {
  return {
    width: 34,
    height: 34,
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,.08)",
    background: "transparent",
    cursor: "pointer",
  };
}