export const categories = [
  { id: "romance", label: "로맨스스캠" },
  { id: "voice", label: "보이스피싱" },
  { id: "phishing", label: "피싱" },
  { id: "smishing", label: "스미싱" },
  { id: "finance", label: "금융범죄" }, // New
  { id: "link", label: "불법링크" },   // New
  { id: "invest", label: "투자스캠" }, // New
  { id: "gov", label: "관공서사칭" },  // New
  { id: "threat", label: "협박성피싱" },// New
  { id: "more", label: "더보기" },
];

export const newsItems = [
  // romance (로맨스스캠)
  {
    id: "n5",
    categoryId: "romance",
    tag: "연애빙자사기",
    title: "해외 파병 군인 사칭, 장기 연락 후 송금 요구",
    desc: "군인·의사 등 신분을 내세워 신뢰를 쌓은 뒤 금전을 요구하는 전형적인 로맨스 스캠 사례입니다.",
  },
  {
    id: "n6",
    categoryId: "romance",
    tag: "주의",
    title: "화상통화를 계속 피하는 연인, 의심 신호일까?",
    desc: "영상통화 회피와 음성 메시지 위주의 소통은 해외 로맨스 스캠의 대표적인 특징입니다.",
  },
  {
    id: "n7",
    categoryId: "romance",
    tag: "피해사례",
    title: "결혼 약속 후 공동 계좌 요구, 실제 피해로 이어진 경우",
    desc: "미래 계획을 앞세워 금전적 결합을 유도하는 수법을 분석합니다.",
  },
  {
    id: "n8",
    categoryId: "romance",
    tag: "SNS",
    title: "SNS DM으로 시작되는 로맨스 스캠 패턴",
    desc: "갑작스러운 호감 표현과 빠른 관계 진전은 주요 경고 신호입니다.",
  },
  {
    id: "n9",
    categoryId: "romance",
    tag: "경고",
    title: "‘곧 한국에 간다’는 말 뒤 반복된 송금 요청",
    desc: "입국 지연·계좌 문제를 핑계로 한 반복 송금 요구 사례를 정리했습니다.",
  },

  // finance (금융범죄)
  {
    id: "n10",
    categoryId: "finance",
    tag: "금융사기",
    title: "고금리 대출 광고 클릭 후 개인정보 유출",
    desc: "광고 클릭 이후 상담을 빙자해 민감 정보를 요구하는 수법을 설명합니다.",
  },
  {
    id: "n11",
    categoryId: "finance",
    tag: "피해주의",
    title: "카드 배송 사칭 전화, 이렇게 구분하세요",
    desc: "금융사는 전화로 인증번호를 요구하지 않습니다.",
  },
  {
    id: "n12",
    categoryId: "finance",
    tag: "가짜앱",
    title: "은행 앱 사칭 설치 유도, 실제 피해 사례",
    desc: "공식 앱과 유사한 아이콘·이름으로 접근하는 수법입니다.",
  },
  {
    id: "n13",
    categoryId: "finance",
    tag: "문자주의",
    title: "대출 상환 조건 변경 문자, 진짜일까?",
    desc: "문자 링크 클릭 전 반드시 확인해야 할 포인트를 정리했습니다.",
  },
  {
    id: "n14",
    categoryId: "finance",
    tag: "경고",
    title: "선입금 요구는 100% 금융사기입니다",
    desc: "수수료·보증금 명목의 선입금 요구는 불법 금융사기의 전형입니다.",
  },

  // voice (보이스피싱)
  {
    id: "n15",
    categoryId: "voice",
    tag: "기관사칭",
    title: "검찰·금감원 사칭 전화, 실제 통화 흐름 분석",
    desc: "시간 압박과 비밀 유지 요구가 반복되는 패턴을 설명합니다.",
  },
  {
    id: "n16",
    categoryId: "voice",
    tag: "주의",
    title: "통화 종료 후 송금을 유도하는 보이스피싱",
    desc: "통화 직후 행동을 노리는 최신 수법을 정리했습니다.",
  },
  {
    id: "n17",
    categoryId: "voice",
    tag: "피해사례",
    title: "가족 사고를 빙자한 전화, 이렇게 확인하세요",
    desc: "감정 자극형 보이스피싱의 대응 요령을 안내합니다.",
  },
  {
    id: "n18",
    categoryId: "voice",
    tag: "분석",
    title: "보이스피싱 전화가 유난히 급한 이유",
    desc: "판단 시간을 차단하는 심리적 기법을 설명합니다.",
  },
  {
    id: "n19",
    categoryId: "voice",
    tag: "예방",
    title: "통화 중 바로 끊어도 되는 위험 신호 5가지",
    desc: "실제 피해자 공통 경험을 기반으로 정리했습니다.",
  },

  // link (불법링크)
  {
    id: "n20",
    categoryId: "link",
    tag: "스미싱",
    title: "택배·청구 문자에 숨겨진 악성 링크",
    desc: "최근 유행하는 스미싱 문구와 대응 방법입니다.",
  },
  {
    id: "n21",
    categoryId: "link",
    tag: "주의",
    title: "브라우저만 열렸는데도 위험할 수 있을까?",
    desc: "링크 클릭만으로도 발생할 수 있는 위험을 설명합니다.",
  },
  {
    id: "n22",
    categoryId: "link",
    tag: "예방",
    title: "문자 링크 확인 전 꼭 해야 할 한 가지",
    desc: "공식 앱·사이트에서 직접 확인하는 습관이 중요합니다.",
  },

  // invest (투자스캠)
  {
    id: "n23",
    categoryId: "invest",
    tag: "투자사기",
    title: "단기간 고수익을 강조하는 투자방의 실체",
    desc: "수익 인증과 전문가 사칭으로 접근하는 투자 스캠 사례입니다.",
  },
  {
    id: "n24",
    categoryId: "invest",
    tag: "가상자산",
    title: "코인 투자 정보 공유방, 안전할까?",
    desc: "폐쇄형 채팅방 투자 유도의 위험성을 분석합니다.",
  },

  // gov (관공서사칭)
  {
    id: "n25",
    categoryId: "gov",
    tag: "기관사칭",
    title: "관공서는 전화로 계좌를 요구하지 않습니다",
    desc: "실제 행정 절차와 사기 수법의 차이를 비교합니다.",
  },
  {
    id: "n26",
    categoryId: "gov",
    tag: "주의",
    title: "범칙금·세금 미납 문자, 이렇게 확인하세요",
    desc: "공식 고지와 사기 문자의 차이를 안내합니다.",
  },

  // threat (협박성 피싱)
  {
    id: "n27",
    categoryId: "threat",
    tag: "협박",
    title: "불법 촬영·고소 협박 메시지 대응 방법",
    desc: "공포를 유도하는 협박형 피싱의 대응 요령을 정리했습니다.",
  },
  {
    id: "n28",
    categoryId: "threat",
    tag: "주의",
    title: "파일 열람을 요구하는 협박 메일 주의",
    desc: "첨부파일 실행 시 발생할 수 있는 2차 피해를 설명합니다.",
  },
];

export const communityPosts = [
  // 기존 p1 ~ p3 유지

  {
    id: "p4",
    categoryId: "voice",
    title: "통화 끊고 나니까 이상해서 다시 검색해봤어요",
    body: "통화 중엔 정신 없었는데 끊고 나서 보니까 전형적인 사기 같더라고요.",
    views: 210,
    comments: 34,
  },
  {
    id: "p5",
    categoryId: "voice",
    title: "검찰 사칭 전화 받았는데 말투가 너무 자연스러웠어요",
    body: "진짜 공무원인 줄 알았습니다. 다들 조심하세요.",
    views: 512,
    comments: 76,
  },
  {
    id: "p6",
    categoryId: "romance",
    title: "외국인 연인이 번역기 쓰는 것 같았어요",
    body: "문장이 계속 어색해서 검색해보니 로맨스 스캠 사례랑 비슷하더라고요.",
    views: 189,
    comments: 22,
  },
  {
    id: "p7",
    categoryId: "romance",
    title: "결혼 얘기 나오자마자 돈 얘기가 시작됐어요",
    body: "갑자기 계좌 문제라며 도와달라길래 차단했습니다.",
    views: 276,
    comments: 41,
  },
  {
    id: "p8",
    categoryId: "link",
    title: "택배 문자 링크 눌렀는데 아무 화면도 안 떠요",
    body: "이 경우도 위험한 건가요? 바로 뭘 해야 하나요?",
    views: 143,
    comments: 19,
  },
  {
    id: "p9",
    categoryId: "finance",
    title: "대출 상담 전화 왔는데 수수료 먼저 달래요",
    body: "이거 100% 사기겠죠? 번호 차단했습니다.",
    views: 97,
    comments: 12,
  },
  {
    id: "p10",
    categoryId: "invest",
    title: "투자방에서 다들 수익 인증하길래 혹했어요",
    body: "검색해보니 조작된 인증이라네요.",
    views: 332,
    comments: 55,
  },
  {
    id: "p11",
    categoryId: "gov",
    title: "세금 미납 문자 받았는데 링크가 수상했어요",
    body: "홈페이지 직접 들어가 보니 그런 내역 없더라고요.",
    views: 88,
    comments: 7,
  },
  {
    id: "p12",
    categoryId: "threat",
    title: "고소하겠다는 협박 메일 받았어요",
    body: "파일 열지 말고 그냥 무시해도 될까요?",
    views: 401,
    comments: 63,
  },
  {
    id: "p13",
    categoryId: "threat",
    title: "개인 영상 가지고 있다며 협박하는 메시지",
    body: "너무 무서웠는데 검색해보니 흔한 수법이더라고요.",
    views: 520,
    comments: 91,
  },
];