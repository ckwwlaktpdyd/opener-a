import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleProblems } from '../data/mockData';
import MathText from '../components/MathText';
import AITutorIcon from '../components/icons/AITutorIcon';
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
    const [messageCounter, setMessageCounter] = useState(0); // UT용 메시지 카운터

    // Variation problem states
    const [showVariationLoading, setShowVariationLoading] = useState(false);
    const [showVariationModal, setShowVariationModal] = useState(false);
    const [variationAnswer, setVariationAnswer] = useState(null);
    const [variationSubmitted, setVariationSubmitted] = useState(false);
    const [variationElapsedTime, setVariationElapsedTime] = useState(0);

    // 학습 결과 모달
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [learningStats, setLearningStats] = useState({
        totalTime: 0,
        correctCount: 0,
        wrongCount: 0,
        analysisCount: 0
    });

    const currentProblem = sampleProblems[currentProblemIndex];

    const handleSendMessage = () => {
        if (!chatInput.trim() || !showAnalysis) return;

        const currentCount = messageCounter;
        setMessageCounter(prev => prev + 1);

        // UT용 미리 정의된 시나리오
        const utScenario = [
            {
                user: '나는 이런 문제 수열 조건이랑 집합 조건이 같이 나오는 유형을 자주 틀리는데, 어디서 잘못 생각했는지 잘 모르겠어. 연습장에 푼 사진을 올릴게.',
                ai: `풀이 과정을 보니,\n\n✅ aₙ = aₙ₊₁이 되는 조건만 먼저 확인하고\n✅ 집합 A와 B의 교집합 개수 조건을 나중에 적용한 점에서 오류가 생겼어요.\n\n이 문제에서 핵심은\n(n(A ∩ B) = 3) 이라는 조건이 어떤 항들이 같아야 하는지 먼저 정해주는 거예요.\n\n👉 그런데 왜\naₙ = aₙ₊₁만 보고\n34가 나온다고 판단했는지,\n생각 과정을 조금 더 설명해 줄 수 있을까요?`,
                hasImage: true
            },
            {
                user: '수열에서 값이 반복되면 교집합이 생긴다고 생각해서 aₙ = aₙ₊₁ 인 경우만 찾으면 된다고 봤어.',
                ai: `좋은 접근이었어요.\n다만 이 문제에서는 "반복" 자체보다,\n"A와 B에 동시에 속하는 항의 개수"가 핵심이에요.\n\n🔎 개념 정리\n\n집합 A, B가 수열의 항들로 구성될 때\nn(A ∩ B) = 3 이라는 건\n👉 두 집합에 동시에 포함되는 서로 다른 항이 정확히 3개라는 뜻이에요.\n\n즉,\n단순히 값이 같아지는 순간만 보는 게 아니라,\n어떤 항들이 A와 B에 공통으로 포함되는지를 먼저 정해야 해요.\n\n다음에는 이런 순서로 생각해보면 좋아요\n\n👉 교집합 조건이 "항의 개수"를 말하는지\n👉 그 항들이 어떤 값인지\n👉 그 다음에 수열의 규칙 적용하기`,
                showVariationBtn: true
            }
        ];

        if (currentCount < utScenario.length) {
            const scenario = utScenario[currentCount];

            // 사용자 메시지 추가
            const userMsg = {
                type: 'user',
                text: scenario.user,
                time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
            };
            setChatHistory(prev => [...prev, userMsg]);

            // 이미지가 있다면 추가
            if (scenario.hasImage) {
                setTimeout(() => {
                    const imageMsg = {
                        type: 'user',
                        image: new URL('../assets/sample-handwriting.png', import.meta.url).href,
                        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
                    };
                    setChatHistory(prev => [...prev, imageMsg]);

                    // AI 응답
                    setTimeout(() => {
                        const aiResponse = {
                            type: 'ai',
                            text: scenario.ai,
                            time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
                        };
                        setChatHistory(prev => [...prev, aiResponse]);
                    }, 1000);
                }, 500);
            } else {
                // AI 응답
                setTimeout(() => {
                    const aiResponse = {
                        type: 'ai',
                        text: scenario.ai,
                        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
                    };
                    setChatHistory(prev => [...prev, aiResponse]);

                    // 변형문제 버튼 표시
                    if (scenario.showVariationBtn) {
                        setTimeout(() => {
                            const variationMsg = {
                                type: 'action',
                                actionType: 'variation',
                                text: '변형 문제 풀어보기',
                                description: '이제 같은 사고 흐름으로\n변형 문제를 하나 풀어보면서 연습해 볼까요?',
                                time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
                            };
                            setChatHistory(prev => [...prev, variationMsg]);
                        }, 1000);
                    }
                }, 1000);
            }
        }

        setChatInput('');
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
            // 현재 문제 통계 업데이트
            setLearningStats(prev => ({
                totalTime: prev.totalTime + elapsedTime,
                correctCount: prev.correctCount + (isCorrect ? 1 : 0),
                wrongCount: prev.wrongCount + (!isCorrect ? 1 : 0),
                analysisCount: prev.analysisCount + (showAnalysis ? 1 : 0)
            }));

            setCurrentProblemIndex(prev => prev + 1);
            // Reset states for new problem
            setSelectedAnswer(null);
            setIsSubmitted(false);
            setShowAnalysis(false);
            setChatHistory([]);
            setElapsedTime(0);
        } else {
            // 마지막 문제 통계 업데이트
            const finalStats = {
                totalTime: learningStats.totalTime + elapsedTime,
                correctCount: learningStats.correctCount + (isCorrect ? 1 : 0),
                wrongCount: learningStats.wrongCount + (!isCorrect ? 1 : 0),
                analysisCount: learningStats.analysisCount + (showAnalysis ? 1 : 0)
            };
            setLearningStats(finalStats);
            setShowCompletionModal(true);
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

        // AI 튜터가 먼저 질문하기
        if (!isCorrect && chatHistory.length === 0) {
            setTimeout(() => {
                const initialMessage = {
                    type: 'ai',
                    text: `${selectedAnswer}번을 선택했네요.\n\n왜 이 답을 선택했는지 궁금해요.\n\n풀이 과정을 텍스트, 음성, 사진 업로드 중 편한 방식으로 공유해 주세요.\n\n어디서 사고가 어긋났는지 함께 찾아볼게요.`,
                    time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
                };
                setChatHistory([initialMessage]);
            }, 300);
        } else if (isCorrect && chatHistory.length === 0) {
            setTimeout(() => {
                const initialMessage = {
                    type: 'ai',
                    text: '정답이에요! 🎉 혹시 이 문제에 대해 더 궁금한 점이 있으신가요?',
                    time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
                };
                setChatHistory([initialMessage]);
            }, 300);
        }
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
                            <p className="problem-text"><MathText>{currentProblem.question}</MathText></p>
                        </div>
                    </div>

                    {/* Answer Card */}
                    <div className="answer-card">
                        <div className="answer-title-row">
                            <div className="answer-title">답안 선택</div>
                            {isSubmitted && isCorrect && (
                                <div className="result-badge correct">
                                    <div className="result-icon-small correct">✓</div>
                                    <span>정답입니다</span>
                                </div>
                            )}
                            {isSubmitted && !isCorrect && (
                                <div className="result-badge incorrect">
                                    <div className="result-icon-small incorrect">✕</div>
                                    <span>오답입니다</span>
                                </div>
                            )}
                        </div>
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
                                        <span><MathText>{c.text}</MathText></span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Button */}
                    {!isSubmitted ? (
                        <button className={`submit-btn ${selectedAnswer ? 'active' : ''}`} onClick={() => selectedAnswer && setIsSubmitted(true)} disabled={!selectedAnswer}>답안제출</button>
                    ) : !showAnalysis ? (
                        <div className="button-row">
                            <button className="analysis-btn" onClick={handleAnalysisClick}><span className="btn-icon">📊</span>오프너 분석 보기</button>
                            <button className={`circular-next inline ${isSubmitted ? 'active' : ''}`} onClick={handleNextProblem} disabled={!isSubmitted}>
                                <span>{currentProblemIndex < sampleProblems.length - 1 ? '다음' : '학습종료'}</span><span className="arrow">›</span>
                            </button>
                        </div>
                    ) : (
                        <div className="button-row">
                            <button className={`circular-next inline ${isSubmitted ? 'active' : ''}`} onClick={handleNextProblem} disabled={!isSubmitted}>
                                <span>{currentProblemIndex < sampleProblems.length - 1 ? '다음' : '학습종료'}</span><span className="arrow">›</span>
                            </button>
                        </div>
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
                                {msg.type === 'ai' && (
                                    <div className="msg-icon">
                                        <AITutorIcon size={34} />
                                    </div>
                                )}
                                <div className="msg-content">
                                    {msg.title && <div className="msg-title"><MathText>{msg.title}</MathText></div>}
                                    {msg.image ? (
                                        <div className="msg-image">
                                            <img src={msg.image} alt="User submitted work" />
                                        </div>
                                    ) : msg.type === 'action' && msg.actionType === 'variation' ? (
                                        <div className="variation-wrapper">
                                            {msg.description && <div className="variation-description"><MathText>{msg.description}</MathText></div>}
                                            <button className="msg-action-btn" onClick={handleVariationClick}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                                    <path fill="#fff" fillRule="evenodd" d="M13.455 1c.158 0 .313.035.456.1l.137.077.126.096c.078.069.145.15.2.238l.074.14 1.163 2.666a.66.66 0 0 1 .031.43c.015.083.024.167.024.253v10c0 .085-.01.17-.024.252a.66.66 0 0 1-.031.43l-1.163 2.667a1.084 1.084 0 0 1-.993.65h-6.91a1.086 1.086 0 0 1-.994-.65l-1.163-2.666a.661.661 0 0 1-.032-.43A1.497 1.497 0 0 1 4.333 15V5c0-.086.008-.17.023-.254a.661.661 0 0 1 .032-.429L5.551 1.65l.074-.14a1.084 1.084 0 0 1 .92-.51h6.91ZM6.708 17.667h6.583L13.8 16.5H6.2l.508 1.167Zm6.807-7.679a3.31 3.31 0 0 0-1.988 1.5l-.084.15a4.642 4.642 0 0 1-3.891 2.464l-1.886.086V15a.167.167 0 0 0 .167.167h8.333a.167.167 0 0 0 .167-.167V9.77l-.818.218ZM13.2 7.235a3.058 3.058 0 0 0-2.452.994 4.387 4.387 0 0 1-2.562 1.383l-2.52.398v2.843l1.825-.082a3.31 3.31 0 0 0 2.774-1.758A4.642 4.642 0 0 1 13.172 8.7l1.161-.31V7.305l-1.133-.07ZM5.833 4.833A.167.167 0 0 0 5.666 5v3.66l2.311-.364.255-.052a3.055 3.055 0 0 0 1.53-.912 4.392 4.392 0 0 1 3.275-1.436l.246.009 1.05.064V5a.167.167 0 0 0-.167-.166H5.833ZM6.199 3.5H13.8l-.51-1.167H6.708L6.199 3.5Z" clipRule="evenodd" />
                                                </svg>
                                                <span className="msg-text"><MathText>{msg.text}</MathText></span>
                                            </button>
                                        </div>
                                    ) : msg.text && (
                                        <div className="msg-text"><MathText>{msg.text}</MathText></div>
                                    )}
                                    {msg.time && <div className="msg-time">{msg.time}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="ai-footer">
                        <div className="ai-input-row">
                            <button className="ai-plus-btn" disabled={!showAnalysis}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                            <div className="ai-input-wrap">
                                <input
                                    type="text"
                                    placeholder="질문을 입력하세요."
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    disabled={!showAnalysis}
                                />
                                <button className="ai-mic-btn" disabled={!showAnalysis}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 1.25C8.61929 1.25 7.5 2.36929 7.5 3.75V10C7.5 11.3807 8.61929 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10V3.75C12.5 2.36929 11.3807 1.25 10 1.25Z" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M5 9.375C5 9.02982 4.72018 8.75 4.375 8.75C4.02982 8.75 3.75 9.02982 3.75 9.375C3.75 12.2734 6.10156 14.625 9 14.625V16.875H7.5C7.15482 16.875 6.875 17.1548 6.875 17.5C6.875 17.8452 7.15482 18.125 7.5 18.125H12.5C12.8452 18.125 13.125 17.8452 13.125 17.5C13.125 17.1548 12.8452 16.875 12.5 16.875H11V14.625C13.8984 14.625 16.25 12.2734 16.25 9.375C16.25 9.02982 15.9702 8.75 15.625 8.75C15.2798 8.75 15 9.02982 15 9.375C15 11.5842 13.2091 13.375 11 13.375H9C6.79086 13.375 5 11.5842 5 9.375Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="ai-disclaimer">AI 답변은 오류가 있을 수 있으니 교차 검증을 권장합니다.</div>
                    </div>
                </div>
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
                            <p className="variation-question"><MathText>{currentProblem.variationProblem.question}</MathText></p>

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
                                            <span><MathText>{c.text}</MathText></span>
                                        </button>
                                    );
                                })}
                            </div>

                            {!variationSubmitted ? (
                                <button className={`variation-submit ${variationAnswer ? 'active' : ''}`} onClick={() => variationAnswer && setVariationSubmitted(true)} disabled={!variationAnswer}>제출하기</button>
                            ) : (
                                <>
                                    <div className={`variation-result ${isVariationCorrect ? 'correct' : 'incorrect'}`}>
                                        {isVariationCorrect ? '✓ 정답입니다!' : '✕ 오답입니다.'}
                                    </div>

                                    {currentProblem.variationProblem.explanation && (
                                        <div className="variation-explanation">
                                            <div className="variation-explanation-title">📝 해설</div>
                                            <div className="variation-explanation-content">
                                                <MathText>{currentProblem.variationProblem.explanation}</MathText>
                                            </div>
                                        </div>
                                    )}

                                    <button className="variation-back-btn" onClick={handleCloseVariationModal}>
                                        원래 문제로 돌아가기
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Completion Modal */}
            {showCompletionModal && (
                <div className="completion-modal-overlay">
                    <div className="completion-modal">
                        <div className="completion-icon">🎉</div>
                        <h2 className="completion-title">모든 문제 풀이를 마쳤어요</h2>
                        <p className="completion-subtitle">학습 결과를 확인해보세요</p>

                        <div className="completion-stats">
                            <div className="completion-stat-row">
                                <span className="stat-label">풀이 시간</span>
                                <span className="stat-value">{formatTime(learningStats.totalTime)}</span>
                            </div>
                            <div className="completion-stat-row">
                                <span className="stat-label">정답 수</span>
                                <span className="stat-value">{learningStats.correctCount}</span>
                            </div>
                            <div className="completion-stat-row">
                                <span className="stat-label">오답 수</span>
                                <span className="stat-value">{learningStats.wrongCount}</span>
                            </div>
                            <div className="completion-stat-row">
                                <span className="stat-label">오프너 분석 수</span>
                                <span className="stat-value">{learningStats.analysisCount}</span>
                            </div>
                        </div>

                        <button className="completion-dashboard-btn" onClick={() => navigate('/dashboard')}>
                            대시보드로 이동하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
