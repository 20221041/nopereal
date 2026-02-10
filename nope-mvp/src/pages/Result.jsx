import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RESULT_DEFS } from "../data/results";

const ui = {
  page: { minHeight: "100vh", background: "#F5F7FF", padding: 20 },
  wrap: { maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 },
  card: { background: "#fff", borderRadius: 18, padding: 16, border: "1px solid #E6ECFF" },
  center: { textAlign: "center" },
  sticker: {
    width: 86,
    height: 86,
    borderRadius: 22,
    background: "#E8EDFF",
    display: "grid",
    placeItems: "center",
    margin: "0 auto",
  },
  headline: (accent) => ({ fontSize: 28, fontWeight: 900, color: accent, textAlign: "center", marginTop: 6 }),
  sub: { color: "#617086", textAlign: "center", marginTop: 4 },
  summary: { color: "#617086", textAlign: "center", lineHeight: 1.4, marginTop: 8 },
  tagRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10, justifyContent: "center" },
  tag: { background: "#E8EDFF", padding: "6px 10px", borderRadius: 999, fontWeight: 700, fontSize: 12 },
  h: { fontSize: 16, fontWeight: 900, color: "#1E2A3A" },
  bullet: { marginTop: 8, color: "#1E2A3A", lineHeight: 1.45 },
  btnSolid: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 999,
    border: "1px solid #5B7CFF",
    background: "#5B7CFF",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
  },
  btnOutline: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 999,
    border: "1px solid #B9C7FF",
    background: "#fff",
    color: "#1E2A3A",
    fontWeight: 800,
    cursor: "pointer",
  },
  simRow: { display: "flex", gap: 12, alignItems: "flex-start", justifyContent: "space-between" },
  simRight: { display: "flex", gap: 10 },
  iconBtn: { width: 44, height: 44, borderRadius: 14, background: "#E8EDFF", display: "grid", placeItems: "center", cursor: "pointer" },
};

export default function Result() {
  const nav = useNavigate();

  const payload = useMemo(() => {
    const raw = sessionStorage.getItem("precheck_payload");
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }, []);

  const out = payload?.out;
  const key = out?.primary || "SAFE_WHITE";
  const secondaryKey = out?.secondary;
  const score = out?.score ?? 22;
  const tags = out?.reasonTags ?? ["샘플"];

  const primary = RESULT_DEFS[key] || RESULT_DEFS.SAFE_WHITE;
  const secondary = secondaryKey ? RESULT_DEFS[secondaryKey] : null;

  const stickerEmoji = primary?.sticker?.emoji || "🛡️";
  const stickerAlt = primary?.sticker?.alt || "결과 스티커";

  return (
    <div style={ui.page}>
      <div style={ui.wrap}>
        <div style={ui.center}>
          <div style={{ fontWeight: 900, fontSize: 18, color: "#1E2A3A" }}>{primary.title}</div>
          <div style={ui.sub}>{primary.subtitle}</div>
        </div>

        <div style={ui.sticker} aria-label={stickerAlt} title={stickerAlt}>
          <span style={{ fontSize: 30, lineHeight: 1 }}>{stickerEmoji}</span>
        </div>

        <div style={ui.headline(primary.accent)}>{primary.headline}</div>
        <div style={ui.summary}>{primary.summary}</div>

        <div style={ui.card}>
          <div style={{ color: "#617086", fontSize: 12 }}>취약도 점수</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#1E2A3A", marginTop: 6 }}>{score} / 100</div>

          <div style={ui.tagRow}>
            {tags.slice(0, 6).map((t) => (
              <div key={t} style={ui.tag}>{t}</div>
            ))}
          </div>

          {secondary ? (
            <div style={{ marginTop: 12 }}>
              <div style={{ color: "#617086", fontSize: 12 }}>함께 주의할 유형</div>
              <div style={{ fontWeight: 900, marginTop: 4, color: "#1E2A3A" }}>{secondary.headline}</div>
            </div>
          ) : null}
        </div>

        <div style={ui.card}>
          <div style={ui.h}>보피피해 진단</div>
          <div style={{ color: "#617086", marginTop: 6 }}>아래 체크리스트를 따라 즉시 행동을 정리하세요.</div>
          <div style={{ marginTop: 10 }}>
            {primary.guidance.map((g, idx) => (
              <div key={idx} style={ui.bullet}>• {g}</div>
            ))}
          </div>
        </div>

        <div style={ui.card}>
          <div style={ui.h}>시뮬레이션</div>
          <div style={{ marginTop: 10, ...ui.simRow }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900, color: "#1E2A3A" }}>{primary.simulation.name}</div>
              <div style={{ color: "#617086", marginTop: 2 }}>{primary.simulation.phone}</div>
              <div style={{ color: "#617086", marginTop: 8, lineHeight: 1.4 }}>{primary.simulation.script}</div>
            </div>

            <div style={ui.simRight}>
              <div
                style={ui.iconBtn}
                onClick={() => {
                  const phone = primary.simulation.phone;
                  if (/^\d+$/.test(phone) || phone.includes("-")) window.location.href = `tel:${phone.replaceAll("-", "")}`;
                  else alert("전화번호가 저장된 번호/문자열이면 실제 전화 연결 대신 안내만 표시합니다.");
                }}
                title="전화"
              >
                📞
              </div>
              <div
                style={ui.iconBtn}
                onClick={() => alert("예시: 신고/상담 플로우로 연결")}
                title="보호"
              >
                🛡️
              </div>
            </div>
          </div>
        </div>

        <button style={ui.btnSolid} onClick={() => nav("/precheck")}>다시 검사하기</button>
        <button style={ui.btnOutline} onClick={() => nav("/mypage")}>내 정보로</button>
      </div>
    </div>
  );
}
