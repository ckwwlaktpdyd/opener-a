// Mock Data for Suneung MVP

// 사용자 프로필
export const mockUser = {
  id: 1,
  name: "김수험",
  email: "student@example.com",
  profileImage: null,
  streak: 7,
  totalProblems: 156,
  correctRate: 78,
  subscription: "프리미엄",
};

// 학습 현황
export const mockLearningStatus = {
  todayProblems: 12,
  todayCorrect: 9,
  weeklyProgress: [
    { day: "월", count: 15 },
    { day: "화", count: 12 },
    { day: "수", count: 8 },
    { day: "목", count: 20 },
    { day: "금", count: 0 },
    { day: "토", count: 0 },
    { day: "일", count: 0 },
  ],
  weakSubjects: ["수학 - 미적분", "국어 - 비문학"],
};

// 과목 데이터
export const subjects = [
  { id: "korean", name: "국어", icon: "📚", color: "#ef4444" },
  { id: "english", name: "영어", icon: "🌏", color: "#3b82f6" },
  { id: "math", name: "수학", icon: "📐", color: "#22c55e" },
];

// 시험 연도
export const examYears = [
  "2024", "2023", "2022", "2021", "2020"
];

// 시험 유형
export const examTypes = [
  { id: "6mo", name: "6월 모의평가" },
  { id: "9mo", name: "9월 모의평가" },
  { id: "suneung", name: "수능" },
];

// 오늘의 퀴즈
export const todayQuiz = {
  difficulty: "중",
  subject: "수학",
  question: "함수 f(x) = x³ - 3x² + 2x에 대하여 f'(1)의 값은?",
  choices: [
    { id: 1, text: "-1" },
    { id: 2, text: "0" },
    { id: 3, text: "1" },
    { id: 4, text: "2" },
    { id: 5, text: "3" },
  ],
  correctAnswer: 1,
  timeLimit: 180, // seconds
};

// 샘플 문제들
export const sampleProblems = [
  {
    id: 1,
    subject: "수학",
    year: "2024",
    examType: "6월 모의평가",
    number: 1,
    difficulty: 3,
    question: `첫째항이 양수인 수열 $\\{a_n\\}$이 모든 자연수 $n$에 대하여

$a_1 + a_2 + a_3 + \\cdots + a_n = n^2 + 2n$

을 만족시킬 때, 다음 물음에 답하시오.

수열 $\\{a_n\\}$의 일반항을 구하면 $a_n = 2n + 1$ 이다.

이때 $\\displaystyle\\sum_{k=1}^{20} \\frac{1}{a_k \\times a_{k+1}}$ 의 값은?`,
    choices: [
      { id: 1, text: "$\\frac{5}{21}$" },
      { id: 2, text: "$\\frac{10}{41}$" },
      { id: 3, text: "$\\frac{20}{129}$" },
      { id: 4, text: "$\\frac{10}{43}$" },
      { id: 5, text: "$\\frac{20}{123}$" },
    ],
    correctAnswer: 3,
    timeLimit: 180,
    explanation: `$a_n = 2n + 1$ 이므로
$$\\frac{1}{a_k \\times a_{k+1}} = \\frac{1}{(2k+1)(2k+3)} = \\frac{1}{2}\\left[\\frac{1}{2k+1} - \\frac{1}{2k+3}\\right]$$

(부분분수 분해)

따라서 $\\displaystyle\\sum_{k=1}^{20} \\frac{1}{a_k \\times a_{k+1}}$
$$= \\frac{1}{2}\\left[\\left(\\frac{1}{3} - \\frac{1}{5}\\right) + \\left(\\frac{1}{5} - \\frac{1}{7}\\right) + \\cdots + \\left(\\frac{1}{41} - \\frac{1}{43}\\right)\\right]$$
$$= \\frac{1}{2}\\left[\\frac{1}{3} - \\frac{1}{43}\\right] = \\frac{1}{2} \\times \\frac{40}{129} = \\frac{20}{129}$$`,
    variationProblem: {
      question: `수열 $\\{b_n\\}$이 모든 자연수 $n$에 대하여 $b_n = 3n - 1$ 을 만족할 때, 다음 물음에 답하시오.

수열 $\\{b_n\\}$의 첫째항부터 제 $n$항까지의 합을 $S_n$이라 하자.

이때 $\\displaystyle\\sum_{k=1}^{15} \\frac{1}{b_k \\times b_{k+1}}$ 의 값은?`,
      choices: [
        { id: 1, text: "5/46" },
        { id: 2, text: "15/92" },
        { id: 3, text: "5/47" },
        { id: 4, text: "30/184" },
        { id: 5, text: "15/94" },
      ],
      correctAnswer: 5,
      explanation: `bₙ = 3n - 1 이므로
1/(bₖ × bₖ₊₁) = 1/((3k-1)(3k+2))
= (1/3)[1/(3k-1) - 1/(3k+2)] (부분분수 분해)

따라서 Σ(k=1~15) 1/(bₖ × bₖ₊₁)
= (1/3)[(1/2 - 1/5) + (1/5 - 1/8) + ⋯ + (1/44 - 1/47)]
= (1/3)[1/2 - 1/47]
= (1/3) × 45/94 = 15/94`,
    },
  },
  {
    id: 2,
    subject: "수학",
    year: "2024",
    examType: "수능",
    number: 2,
    difficulty: 4,
    question: `두 양수 $a$, $b$에 대하여 함수 $f(x)$가

$$f(x) = \\begin{cases} ax^2 + bx & (x < 1) \\\\ x^3 - 2x^2 + x + 1 & (x \\geq 1) \\end{cases}$$

일 때, 함수 $f(x)$가 실수 전체의 집합에서 미분가능하다고 하자.

함수 $g(x)$를 $g(x) = f(x)f'(x)$ 라 할 때, 함수 $g(x)$의 극댓값과 극솟값의 합을 구하시오.`,
    choices: [
      { id: 1, text: "30" },
      { id: 2, text: "34" },
      { id: 3, text: "38" },
      { id: 4, text: "42" },
      { id: 5, text: "46" },
    ],
    correctAnswer: 2,
    timeLimit: 300,
    explanation: `연속성과 미분가능성 조건을 활용하여 $a$, $b$를 구한 후,
$g(x) = f(x)f'(x)$를 전개하고 극값을 구합니다.
$g'(x) = 0$인 점에서 극댓값과 극솟값을 각각 구하면
그 합이 $34$입니다.`,
    variationProblem: {
      question: `함수 $f(x) = x^3 - 3x^2 + 2$에 대하여 $g(x) = f(x) \\times f'(x)$라 할 때,
함수 $g(x)$의 극솟값을 구하시오.`,
      choices: [
        { id: 1, text: "-8" },
        { id: 2, text: "-6" },
        { id: 3, text: "-4" },
        { id: 4, text: "-2" },
        { id: 5, text: "0" },
      ],
      correctAnswer: 1,
      explanation: `$f'(x) = 3x^2 - 6x = 3x(x-2)$
$g(x) = (x^3 - 3x^2 + 2)(3x^2 - 6x)$
$g'(x) = 0$인 점을 구하면 $x = 0, 1, 2$
각 점에서의 극값을 비교하면 극솟값은 $-8$입니다.`,
    },
  },
  {
    id: 3,
    subject: "수학",
    year: "2024",
    examType: "9월 모의평가",
    number: 3,
    difficulty: 4,
    question: "함수 $f(x) = x^3 - 6x^2 + 9x + 2$의 극댓값을 $M$, 극솟값을 $m$이라 할 때, $M - m$의 값은?",
    choices: [
      { id: 1, text: "2" },
      { id: 2, text: "4" },
      { id: 3, text: "6" },
      { id: 4, text: "8" },
      { id: 5, text: "10" },
    ],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: "$f'(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3)$\\n극댓값: $f(1) = 6$, 극솟값: $f(3) = 2$\\n$M - m = 6 - 2 = 4",
    variationProblem: {
      question: "함수 $g(x) = 2x^3 - 9x^2 + 12x - 3$의 극댓값을 $M$, 극솟값을 $m$이라 할 때, $M + m$의 값은?",
      choices: [
        { id: 1, text: "-2" },
        { id: 2, text: "0" },
        { id: 3, text: "2" },
        { id: 4, text: "4" },
        { id: 5, text: "6" },
      ],
      correctAnswer: 2,
      explanation: `$$g'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x-1)(x-2)$$

$g'(x) = 0$이 되는 $x$는 $1, 2$입니다.

각 점에서의 함숫값:
$$
\\begin{aligned}
x = 1: \\quad g(1) &= 2(1)^3 - 9(1)^2 + 12(1) - 3 = 2 \\quad (\text{극댓값}) \\\\
x = 2: \\quad g(2) &= 2(2)^3 - 9(2)^2 + 12(2) - 3 = -2 \\quad (\text{극솟값})
\\end{aligned}
$$

따라서 $M = 2$, $m = -2$이므로 $M + m = 0$입니다.`,
    },
  },
];

// AI 분석 결과 Mock 데이터
export const mockAnalysisResult = {
  isCorrect: false,
  userAnswer: 2,
  correctAnswer: 3,
  analysis: {
    wrongReason: "삼각함수의 극한 공식 적용 시 계수 처리 오류입니다. lim(x→0) (sin ax)/x = a 공식에서 분모의 x에 대한 처리가 미흡했습니다.",
    keyConceptTitle: "삼각함수의 극한",
    keyConcepts: [
      "lim(x→0) (sin x)/x = 1",
      "lim(x→0) (sin ax)/x = a",
      "lim(x→0) (sin ax)/(bx) = a/b",
    ],
    similarMistakes: "이 유형의 문제에서 자주 발생하는 실수입니다. 특히 계수가 분자에만 있거나 분모에만 있을 때 혼동하기 쉽습니다.",
    studyTip: "삼각함수 극한 공식을 정확히 암기하고, 분자와 분모의 계수를 맞춰주는 연습을 하세요.",
  },
  relatedProblems: [
    { id: 101, title: "2023 수능 14번 - 삼각함수 극한" },
    { id: 102, title: "2022 9모 16번 - 삼각함수 극한" },
  ],
};

// 스크랩북 데이터
export const mockScrapbook = [
  {
    id: 1,
    subject: "수학",
    year: "2024",
    examType: "수능",
    number: 15,
    title: "삼각함수의 극한",
    wrongDate: "2024-12-25",
    reviewed: false,
  },
  {
    id: 2,
    subject: "수학",
    year: "2024",
    examType: "6모",
    number: 21,
    title: "미분을 이용한 극값",
    wrongDate: "2024-12-24",
    reviewed: true,
  },
  {
    id: 3,
    subject: "국어",
    year: "2023",
    examType: "수능",
    number: 18,
    title: "비문학 추론",
    wrongDate: "2024-12-23",
    reviewed: false,
  },
];

// 채팅 히스토리
export const mockChatHistory = [
  {
    id: 1,
    type: "ai",
    message: "안녕하세요! 오답 분석 AI입니다. 이 문제에 대해 궁금한 점이 있으시면 질문해 주세요.",
  },
  {
    id: 2,
    type: "user",
    message: "왜 lim(x→0) sin3x/x가 3이 되나요?",
  },
  {
    id: 3,
    type: "ai",
    message: "좋은 질문이에요! 핵심은 'lim(x→0) sinθ/θ = 1' 공식입니다.\n\n분자의 sin 3x와 분모의 x를 맞춰주기 위해 다음과 같이 변형합니다:\n\nlim(x→0) (sin 3x)/x\n= lim(x→0) 3 × (sin 3x)/(3x)\n= 3 × lim(x→0) (sin 3x)/(3x)\n= 3 × 1 = 3\n\n3x = θ로 치환하면 x→0일 때 θ→0이므로 공식을 적용할 수 있습니다.",
  },
];
