import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const nav = useNavigate();

  const user = {
    name: "DACON",
    posts: 45,
    comments: 79,
    friends: 136,
  };

  return (
    <div style={s.page}>
      {/* Profile */}
      <div style={s.profileRow}>
        <div style={s.profileAvatar}>
          <span style={{ fontSize: 22, color: "#6B7CFF" }}>✋</span>
        </div>

        <button style={s.profileNameBtn} onClick={() => alert("프로필/개인정보로 이동")}>
          <span style={s.profileName}>{user.name}</span>
          <span style={s.profileSuffix}>님</span>
          <span style={s.profileArrow}>›</span>
        </button>
      </div>

      {/* Stats card */}
      <div style={s.statsCard}>
        <div style={s.statCol}>
          <div style={s.statLabel}>올린 게시물</div>
          <div style={s.statValue}>
            {user.posts} <span style={s.statUnit}>개</span>
          </div>
        </div>

        <div style={s.vLine} />

        <div style={s.statCol}>
          <div style={s.statLabel}>단 댓글</div>
          <div style={s.statValue}>
            {user.comments} <span style={s.statUnit}>개</span>
          </div>
        </div>

        <div style={s.vLine} />

        <div style={s.statCol}>
          <div style={s.statLabel}>나의 친구</div>
          <div style={s.statValue}>
            {user.friends} <span style={s.statUnit}>명</span>
          </div>
        </div>
      </div>

      {/* Big circle CTAs */}
      <div style={s.ctaRow}>
        <div style={s.ctaBlock}>
          <button style={s.circleBtn} onClick={() => nav("/precheck")}>
            <div style={s.circleInnerText}>피싱예방을 위한{"\n"}사전검사</div>
            <div style={s.circleArrow}>›</div>
          </button>
          <div style={s.ctaDesc}>
            이용자 님의 상황을 바탕으로{"\n"}
            피해 입기 쉬운 피싱 유형을{"\n"}
            진단해드려요.
          </div>
        </div>

        <div style={s.ctaBlock}>
          <button style={s.circleBtn} onClick={() => nav("/result")}>
            <div style={s.circleInnerText}>검사내역{"\n"}확인</div>
            <div style={s.circleArrow}>›</div>
          </button>
          <div style={s.ctaDesc}>
            이용자 님이 주의하시면 좋을{"\n"}
            피싱 유형과 정보를 알려드려요.
          </div>
        </div>
      </div>

      {/* List */}
      <div style={s.list}>
        <ListRow label="개인정보 변경" onClick={() => alert("개인정보 변경")} />
        <ListRow label="이용약관" onClick={() => alert("이용약관")} />
      </div>
    </div>
  );
}

function ListRow({ label, onClick }) {
  return (
    <button style={s.listRow} onClick={onClick}>
      <span style={s.listText}>{label}</span>
      <span style={s.listArrow}>›</span>
    </button>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
    paddingBottom: 73, // 탭바 공간
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Apple SD Gothic Neo, sans-serif",
  },

  profileRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 15px 7px",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 999,
    background: "#EEF2FF",
    display: "grid",
    placeItems: "center",
  },
  profileNameBtn: {
    display: "flex",
    alignItems: "baseline",
    gap: 7,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
  },
  profileName: { fontSize: 34, fontWeight: 900, color: "#6B7CFF", lineHeight: 1 },
  profileSuffix: { fontSize: 15, fontWeight: 700, color: "#6B7CFF" },
  profileArrow: { fontSize: 22, color: "#6B7CFF", marginLeft: 3 },

  statsCard: {
    margin: "7px 15px 9px",
    padding: "12px 9px",
    borderRadius: 12,
    border: "1px solid #E8EAF1",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  statCol: { flex: 1, textAlign: "center" },
  statLabel: { color: "#5B5F6A", fontWeight: 700, fontSize: 15 },
  statValue: { color: "#6B7CFF", fontWeight: 900, fontSize: 24, marginTop: 9 },
  statUnit: { fontSize: 14, fontWeight: 800, marginLeft: 3 },

  vLine: { width: 1, background: "#E8EAF1", margin: "0 5px" },

  ctaRow: {
    display: "flex",
    justifyContent: "center",
    gap: 15,
    padding: "19px 15px 7px",
  },
  ctaBlock: { width: "50%", display: "flex", flexDirection: "column", alignItems: "center" },

  circleBtn: {
    width: 128,
    height: 128,
    borderRadius: 999,
    border: "12px solid #C9D1FF",
    background: "#7C86FF",
    color: "#fff",
    fontWeight: 900,
    position: "relative",
    cursor: "pointer",
  },
  circleInnerText: {
    whiteSpace: "pre-line",
    fontSize: 14,
    lineHeight: 1.2,
  },
  circleArrow: {
    position: "absolute",
    left: "50%",
    bottom: 15,
    transform: "translateX(-50%)",
    fontSize: 19,
    opacity: 0.95,
  },
  ctaDesc: {
    whiteSpace: "pre-line",
    textAlign: "center",
    color: "#8B8F99",
    fontSize: 10,
    lineHeight: 1.35,
    marginTop: 12,
  },

  list: { marginTop: 15, borderTop: "1px solid #F0F2F6" },
  listRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 15px",
    border: "none",
    background: "#fff",
    cursor: "pointer",
    borderBottom: "1px solid #F0F2F6",
  },
  listText: { fontSize: 19, fontWeight: 800, color: "#7A7F8A" },
  listArrow: { fontSize: 22, color: "#A6AAB3" },
};
