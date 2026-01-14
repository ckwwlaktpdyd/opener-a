import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from '../components/TopNav';
import MathText from '../components/MathText';
import './AnalysisResult.css';

// AI 응답 시뮬레이션 데이터
const aiResponses = [
    "좋은 질문이에요! 이 문제의 핵심은 미분을 이용해 극값을 찾는 것입니다. f'(x) = 3x² - 6x = 3x(x-2)를 구하고, f'(x) = 0이 되는 x = 0, 2에서 극값을 가집니다.",
    "정확해요! x = 0일 때 f(0) = 2 (극댓값), x = 2일 때 f(2) = 8 - 12 + 2 = -2 (극솟값)입니다. 따라서 극댓값과 극솟값의 합은 2 + (-2) = 0이 됩니다.",
    "추가 질문이 있으시면 언제든 물어보세요! 미분 문제를 더 풀어보시면 실력 향상에 도움이 될 거예요.",
];

// 변형 문제 데이터 (원본 문제와 연관된)
const variationProblem = {
    subject: '수학',
    number: 1,
    passage: `다음 물음에 답하시오.

함수 g(x) = 2x³ - 6x + 1에 대하여 다음을 구하시오.`,
    question: '함수 g(x)가 극솟값을 갖는 x의 값은?',
    choices: [
        { id: 1, text: '-2' },
        { id: 2, text: '-1' },
        { id: 3, text: '0' },
        { id: 4, text: '1' },
        { id: 5, text: '2' },
    ],
    correctAnswer: 4,
    difficulty: '중',
    reward: '2캔'
};

export default function AnalysisResult() {
    const navigate = useNavigate();
    const location = useLocation();
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [responseIndex, setResponseIndex] = useState(0);

    // 변형문제 관련 상태
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showVariationModal, setShowVariationModal] = useState(false);
    const [selectedVariationAnswer, setSelectedVariationAnswer] = useState(null);
    const [variationSubmitted, setVariationSubmitted] = useState(false);
    const [variationTimer, setVariationTimer] = useState(600); // 10분

    // 문제 풀이에서 전달받은 데이터
    const problemData = location.state || {
        problem: {
            subject: '수학',
            number: 1,
            year: '2024',
            examType: 'suneung',
            passage: `다음 물음에 답하시오.

함수 f(x) = x³ - 3x² + 2에 대하여 다음을 구하시오.`,
            question: '함수 f(x)의 극댓값과 극솟값의 합은?',
            choices: [
                { id: 1, text: '-2' },
                { id: 2, text: '0' },
                { id: 3, text: '2' },
                { id: 4, text: '4' },
                { id: 5, text: '6' },
            ],
            correctAnswer: 2
        },
        userAnswer: 1,
        isCorrect: false
    };

    const { problem, userAnswer, isCorrect } = problemData;

    // 초기 AI 메시지 - 질문만
    useEffect(() => {
        let initialMessages = [];

        if (isCorrect) {
            initialMessages = [
                { type: 'ai', text: `정답이에요! 🎉 혹시 이 문제에 대해 더 궁금한 점이 있으신가요?` }
            ];
        } else {
            initialMessages = [
                {
                    type: 'ai',
                    text: `${userAnswer}번을 선택했네요. 정답은 ${problem.correctAnswer}번이에요.\n\n왜 ${userAnswer}번이 정답이라고 생각했나요? 어떤 근거로 그렇게 판단했는지 설명해주세요.`
                }
            ];
        }

        setChatMessages(initialMessages);
    }, []);

    // 변형문제 타이머
    useEffect(() => {
        if (showVariationModal && variationTimer > 0 && !variationSubmitted) {
            const timer = setInterval(() => {
                setVariationTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [showVariationModal, variationTimer, variationSubmitted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // 오답 해설 생성
    const getWrongAnswerExplanation = () => {
        return `📝 오답 해설

${userAnswer}번 "${problem.choices?.find(c => c.id === userAnswer)?.text}"를 선택하셨네요.

먼저 미분을 구해봅시다:
f'(x) = 3x² - 6x = 3x(x - 2)

f'(x) = 0이 되는 점은 x = 0, x = 2입니다.

각 점에서의 함수값을 계산하면:
- f(0) = 0 - 0 + 2 = 2 (극댓값)
- f(2) = 8 - 12 + 2 = -2 (극솟값)

따라서 극댓값과 극솟값의 합은 2 + (-2) = 0입니다.

정답은 ${problem.correctAnswer}번 "${problem.choices?.find(c => c.id === problem.correctAnswer)?.text}"입니다.

💡 팁: 극값 문제는 미분하여 f'(x) = 0인 점을 찾고, 각 점에서 함수값을 계산하는 것이 핵심입니다!`;
    };

    const handleSendMessage = () => {
        if (chatInput.trim() && !isTyping) {
            const userMessage = chatInput;
            setChatMessages(prev => [...prev, { type: 'user', text: userMessage }]);
            setChatInput('');
            setIsTyping(true);

            setTimeout(() => {
                let response;
                if (responseIndex === 0 && !isCorrect) {
                    response = getWrongAnswerExplanation();
                } else {
                    response = aiResponses[responseIndex % aiResponses.length];
                }
                setChatMessages(prev => [...prev, { type: 'ai', text: response }]);
                setResponseIndex(prev => prev + 1);
                setIsTyping(false);
            }, 1500);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleGenerateVariation = () => {
        setShowLoadingModal(true);

        // 2초 후 로딩 완료하고 변형문제 모달 표시
        setTimeout(() => {
            setShowLoadingModal(false);
            setShowVariationModal(true);
        }, 2000);
    };

    const handleVariationSubmit = () => {
        if (selectedVariationAnswer !== null) {
            setVariationSubmitted(true);
        }
    };

    const handleCloseVariation = () => {
        setShowVariationModal(false);
        setSelectedVariationAnswer(null);
        setVariationSubmitted(false);
    };

    const getUserChoiceText = () => {
        const choice = problem.choices?.find(c => c.id === userAnswer);
        return choice?.text || '선택한 답안';
    };

    const getCorrectChoiceText = () => {
        const choice = problem.choices?.find(c => c.id === problem.correctAnswer);
        return choice?.text || '정답';
    };

    const getVariationChoiceClass = (choiceId) => {
        if (!variationSubmitted) {
            return selectedVariationAnswer === choiceId ? 'selected' : '';
        }
        if (choiceId === variationProblem.correctAnswer) {
            return 'correct';
        }
        if (choiceId === selectedVariationAnswer && selectedVariationAnswer !== variationProblem.correctAnswer) {
            return 'incorrect';
        }
        return '';
    };

    return (
        <div className="page-wireframe">
            <TopNav />

            <main className="analysis-content">
                {/* Left Side - Problem Content */}
                <div className="analysis-left">
                    {/* Header with problem info */}
                    <div className="problem-header">
                        <button className="back-btn" onClick={() => navigate('/problem-solve')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="problem-meta">
                            <span className="problem-number">{problem.number}</span>
                            <span className="problem-title">{problem.year}학년도 {problem.examType === 'suneung' ? '수능' : problem.examType}</span>
                            <span className="problem-subtitle">{problem.number}번 문항</span>
                        </div>
                        <div className="problem-tags">
                            <span className="tag">독서</span>
                            <span className="tag difficulty">{isCorrect ? '정답' : '오답'}</span>
                            <span className="tag time">3분</span>
                        </div>
                    </div>

                    {/* Passage Area */}
                    <div className="passage-section">
                        <div className="passage-box filled">
                            <p className="passage-content"><MathText>{problem.passage}</MathText></p>
                        </div>
                    </div>

                    {/* Problem and Answer Section */}
                    <div className="answer-section">
                        <div className="answer-box filled">
                            <div className="question-row">
                                <span className="question-label">문제</span>
                                <p className="question-text"><MathText>{problem.question}</MathText></p>
                            </div>
                            <div className="submitted-answer-row">
                                <div className="answer-comparison">
                                    <div className="answer-item">
                                        <span className="answer-label">제출한 답</span>
                                        <span className={`answer-value ${!isCorrect ? 'wrong' : 'correct'}`}>
                                            {userAnswer}번: <MathText>{getUserChoiceText()}</MathText>
                                        </span>
                                    </div>
                                    {!isCorrect && (
                                        <div className="answer-item">
                                            <span className="answer-label">정답</span>
                                            <span className="answer-value correct">
                                                {problem.correctAnswer}번: <MathText>{getCorrectChoiceText()}</MathText>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Generate Variation Button */}
                    <div className="variation-button-container">
                        <button className="variation-btn" onClick={handleGenerateVariation}>
                            변형문제 생성
                        </button>
                    </div>
                </div>

                {/* Right Side - AI Chat */}
                <div className="analysis-right">
                    <div className="ai-chat-panel">
                        <h2 className="chat-title">AI</h2>

                        <div className="chat-messages">
                            {chatMessages.map((msg, index) => (
                                <div key={index} className={`chat-message ${msg.type}`}>
                                    <p><MathText>{msg.text}</MathText></p>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="chat-message ai typing">
                                    <p>AI가 답변을 작성 중입니다...</p>
                                </div>
                            )}
                        </div>

                        <div className="chat-input-container">
                            <input
                                type="text"
                                className="chat-input"
                                placeholder="AI에게 질문하세요..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isTyping}
                            />
                            <button
                                className="send-btn"
                                onClick={handleSendMessage}
                                disabled={isTyping || !chatInput.trim()}
                            >
                                전송
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Loading Modal */}
            {showLoadingModal && (
                <div className="modal-overlay loading-modal">
                    <div className="loading-content">
                        <div className="loading-robot">
                            <div className="robot-bubble">•••</div>
                            <div className="robot-icon">🤖</div>
                        </div>
                        <p className="loading-text">AI가 문제를 찾고 있어요</p>
                    </div>
                </div>
            )}

            {/* Variation Problem Modal */}
            {showVariationModal && (
                <div className="modal-overlay variation-modal-overlay">
                    <div className="variation-modal">
                        <button className="modal-close-btn" onClick={handleCloseVariation}>
                            ✕
                        </button>

                        <div className="variation-content">
                            {/* Left - Passage and Question */}
                            <div className="variation-left">
                                <h3 className="variation-title">Q1. ({variationProblem.subject})</h3>

                                <div className="variation-passage-box">
                                    <p><MathText>{variationProblem.passage}</MathText></p>
                                </div>

                                <div className="variation-question-box">
                                    <p><MathText>{variationProblem.question}</MathText></p>
                                </div>
                            </div>

                            {/* Right - Choices and Submit */}
                            <div className="variation-right">
                                <div className="difficulty-info">
                                    <div className="difficulty-row">
                                        <span className="difficulty-label">난이도</span>
                                        <span className="difficulty-value">{variationProblem.difficulty}</span>
                                    </div>
                                    <div className="difficulty-row">
                                        <span className="difficulty-label">보상</span>
                                        <span className="difficulty-value reward">🥫 {variationProblem.reward}</span>
                                    </div>
                                    <div className="timer-row">
                                        <span className="timer-label">남은 시간</span>
                                        <span className={`timer-value ${variationTimer <= 60 ? 'warning' : ''}`}>
                                            {formatTime(variationTimer)}
                                        </span>
                                    </div>
                                </div>

                                <div className="variation-choices">
                                    {variationProblem.choices.map((choice) => (
                                        <button
                                            key={choice.id}
                                            className={`variation-choice-btn ${getVariationChoiceClass(choice.id)}`}
                                            onClick={() => !variationSubmitted && setSelectedVariationAnswer(choice.id)}
                                            disabled={variationSubmitted}
                                        >
                                            <MathText>{choice.text}</MathText>
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className={`variation-submit-btn ${selectedVariationAnswer !== null ? 'active' : ''}`}
                                    onClick={handleVariationSubmit}
                                    disabled={selectedVariationAnswer === null || variationSubmitted}
                                >
                                    {variationSubmitted
                                        ? (selectedVariationAnswer === variationProblem.correctAnswer ? '🎉 정답!' : '오답')
                                        : '제출하기'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
