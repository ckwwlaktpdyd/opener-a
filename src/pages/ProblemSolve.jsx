import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import TopNav from '../components/TopNav';
import './ProblemSolve.css';

// 수능 수학 문제 데이터
const koreanProblems = [
    {
        id: 1,
        subject: '수학',
        number: 1,
        year: '2024',
        examType: 'suneung',
        passage: `다음 물음에 답하시오.

함수 f(x) = x³ - 3x² + 2에 대하여 다음을 구하시오.`,
        question: `함수 f(x)의 극댓값과 극솟값의 합은?`,
        choices: [
            { id: 1, text: '-2' },
            { id: 2, text: '0' },
            { id: 3, text: '2' },
            { id: 4, text: '4' },
            { id: 5, text: '6' },
        ],
        correctAnswer: 2
    },
    {
        id: 2,
        subject: '수학',
        number: 2,
        year: '2024',
        examType: 'suneung',
        passage: `다음 물음에 답하시오.

등차수열 {aₙ}에서 a₃ = 7, a₇ = 19일 때, 다음을 구하시오.`,
        question: `이 수열의 첫째항부터 제10항까지의 합 S₁₀은?`,
        choices: [
            { id: 1, text: '145' },
            { id: 2, text: '150' },
            { id: 3, text: '155' },
            { id: 4, text: '160' },
            { id: 5, text: '165' },
        ],
        correctAnswer: 3
    }
];

export default function ProblemSolve() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userCans, useCan } = useUser();
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(600); // 10분
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [showAnalysis, setShowAnalysis] = useState(false);

    const currentProblem = koreanProblems[currentProblemIndex];
    const selectedAnswer = selectedAnswers[currentProblemIndex];
    const isCorrect = selectedAnswer === currentProblem.correctAnswer;

    useEffect(() => {
        if (timeLeft > 0 && !isSubmitted) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, isSubmitted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSelectAnswer = (choiceId) => {
        if (!isSubmitted) {
            setSelectedAnswers({
                ...selectedAnswers,
                [currentProblemIndex]: choiceId
            });
        }
    };

    const handleSubmit = () => {
        if (selectedAnswer !== undefined) {
            setIsSubmitted(true);
        }
    };

    const handleStartAnalysis = () => {
        if (useCan()) {
            setShowAnalysis(true);
            // AI 분석 내용을 채팅에 추가
            setChatHistory([
                {
                    type: 'ai',
                    text: '문제 이해력이 부족하여 틀렸습니다. 지문을 더 꼼꼼히 읽고 핵심 내용을 파악하는 연습이 필요합니다.',
                    isAnalysis: true
                }
            ]);
        }
    };



    const handlePrevious = () => {
        if (currentProblemIndex > 0) {
            setCurrentProblemIndex(currentProblemIndex - 1);
            setIsSubmitted(false);
            setShowCanModal(false);
        }
    };

    const handleNext = () => {
        if (currentProblemIndex < koreanProblems.length - 1) {
            setCurrentProblemIndex(currentProblemIndex + 1);
            setIsSubmitted(false);
            setShowAnalysis(false);
            setChatHistory([]);
        } else {
            // 마지막 문제일 때 대시보드로 이동
            navigate('/dashboard');
        }
    };

    const getChoiceClass = (choiceId) => {
        if (!isSubmitted) {
            return selectedAnswer === choiceId ? 'selected' : '';
        }
        if (choiceId === currentProblem.correctAnswer) {
            return 'correct';
        }
        if (choiceId === selectedAnswer && selectedAnswer !== currentProblem.correctAnswer) {
            return 'incorrect';
        }
        return '';
    };

    const handleSendMessage = () => {
        if (chatMessage.trim()) {
            // 사용자 메시지 추가
            setChatHistory(prev => [...prev, {
                type: 'user',
                text: chatMessage
            }]);

            const userQuestion = chatMessage.toLowerCase();
            setChatMessage('');

            // AI 응답 생성 (문제 내용 기반)
            setTimeout(() => {
                let aiResponse = '';

                // 질문 유형에 따른 답변
                if (userQuestion.includes('극값') || userQuestion.includes('극댓값') || userQuestion.includes('극솟값')) {
                    aiResponse = '극값을 구하려면 먼저 f\'(x) = 3x² - 6x를 구해야 합니다. f\'(x) = 0이 되는 x값은 x = 0, x = 2입니다. 이 점들에서 극값을 가지게 됩니다.';
                } else if (userQuestion.includes('미분') || userQuestion.includes('도함수')) {
                    aiResponse = 'f(x) = x³ - 3x² + 2를 미분하면 f\'(x) = 3x² - 6x가 됩니다. 각 항을 거듭제곱 법칙으로 미분하면 됩니다.';
                } else if (userQuestion.includes('계산') || userQuestion.includes('어떻게')) {
                    aiResponse = 'x = 0일 때 f(0) = 2 (극댓값), x = 2일 때 f(2) = -2 (극솟값)입니다. 따라서 극댓값과 극솟값의 합은 2 + (-2) = 0입니다.';
                } else if (userQuestion.includes('왜') || userQuestion.includes('이유')) {
                    aiResponse = '극값은 함수의 증가/감소가 바뀌는 지점에서 나타납니다. f\'(x) = 0인 점에서 부호가 바뀌는지 확인하면 극값 여부를 알 수 있습니다.';
                } else if (userQuestion.includes('답') || userQuestion.includes('정답')) {
                    aiResponse = '정답은 0입니다. 극댓값 2와 극솟값 -2를 더하면 0이 됩니다.';
                } else {
                    aiResponse = '좋은 질문입니다! 이 문제는 3차 함수의 극값을 구하는 문제입니다. 미분을 이용하여 f\'(x) = 0인 점을 찾고, 그 점에서의 함수값을 구하면 됩니다.';
                }

                setChatHistory(prev => [...prev, {
                    type: 'ai',
                    text: aiResponse
                }]);
            }, 800);
        }
    };

    return (
        <div className="problem-solve-page">
            {/* Top Header */}
            <div className="solve-header">
                <button className="close-btn" onClick={() => navigate(-1)}>✕</button>
                <div className="problem-number">{currentProblem.number}</div>
            </div>

            <div className="solve-container">
                {/* Left Side - Problem Content */}
                <div className="solve-left">
                    {/* Problem Info Badge */}
                    <div className="problem-info-badge">
                        <span className="badge-icon">📝</span>
                        <div className="badge-text">
                            <div className="badge-title">{currentProblem.year}학년도 수능 {currentProblem.number}번</div>
                            <div className="badge-subject">{currentProblem.subject}</div>
                        </div>
                        <button className="stopwatch-btn">⏱️ 스톱워치</button>
                    </div>

                    {/* Problem Section */}
                    <div className="problem-section">
                        <div className="section-title">문제</div>
                        <div className="section-content">
                            <div className="passage-text">{currentProblem.passage}</div>
                            <div className="question-text">{currentProblem.question}</div>
                            {showAnalysis && (
                                <div className="user-answer-display">
                                    <strong>유저가 적은답:</strong> {selectedAnswer}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Answer/Choices Section */}
                    <div className="answer-section">
                        <div className="section-title">답안/선택지 영역</div>
                        <div className="choices-grid">
                            {currentProblem.choices.map((choice) => (
                                <button
                                    key={choice.id}
                                    className={`choice-item ${getChoiceClass(choice.id)}`}
                                    onClick={() => handleSelectAnswer(choice.id)}
                                    disabled={isSubmitted}
                                >
                                    <span className="choice-num">{choice.id}</span>
                                    <span className="choice-label">{choice.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Result Message */}
                    {isSubmitted && (
                        <div className={`result-banner ${isCorrect ? 'correct' : 'incorrect'}`}>
                            {isCorrect ? '🎉 정답입니다!' : '❌ 오답입니다'}
                        </div>
                    )}

                    {/* Submit/Analysis Button - Transforms based on state */}
                    {!showAnalysis && (
                        <button
                            className={
                                isSubmitted
                                    ? 'analysis-btn'
                                    : `submit-answer-btn ${selectedAnswer !== undefined ? 'active' : ''}`
                            }
                            onClick={isSubmitted ? handleStartAnalysis : handleSubmit}
                            disabled={!isSubmitted && selectedAnswer === undefined}
                        >
                            {isSubmitted ? '오프너 분석 보기' : '답안제출'}
                        </button>
                    )}

                    {/* Variation Problem Button */}
                    {showAnalysis && (
                        <button 
                            className="variation-btn"
                            onClick={() => alert('구현되지 않았습니다.')}
                        >
                            변형문제생성
                        </button>
                    )}
                </div>

                {/* Right Side - AI Chat Panel */}
                <div className="solve-right">
                    {showAnalysis ? (
                        <div className="ai-chat-panel">
                            <div className="ai-panel-header">
                                <span className="ai-label">AI</span>
                                <button className="info-btn">ⓘ</button>
                            </div>
                            <div className="chat-messages">
                                {chatHistory.length === 0 ? (
                                    <div className="chat-placeholder">
                                        <div className="ai-icon">🤖</div>
                                        <p>AI에게 질문해보세요</p>
                                    </div>
                                ) : (
                                    chatHistory.map((msg, idx) => (
                                        <div key={idx} className={`chat-bubble ${msg.type} ${msg.isAnalysis ? 'analysis' : ''}`}>
                                            {msg.isAnalysis && <div className="analysis-icon">🤖</div>}
                                            {msg.text}
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="chat-input-area">
                                <input
                                    type="text"
                                    className="chat-input"
                                    placeholder="질문을 입력하세요"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button className="send-btn" onClick={handleSendMessage}>전송</button>
                            </div>
                        </div>
                    ) : (
                        <div className="ai-panel-hidden">
                            {/* AI 영역 숨김 상태 */}
                        </div>
                    )}
                </div>

                {/* Circular Next Button */}
                {isSubmitted && (
                    <button
                        className="circular-next-btn"
                        onClick={handleNext}
                    >
                        {currentProblemIndex === koreanProblems.length - 1 ? '학습 종료' : '다음 →'}
                    </button>
                )}
            </div>
        </div>
    );
}
