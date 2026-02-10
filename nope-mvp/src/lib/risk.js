const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export function computeRisk(input) {
  const now = new Date();
  const age = clamp(now.getFullYear() - input.birthYear + 1, 10, 100);

  let score = 0;
  const tags = [];

  // 기본정보
  if (age >= 70) { score += 18; tags.push("고연령(70+)"); }
  else if (age >= 60) { score += 14; tags.push("고연령(60+)"); }
  else if (age >= 45) { score += 8; tags.push("중장년"); }
  else score += 3;

  if (input.job === "UNEMPLOYED") { score += 9; tags.push("구직/공백"); }
  if (input.job === "STUDENT") { score += 3; tags.push("학생"); }
  if (input.job === "SELF") { score += 2; tags.push("사업/거래"); }

  // 주변관계
  const isAlone = input.household === "ALONE";
  if (isAlone) { score += 12; tags.push("1인가구"); }
  if (input.contactFreq === "LOW") { score += 14; tags.push("연락 빈도 낮음"); }
  else if (input.contactFreq === "MID") score += 6;
  else score += 1;

  // 재무상태
  score += input.debtLevel * 2.6; // 최대 26
  if (input.debtLevel >= 7) tags.push("부채 부담");

  score -= input.savingsLevel * 1.4; // 최대 -14
  if (input.savingsLevel <= 2) tags.push("저축 여력 낮음");

  if (input.monthlyIncome <= 200) { score += 9; tags.push("저소득"); }
  else if (input.monthlyIncome <= 350) score += 5;
  else if (input.monthlyIncome >= 800) score -= 3;

  // 추가문항(다양도 핵심)
  if (input.linkClickHabit === "HIGH") { score += 14; tags.push("링크 클릭 잦음"); }
  else if (input.linkClickHabit === "MID") score += 6;

  if (input.urgencyResponse === "YES") { score += 14; tags.push("시간 압박에 취약"); }
  else if (input.urgencyResponse === "SOMETIMES") score += 6;

  if (input.remoteInstallWilling === "YES") { score += 18; tags.push("원격앱 설치 취약"); }
  else if (input.remoteInstallWilling === "UNSURE") { score += 8; tags.push("원격앱 설치 가능성"); }

  score = clamp(Math.round(score), 0, 100);

  // 시그널(유형 세분화)
  const s = {
    senior: age >= 60 ? 1 : 0,
    verySenior: age >= 70 ? 1 : 0,
    aloneLowContact: (isAlone ? 1 : 0) + (input.contactFreq === "LOW" ? 1 : 0),
    familyImpersonation: (input.household !== "ALONE" ? 1 : 0) + (input.contactFreq !== "HIGH" ? 1 : 0),
    moneyStress: (input.debtLevel >= 7 ? 1 : 0) + (input.savingsLevel <= 2 ? 1 : 0) + (input.monthlyIncome <= 250 ? 1 : 0),
    linkRisk: input.linkClickHabit === "HIGH" ? 2 : input.linkClickHabit === "MID" ? 1 : 0,
    rushRisk: input.urgencyResponse === "YES" ? 2 : input.urgencyResponse === "SOMETIMES" ? 1 : 0,
    remoteRisk: input.remoteInstallWilling === "YES" ? 2 : input.remoteInstallWilling === "UNSURE" ? 1 : 0,
    jobSeeker: input.job === "UNEMPLOYED" ? 1 : 0,
    student: input.job === "STUDENT" ? 1 : 0,
    selfBiz: input.job === "SELF" ? 1 : 0,
  };

  // 15개 결과 키 결정(우선순위 + 다양도)
  // 최상위: 원격앱 설치(보이스피싱/악성앱) > 급박 > 링크 > 금융 > 가족/관계 > 직업/연령 > 안전
  let primary = "SAFE_WHITE";

  if (s.remoteRisk >= 2 && score >= 55) primary = "REMOTE_APP_TRAP";
  else if (s.rushRisk >= 2 && score >= 55) primary = "URGENCY_RED";
  else if (s.linkRisk >= 2 && score >= 50) primary = "LINK_CLICK_PURPLE";
  else if (s.moneyStress >= 3 && score >= 55) primary = "LOAN_DEBT_YELLOW";
  else if (s.moneyStress >= 2 && score >= 45) primary = "REFUND_TAX_YELLOW";
  else if (s.familyImpersonation >= 2 && score >= 45) primary = "FAMILY_BLUE";
  else if (s.aloneLowContact >= 2 && score >= 45) primary = "ISOLATION_GREEN";
  else if (s.jobSeeker && score >= 45) primary = "JOB_OFFER_ORANGE";
  else if (s.student && s.linkRisk >= 1 && score >= 40) primary = "DELIVERY_PHISHING_MINT";
  else if (s.selfBiz && s.linkRisk >= 1 && score >= 45) primary = "INVOICE_SCAM_GRAY";
  else if (s.verySenior && score >= 45) primary = "SENIOR_CARE_PINK";
  else if (s.senior && s.rushRisk >= 1 && score >= 40) primary = "AUTHORITY_IMPERSONATION_NAVY";
  else if (score >= 65) primary = "HIGH_ALERT_RED";
  else if (score >= 50) primary = "MID_ALERT_INDIGO";
  else if (score >= 35) primary = "LOW_ALERT_SKY";
  else primary = "SAFE_WHITE";

  // secondary: 가장 강한 다른 시그널을 1개 붙여 다양도/설명력 증가
  const signalRank = [
    { k: "REMOTE_APP_TRAP", v: s.remoteRisk },
    { k: "URGENCY_RED", v: s.rushRisk },
    { k: "LINK_CLICK_PURPLE", v: s.linkRisk },
    { k: "LOAN_DEBT_YELLOW", v: s.moneyStress },
    { k: "FAMILY_BLUE", v: s.familyImpersonation },
    { k: "ISOLATION_GREEN", v: s.aloneLowContact },
  ].sort((a, b) => b.v - a.v);

  let secondary;
  for (const cand of signalRank) {
    if (cand.v >= 2 && cand.k !== primary) { secondary = cand.k; break; }
  }

  return { score, primary, secondary, reasonTags: tags };
}