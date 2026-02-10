import React, { useMemo, useState } from "react";

export default function MyPage() {
  const [riskType, setRiskType] = useState("로맨스스캠");

  const tip = useMemo(() => {
    if (riskType === "로맨스스캠") return "빠른 친밀감 + 영상통화 회피 + 금전 이야기 = 즉시 거리두기";
    if (riskType === "보이스피싱") return "기관 사칭 + 시간 압박 + 비밀 유지 요구 = 통화 종료 후 공식 번호 재확인";
    return "링크 클릭 유도 메시지는 열람 전에 발신자/URL/앱 설치 요구 여부를 확인";
  }, [riskType]);

  return (
    <div className="page">
      <div className="section-title">내 정보</div>

      <div className="mini-card">
        <div style={{ fontWeight: 900, marginBottom: 10 }}>사전 점검</div>
        <div className="kv">
          <div className="k">관심/취약 유형</div>
          <select value={riskType} onChange={(e) => setRiskType(e.target.value)} className="pill-btn" style={{ height: 40 }}>
            <option>로맨스스캠</option>
            <option>보이스피싱</option>
            <option>불법링크</option>
          </select>
        </div>
        <div style={{ height: 10 }} />
        <div className="kv">
          <div className="k">요약 안내</div>
          <div className="v">{tip}</div>
        </div>
      </div>

      <div style={{ height: 12 }} />

      <div className="mini-card">
        <div style={{ fontWeight: 900, marginBottom: 10 }}>사용자 정보</div>
        <div className="kv"><div className="k">작성 게시글 수</div><div className="v">3</div></div>
        <div className="kv"><div className="k">참여 댓글 수</div><div className="v">12</div></div>
        <div className="kv"><div className="k">개인정보 및 인증 상태</div><div className="v">미인증</div></div>
      </div>
    </div>
  );
}
