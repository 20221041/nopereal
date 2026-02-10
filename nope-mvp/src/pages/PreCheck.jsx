import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { computeRisk } from "../lib/risk";

const ui = {
  page: { minHeight: "100vh", background: "#F5F7FF", padding: 20 },
  card: { maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 16, border: "1px solid #E6ECFF" },
  title: { fontSize: 16, fontWeight: 800, marginBottom: 10 },
  desc: { color: "#617086", lineHeight: 1.4, marginBottom: 14, fontSize: 13 },
  label: { fontWeight: 800, marginTop: 14, marginBottom: 8, color: "#1E2A3A" },
  subLabel: { fontWeight: 700, marginTop: 10, marginBottom: 6, color: "#1E2A3A" },
  input: { width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #E6ECFF" },
  row: { display: "flex", gap: 8, flexWrap: "wrap" },
  pill: (active) => ({
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid " + (active ? "#5B7CFF" : "#E8EDFF"),
    background: active ? "#5B7CFF" : "#E8EDFF",
    color: active ? "#fff" : "#1E2A3A",
    fontWeight: 800,
    cursor: "pointer",
  }),
  dots: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 },
  dot: (active) => ({
    width: 28,
    height: 28,
    borderRadius: 999,
    border: "1px solid #E6ECFF",
    background: active ? "#5B7CFF" : "#E8EDFF",
    color: active ? "#fff" : "#1E2A3A",
    fontWeight: 900,
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  }),
  hr: { height: 1, background: "#EEF1F8", margin: "14px 0" },
  submit: {
    width: "100%",
    marginTop: 18,
    padding: "12px 14px",
    borderRadius: 999,
    border: "1px solid #5B7CFF",
    background: "#5B7CFF",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
  },
};

export default function PreCheck() {
  const nav = useNavigate();

  // 기존 문항
  const [birthYear, setBirthYear] = useState("1998");
  const [gender, setGender] = useState("F");
  const [job, setJob] = useState("EMPLOYED");

  const [household, setHousehold] = useState("ALONE");
  const [contactFreq, setContactFreq] = useState("MID");

  const [monthlyIncome, setMonthlyIncome] = useState("320");
  const [debtLevel, setDebtLevel] = useState(4);
  const [savingsLevel, setSavingsLevel] = useState(5);

  // 추가 문항 3개 (다양도 상승 핵심)
  // 1) 링크 클릭 습관
  const [linkClickHabit, setLinkClickHabit] = useState("MID"); // LOW/MID/HIGH
  // 2) 시간 압박(급박함) 반응
  const [urgencyResponse, setUrgencyResponse] = useState("SOMETIMES"); // NO/SOMETIMES/YES
  // 3) 원격제어/인증앱 설치 유도에 대한 취약
  const [remoteInstallWilling, setRemoteInstallWilling] = useState("NO"); // NO/UNSURE/YES

  const parsed = useMemo(() => {
    const by = Number(birthYear);
    const mi = Number(monthlyIncome);
    return {
      birthYear: Number.isFinite(by) ? by : 1990,
      monthlyIncome: Number.isFinite(mi) ? mi : 300,
    };
  }, [birthYear, monthlyIncome]);

  const submit = () => {
    const input = {
      birthYear: parsed.birthYear,
      gender,
      job,
      household,
      contactFreq,
      monthlyIncome: parsed.monthlyIncome,
      debtLevel,
      savingsLevel,
      linkClickHabit,
      urgencyResponse,
      remoteInstallWilling,
    };
    const out = computeRisk(input);
    sessionStorage.setItem("precheck_payload", JSON.stringify({ input, out }));
    nav("/result");
  };

  return (
    <div style={ui.page}>
      <div style={ui.card}>
        <div style={ui.title}>피싱예방을 위한 사전검사</div>
        <div style={ui.desc}>
          기본정보/주변관계/재무상태에 더해, 링크 클릭 습관·급박 상황 반응·원격앱 설치 취약을 함께 반영해
          더 세분화된 결과(15개 유형)를 제공합니다.
        </div>

        <div style={ui.label}>기본정보</div>

        <div style={ui.subLabel}>생년</div>
        <input style={ui.input} value={birthYear} onChange={(e) => setBirthYear(e.target.value)} placeholder="YYYY" />

        <div style={ui.subLabel}>성별</div>
        <div style={ui.row}>
          <div style={ui.pill(gender === "F")} onClick={() => setGender("F")}>여성</div>
          <div style={ui.pill(gender === "M")} onClick={() => setGender("M")}>남성</div>
        </div>

        <div style={ui.subLabel}>직업</div>
        <div style={ui.row}>
          {[
            ["EMPLOYED", "재직"],
            ["SELF", "자영업"],
            ["STUDENT", "학생"],
            ["UNEMPLOYED", "미취업"],
          ].map(([v, t]) => (
            <div key={v} style={ui.pill(job === v)} onClick={() => setJob(v)}>{t}</div>
          ))}
        </div>

        <div style={ui.hr} />

        <div style={ui.label}>주변관계</div>

        <div style={ui.subLabel}>함께 거주</div>
        <div style={ui.row}>
          {[
            ["ALONE", "1인가구"],
            ["COUPLE", "2인가구"],
            ["FAMILY", "3인 이상"],
          ].map(([v, t]) => (
            <div key={v} style={ui.pill(household === v)} onClick={() => setHousehold(v)}>{t}</div>
          ))}
        </div>

        <div style={ui.subLabel}>주변 연락 빈도</div>
        <div style={ui.row}>
          {[
            ["LOW", "낮음"],
            ["MID", "보통"],
            ["HIGH", "높음"],
          ].map(([v, t]) => (
            <div key={v} style={ui.pill(contactFreq === v)} onClick={() => setContactFreq(v)}>{t}</div>
          ))}
        </div>

        <div style={ui.hr} />

        <div style={ui.label}>재무상태</div>

        <div style={ui.subLabel}>월 소득(만원)</div>
        <input style={ui.input} value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} placeholder="예: 320" />

        <div style={ui.subLabel}>부채 수준 (0~10)</div>
        <div style={ui.dots}>
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} style={ui.dot(debtLevel === i)} onClick={() => setDebtLevel(i)}>{i}</div>
          ))}
        </div>

        <div style={ui.subLabel}>저축 여력 (0~10)</div>
        <div style={ui.dots}>
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} style={ui.dot(savingsLevel === i)} onClick={() => setSavingsLevel(i)}>{i}</div>
          ))}
        </div>

        <div style={ui.hr} />

        <div style={ui.label}>추가문항</div>

        <div style={ui.subLabel}>낯선 링크를 받았을 때 클릭하는 편인가요?</div>
        <div style={ui.row}>
          {[
            ["LOW", "거의 안함"],
            ["MID", "가끔"],
            ["HIGH", "자주"],
          ].map(([v, t]) => (
            <div key={v} style={ui.pill(linkClickHabit === v)} onClick={() => setLinkClickHabit(v)}>{t}</div>
          ))}
        </div>

        <div style={ui.subLabel}>“지금 당장” 같은 시간 압박이 오면 바로 행동하나요?</div>
        <div style={ui.row}>
          {[
            ["NO", "아니오"],
            ["SOMETIMES", "가끔"],
            ["YES", "자주"],
          ].map(([v, t]) => (
            <div key={v} style={ui.pill(urgencyResponse === v)} onClick={() => setUrgencyResponse(v)}>{t}</div>
          ))}
        </div>

        <div style={ui.subLabel}>원격제어 앱/보안앱 설치를 요구하면 설치할 가능성이 있나요?</div>
        <div style={ui.row}>
          {[
            ["NO", "없음"],
            ["UNSURE", "상황에 따라"],
            ["YES", "있음"],
          ].map(([v, t]) => (
            <div key={v} style={ui.pill(remoteInstallWilling === v)} onClick={() => setRemoteInstallWilling(v)}>{t}</div>
          ))}
        </div>

        <button style={ui.submit} onClick={submit}>검사 결과 보기</button>
      </div>
    </div>
  );
}