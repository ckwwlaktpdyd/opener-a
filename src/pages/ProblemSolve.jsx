import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleProblems } from '../data/mockData';
import './ProblemSolve.css';

// AI 답변 템플릿
const getAIResponseForProblem = (problemId, userMessage) => {
    // 15번 문항 (수열 문제) 관련 답변
    if (problemId === 1) {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('부분분수') || lowerMessage.includes('분해')) {
            return '부분분수 분해는 이 문제의 핵심입니다!\n\n1/(aₖ × aₖ₊₁) = 1/((2k+1)(2k+3))\n이것을 부분분수로 분해하면\n= (1/2)[1/(2k+1) - 1/(2k+3)]\n\n이렇게 분해하면 telescoping sum으로 간단하게 계산할 수 있어요.';
        }

        if (lowerMessage.includes('시그마') || lowerMessage.includes('합')) {
            return '시그마 계산은 부분분수 분해 후 telescoping을 활용합니다.\n\nΣ(k=1~20) = (1/2)[(1/3-1/5)+(1/5-1/7)+...+(1/41-1/43)]\n\n중간 항들이 소거되고\n= (1/2)[1/3 - 1/43] = (1/2) × 40/129 = 20/129\n\n따라서 정답은 3번입니다!';
        }

        if (lowerMessage.includes('왜') || lowerMessage.includes('이유') || lowerMessage.includes('어떻게')) {
            return '좋은 질문이에요!\n\n이 문제는 수열의 일반항 aₙ = 2n + 1을 이용해서\n1/(aₖ × aₖ₊₁)를 부분분수로 분해하는 것이 핵심입니다.\n\n부분분수 분해를 하면 telescoping sum이 되어\n대부분의 항이 소거되고 첫 항과 마지막 항만 남게 됩니다.\n\n더 궁금한 부분이 있으면 구체적으로 질문해주세요!';
        }

        return '좋은 질문입니다! 이 문제는 수열과 부분분수 분해가 핵심이에요.\n\n구체적으로 어떤 부분이 궁금하신가요?\n- 일반항 구하는 방법\n- 부분분수 분해\n- 시그마 계산 과정\n\n질문을 더 구체적으로 해주시면 자세히 설명해드릴게요!';
    }

    // 21번 문항 (극값 문제) 관련 답변
    if (problemId === 2) {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('미분') || lowerMessage.includes('도함수')) {
            return 'f\'(x) = 3x² - 12x + 9 = 3(x-1)(x-3)로 인수분해할 수 있습니다.\n\nf\'(x) = 0이 되는 x는 1과 3이므로\n이 두 점에서 극값을 가집니다.';
        }

        if (lowerMessage.includes('극값') || lowerMessage.includes('극대') || lowerMessage.includes('극소')) {
            return 'x=1에서 극댓값, x=3에서 극솟값을 가집니다.\n\nf(1) = 1 - 6 + 9 + 2 = 6\nf(3) = 27 - 54 + 27 + 2 = 2\n\n따라서 M - m = 6 - 2 = 4입니다!';
        }

        return '미분을 이용한 극값 문제입니다.\n\nf\'(x)를 구하고, f\'(x) = 0인 점을 찾아\n각 점에서의 함숫값을 구하면 됩니다.\n\n어떤 부분이 궁금하신가요?';
    }

    return '질문에 대해 더 자세히 설명해주시면 도움을 드릴 수 있어요!';
};

export default function ProblemSolve() {
    const navigate = useNavigate();
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    // Variation problem states
    const [showVariationLoading, setShowVariationLoading] = useState(false);
    const [showVariationModal, setShowVariationModal] = useState(false);
    const [variationAnswer, setVariationAnswer] = useState(null);
    const [variationSubmitted, setVariationSubmitted] = useState(false);
    const [variationElapsedTime, setVariationElapsedTime] = useState(0);

    const currentProblem = sampleProblems[currentProblemIndex];

    const handleSendMessage = () => {
        if (!chatInput.trim() || !showAnalysis) return;

        const userMsg = { type: 'user', text: chatInput, time: '오전 ' + new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) };
        setChatHistory(prev => [...prev, userMsg]);
        const userQuestion = chatInput;
        setChatInput('');

        // AI response based on problem
        setTimeout(() => {
            const aiResponseText = getAIResponseForProblem(currentProblem.id, userQuestion);
            const aiResponse = { type: 'ai', text: aiResponseText, time: '오전 ' + new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) };
            setChatHistory(prev => [...prev, aiResponse]);
        }, 1000);
    };

    const handleVariationClick = () => {
        setShowVariationLoading(true);
        setTimeout(() => {
            setShowVariationLoading(false);
            setShowVariationModal(true);
            setVariationElapsedTime(0);
        }, 2000);
    };

    const handleCloseVariationModal = () => {
        setShowVariationModal(false);
        setVariationAnswer(null);
        setVariationSubmitted(false);
        setVariationElapsedTime(0);
    };

    const handleNextProblem = () => {
        if (currentProblemIndex < sampleProblems.length - 1) {
            setCurrentProblemIndex(prev => prev + 1);
            // Reset states for new problem
            setSelectedAnswer(null);
            setIsSubmitted(false);
            setShowAnalysis(false);
            setChatHistory([]);
            setElapsedTime(0);
        } else {
            navigate('/dashboard');
        }
    };

    // Elapsed timer for main problem
    useEffect(() => {
        if (!isSubmitted) {
            const timer = setInterval(() => setElapsedTime(prev => prev + 1), 1000);
            return () => clearInterval(timer);
        }
    }, [isSubmitted]);

    // Variation problem elapsed timer
    useEffect(() => {
        if (showVariationModal && !variationSubmitted) {
            const timer = setInterval(() => setVariationElapsedTime(prev => prev + 1), 1000);
            return () => clearInterval(timer);
        }
    }, [showVariationModal, variationSubmitted]);

    const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    const isCorrect = selectedAnswer === currentProblem.correctAnswer;
    const isVariationCorrect = variationAnswer === currentProblem.variationProblem?.correctAnswer;

    const handleAnalysisClick = () => {
        setShowAnalysis(true);
    };

    return (
        <div className="problem-solve-page">
            <div className="solve-header">
                <button className="close-btn" onClick={() => navigate('/dashboard')}>✕</button>
                <div className="header-points">
                    <svg className="points-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1.66699L3.33333 3.33366V16.667L5 18.3337H15L16.6667 16.667V3.33366L15 1.66699H5ZM5 3.33366H15V16.667H5V3.33366ZM7.5 5.83366V7.50033H12.5V5.83366H7.5ZM7.5 9.16699V10.8337H12.5V9.16699H7.5ZM7.5 12.5003V14.167H10.8333V12.5003H7.5Z" fill="#00B3AB" />
                    </svg>
                    <span>10</span>
                </div>
            </div>

            <div className="solve-content">
                {/* Problem Area */}
                <div className="problem-area">
                    {/* Problem Card */}
                    <div className="problem-card">
                        <div className="problem-header">
                            <div className="problem-meta">
                                <div className="problem-badge">{currentProblem.number}</div>
                                <div className="problem-info">
                                    <div className="problem-title">{currentProblem.year} {currentProblem.examType}</div>
                                    <div className="problem-subtitle">{currentProblem.number}번 문항</div>
                                </div>
                            </div>
                            <div className="problem-stats">
                                <div className="difficulty-badge">{currentProblem.difficulty}점</div>
                                <div className="timer-display"><span className="timer-icon">⏱</span><span>{formatTime(elapsedTime)}</span></div>
                            </div>
                        </div>
                        <div className="problem-content">
                            <p className="problem-text">{currentProblem.question}</p>
                        </div>
                        {isSubmitted && isCorrect && (
                            <div className="result-banner correct">
                                <div className="result-icon correct">✓</div>
                                <span>정답입니다.</span>
                            </div>
                        )}
                        {isSubmitted && !isCorrect && (
                            <div className="result-banner incorrect">
                                <div className="result-icon incorrect">✕</div>
                                <span>오답입니다.</span>
                            </div>
                        )}
                    </div>

                    {/* Answer Card */}
                    <div className="answer-card">
                        <div className="answer-title">답안 선택</div>
                        <div className="answer-choices">
                            {currentProblem.choices.map((c) => {
                                const sel = selectedAnswer === c.id;
                                const cor = c.id === currentProblem.correctAnswer;
                                const inc = isSubmitted && sel && !cor;
                                let cls = 'choice-option';
                                if (isSubmitted) { if (cor) cls += ' correct'; else if (inc) cls += ' incorrect'; }
                                else if (sel) cls += ' selected';

                                return (
                                    <button key={c.id} className={cls} onClick={() => !isSubmitted && setSelectedAnswer(c.id)} disabled={isSubmitted}>
                                        <div className={`choice-radio ${isSubmitted && cor ? 'correct' : inc ? 'incorrect' : ''}`}>
                                            {isSubmitted && cor && <span>✓</span>}
                                            {inc && <span>✕</span>}
                                        </div>
                                        <span>{c.text}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Button */}
                    {!isSubmitted ? (
                        <button className={`submit-btn ${selectedAnswer ? 'active' : ''}`} onClick={() => selectedAnswer && setIsSubmitted(true)} disabled={!selectedAnswer}>답안제출</button>
                    ) : !showAnalysis ? (
                        <button className="analysis-btn" onClick={handleAnalysisClick}><span className="btn-icon">📊</span>오프너 분석 보기</button>
                    ) : (
                        <button className={`variation-btn ${isCorrect ? 'disabled' : ''}`} onClick={handleVariationClick} disabled={isCorrect}>📝 변형 문제 풀어보기</button>
                    )}
                </div>

                {/* AI Tutor */}
                <div className={`ai-sidebar ${showAnalysis ? 'active' : ''}`}>
                    <div className="ai-header">
                        <div className="ai-title"><span className="ai-dot"></span><span>AI 튜터</span></div>
                        <button className="ai-info-btn">ⓘ</button>
                    </div>
                    <div className="ai-content">
                        {showAnalysis && chatHistory.map((msg, idx) => (
                            <div key={idx} className={`chat-msg ${msg.type}`}>
                                {msg.title && <div className="msg-title">{msg.title}</div>}
                                <div className="msg-text">{msg.text}</div>
                                {msg.time && <div className="msg-time">{msg.time}</div>}
                            </div>
                        ))}
                    </div>
                    <div className="ai-footer">
                        <div className="ai-input-wrap">
                            <input
                                type="text"
                                placeholder="질문을 입력하세요."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                disabled={!showAnalysis}
                            />
                            <button className="ai-send" onClick={handleSendMessage} disabled={!showAnalysis}>▷</button>
                        </div>
                        {showAnalysis && <div className="ai-disclaimer">AI 답변은 오류가 있을 수 있으니 교차 검증을 권장합니다.</div>}
                    </div>
                </div>

                {/* Next Button */}
                <button className={`circular-next ${isSubmitted ? 'active' : ''}`} onClick={handleNextProblem} disabled={!isSubmitted}>
                    <span>{currentProblemIndex < sampleProblems.length - 1 ? '다음' : '완료'}</span><span className="arrow">›</span>
                </button>
            </div>

            {/* Variation Loading Screen */}
            {showVariationLoading && (
                <div className="variation-loading-overlay">
                    <div className="variation-loading-content">
                        <div className="loading-spinner-wrapper">
                            <svg className="loading-spinner-svg" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M40 6.66699C21.6 6.66699 6.66669 21.6003 6.66669 40.0003C6.66669 58.4003 21.6 73.3337 40 73.3337C58.4 73.3337 73.3334 58.4003 73.3334 40.0003C73.3334 21.6003 58.4 6.66699 40 6.66699ZM53.3334 43.3337H43.3334V53.3337H36.6667V43.3337H26.6667V36.667H36.6667V26.667H43.3334V36.667H53.3334V43.3337Z" fill="#00B3AB" />
                            </svg>
                        </div>
                        <div className="loading-text">AI가 당신의 오답 논리를 바탕으로<br />문제를 제작 중입니다.</div>
                    </div>
                </div>
            )}

            {/* Variation Problem Modal */}
            {showVariationModal && currentProblem.variationProblem && (
                <div className="variation-modal-overlay" onClick={handleCloseVariationModal}>
                    <div className="variation-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="variation-modal-header">
                            <h3>변형문제</h3>
                            <div className="variation-header-right">
                                <div className="variation-timer">⏱ {formatTime(variationElapsedTime)}</div>
                                <button className="variation-close" onClick={handleCloseVariationModal}>✕</button>
                            </div>
                        </div>
                        <div className="variation-modal-body">
                            <p className="variation-question">{currentProblem.variationProblem.question}</p>

                            <div className="variation-section-title">답안 선택</div>
                            <div className="variation-choices">
                                {currentProblem.variationProblem.choices.map((c) => {
                                    const sel = variationAnswer === c.id;
                                    const cor = c.id === currentProblem.variationProblem.correctAnswer;
                                    const inc = variationSubmitted && sel && !cor;
                                    let cls = 'variation-choice';
                                    if (variationSubmitted) { if (cor) cls += ' correct'; else if (inc) cls += ' incorrect'; }
                                    else if (sel) cls += ' selected';

                                    return (
                                        <button key={c.id} className={cls} onClick={() => !variationSubmitted && setVariationAnswer(c.id)} disabled={variationSubmitted}>
                                            <div className={`variation-radio ${variationSubmitted && cor ? 'correct' : inc ? 'incorrect' : ''}`}>
                                                {variationSubmitted && cor && <span>✓</span>}
                                                {inc && <span>✕</span>}
                                            </div>
                                            <span>{c.text}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {!variationSubmitted ? (
                                <button className={`variation-submit ${variationAnswer ? 'active' : ''}`} onClick={() => variationAnswer && setVariationSubmitted(true)} disabled={!variationAnswer}>제출하기</button>
                            ) : (
                                <div className={`variation-result ${isVariationCorrect ? 'correct' : 'incorrect'}`}>
                                    {isVariationCorrect ? '✓ 정답입니다!' : '✕ 오답입니다.'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
