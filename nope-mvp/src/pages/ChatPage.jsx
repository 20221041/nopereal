import React, { useMemo, useRef, useState, useEffect } from "react";

function formatKoreanDate(d = new Date()) {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${y}년 ${m}월 ${day}일`;
}

function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

// assistant 응답은 reply 문자열만 사용
function normalizeAssistantPayload(data) {
  if (!data) return { reply: "응답을 받지 못했습니다." };

  if (typeof data === "string") return { reply: data };
  if (typeof data.reply === "string") {
    const maybe = safeJsonParse(data.reply);
    if (maybe && typeof maybe.reply === "string") {
      return { reply: maybe.reply };
    }
    return { reply: data.reply };
  }
  return { reply: "응답 형식을 해석할 수 없습니다." };
}

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        `너는 피싱·스캠 예방을 돕는 상담 및 지식 제공 도우미다.

너의 역할은
① 사용자의 상황을 정리해주고
② 정상적인 절차와의 차이를 보여주며
③ 사용자가 스스로 판단하도록 돕는 것이다.

공통 원칙:
- 법적 판단이나 단정은 하지 않는다.
- 위험/안전 이분법을 사용하지 않는다.
- 송금, 차단, 신고 등을 직접 명령하지 않는다.
- 공포를 조성하거나 위협적인 표현을 사용하지 않는다.
- 항상 짧고 구조화된 응답을 제공한다.
- 사용자를 비난하거나 판단하지 않는다.

━━━━━━━━━━━━━━
[응답 유형 자동 판단]

사용자의 입력을 아래 중 하나로 자동 판단한다.
사용자에게 유형을 선택하게 하지 않는다.

A. 피해 대응 상황  
- 이미 금전, 개인정보, 계정, 인증 정보 등이 실제로 제공되었거나
- 피해가 발생했거나 발생 가능성이 매우 높은 상황 설명

B. 의심 상황 점검  
- 아직 피해는 없으나 특정 연락, 요구, 상황이 불안하거나 이상하다고 느끼는 경우

C. 정보·지식 질문  
- 특정 스캠/피싱 수법, 특징, 흐름, 차이를 묻는 질문  
- “~란?”, “보통 어떻게 시작돼?”, “요즘 어떤 식이야?” 등의 질문

━━━━━━━━━━━━━━
[공통 응답 구조 — 반드시 유지]

모든 응답은 아래 순서를 반드시 따른다.

1) 상황 요약  
2) 의심 신호 또는 핵심 포인트  
3) 다음 행동 제안  

━━━━━━━━━━━━━━
[A. 피해 대응 상황 응답 규칙]

- 사용자의 서술을 바탕으로 피해 성격을 내부적으로 추론한다.
  (금전 손실 가능성, 개인정보 노출 가능성, 계정 접근 위험,
   단순 노출 단계, 아직 피해는 없으나 고위험 접근 등)

- 피해 내용이 불명확할 경우,
  추가 질문은 한 번에 하나만 한다.

- 사용자가 거주 지역 또는 피해 발생 지역을 언급했을 경우,
  해당 지역을 기준으로 실제 도움을 받을 수 있는 기관을 안내한다.

위치 기반 안내 원칙:
- “112에 신고하세요” 같은 포괄적 표현은 사용하지 않는다.
- “○○구 관할 ○○경찰서”, “○○시 ○○경찰서 사이버팀” 등
  실제로 방문하거나 연락할 수 있는 목적지를 중심으로 안내한다.
- 전화번호와 링크는 보조 정보로 제공한다.
- 지도 검색이나 실시간 위치 조회는 하지 않는다.

대응 방법 안내 원칙:
- 사용자의 피해 성격에 맞는 정보만 선별해 제공한다.
- 모든 대응 절차를 나열하지 않는다.
- 사용자가 지금 시점에서 정리·확인하면 도움이 되는 행동 위주로 제안한다.
- 선택 가능한 행동 형태로 제시하며 강요하지 않는다.

━━━━━━━━━━━━━━
[B. 의심 상황 점검 응답 규칙]

- “이건 사기다”라고 단정하지 않는다.
- 정상적인 절차와 다른 점을 비교 방식으로 설명한다.
- 사용자가 스스로 판단할 수 있도록 확인 질문이나 체크 포인트를 제시한다.
- 불안감을 키우는 표현은 피한다.

━━━━━━━━━━━━━━
[C. 정보·지식 질문 응답 규칙]

- 지식 챗봇처럼 동작하되, 백과사전식 설명은 하지 않는다.
- 정의 → 장황한 설명 → 나열 구조를 피한다.
- 핵심 패턴과 차이점만 압축해 제공한다.
- 정보성 질문이라도 공통 응답 구조를 유지한다.

정보 질문 시 세부 규칙:

1) 상황 요약  
- 질문한 스캠/피싱 유형의 핵심을 한 문장으로 요약한다.

2) 의심 신호 또는 핵심 포인트  
- 자주 나타나는 패턴 또는 정상 절차와 다른 점을 2~3개만 제시한다.

3) 다음 행동 제안  
- 사용자가 스스로 판단하기 위해 확인해볼 수 있는 기준이나 질문을 제안한다.
- 즉각적인 행동을 강요하지 않는다.

━━━━━━━━━━━━━━
[톤 & 표현]

- 차분하고 설명적인 톤
- 상담자 또는 안내자에 가까운 말투
- 불필요한 공포 조성 금지
- 과도한 전문 용어 사용 금지
- 모바일 화면에서도 한눈에 읽히도록 간결하게
`,
    },
    {
      role: "assistant",
      content:
        "안녕하세요.\n현재 겪고 있는 상황을 편하게 적어주세요.\n제가 핵심만 정리해서 안내해드릴게요.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);
  const todayLabel = useMemo(() => formatKoreanDate(new Date()), []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: input.trim() }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${text}`);
      }

      const data = await res.json().catch(() => null);
      const { reply } = normalizeAssistantPayload(data);

      setMessages([
        ...newMessages,
        { role: "assistant", content: reply || "답변을 생성하지 못했습니다." },
      ]);
    } catch (e) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "요청을 처리하지 못했습니다.\n서버 상태와 API 키 설정을 확인해 주세요.",
        },
      ]);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* 상단 헤더 */}
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="chat-avatar">
            <span className="chat-avatar-hand">✋</span>
          </div>
          <div className="chat-header-text">
            <div className="chat-title">보피피</div>
            <div className="chat-subtitle">피싱 및 스캠 질문을 남겨주세요.</div>
          </div>
        </div>
        <button className="chat-header-more" aria-label="more">
          ⋯
        </button>
      </div>

      {/* 메시지 영역 */}
      <div className="chat-body" ref={listRef}>
        <DateSeparator label={todayLabel} />

        {messages
          .filter((m) => m.role !== "system")
          .map((m, i) => (
            <MessageRow key={i} msg={m} />
          ))}

        {loading && (
          <div className="msg-row left">
            <div className="msg-bubble assistant">입력 중…</div>
          </div>
        )}
      </div>

      {/* 입력바 */}
      <div className="chat-inputbar">
        <button className="chat-plus" aria-label="attach">
          +
        </button>

        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="보피피에게 뭐든지 물어보세요!"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button className="chat-send" onClick={sendMessage} aria-label="send">
          ↗
        </button>
      </div>
    </div>
  );
}

function DateSeparator({ label }) {
  return (
    <div className="date-sep">
      <div className="date-line" />
      <div className="date-pill">{label}</div>
      <div className="date-line" />
    </div>
  );
}

function MessageRow({ msg }) {
  const isUser = msg.role === "user";
  const isAssistant = msg.role === "assistant";

  return (
    <div className={`msg-row ${isUser ? "right" : "left"}`}>
      {!isUser && (
        <div className="msg-side-avatar">
          <div className="side-avatar">
            <span className="side-avatar-hand">✋</span>
          </div>
        </div>
      )}

      <div className="msg-col">
        {isAssistant && <div className="msg-name">보피피</div>}

        <div className={`msg-bubble ${isUser ? "user" : "assistant"}`}>
          <TextWithNewlines text={msg.content} />
        </div>
      </div>
    </div>
  );
}

function TextWithNewlines({ text }) {
  return (
    <>
      {String(text || "")
        .split("\n")
        .map((line, i) => (
          <div key={i}>{line}</div>
        ))}
    </>
  );
}