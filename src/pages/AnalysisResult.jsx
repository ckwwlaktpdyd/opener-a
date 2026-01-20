import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleProblems } from '../data/mockData';
import MathText from '../components/MathText';
import './AnalysisResult.css';

export default function AnalysisResult() {
    const navigate = useNavigate();

    // 문제 1번 데이터 사용
    const problem = sampleProblems[0];
    const userAnswer = 32; // 사용자가 선택한 오답
    const correctAnswer = 36; // 정답

    // 접힘/펼침 상태
    const [isProblemExpanded, setIsProblemExpanded] = useState(true);
    const [isConversationExpanded, setIsConversationExpanded] = useState(false);
    const [leftColMaxHeight, setLeftColMaxHeight] = useState('none');

    // 컬럼 refs
    const rightColRef = useRef(null);

    // 오른쪽 컬럼 높이 기준으로 왼쪽 컬럼 높이 동기화
    useEffect(() => {
        const syncHeight = () => {
            if (rightColRef.current) {
                const rightHeight = rightColRef.current.offsetHeight;
                setLeftColMaxHeight(`${rightHeight}px`);
            }
        };

        syncHeight();
        window.addEventListener('resize', syncHeight);
        return () => window.removeEventListener('resize', syncHeight);
    }, [isProblemExpanded, isConversationExpanded]);

    // 기출 문제와 대화 과정이 상호 배타적으로 동작하도록 토글 핸들러
    const handleProblemToggle = () => {
        setIsProblemExpanded(!isProblemExpanded);
        if (!isProblemExpanded) {
            setIsConversationExpanded(false);
        }
    };

    const handleConversationToggle = () => {
        setIsConversationExpanded(!isConversationExpanded);
        if (!isConversationExpanded) {
            setIsProblemExpanded(false);
        }
    };

    // AI 대화 내역 (ProblemSolve에서 사용된 시나리오)
    const conversationHistory = [
        {
            type: 'ai',
            text: '32번을 선택했네요.\\n\\n왜 이 답을 선택했는지 궁금해요.\\n\\n풀이 과정을 텍스트, 음성, 사진 업로드 중 편한 방식으로 공유해 주세요.\\n\\n어디서 사고가 어긋났는지 함께 찾아볼게요.'
        },
        {
            type: 'user',
            text: '나는 이런 문제 수열 조건이랑 집합 조건이 같이 나오는 유형을 자주 틀리는데, 어디서 잘못 생각했는지 잘 모르겠어. 연습장에 푼 사진을 올릴게.',
            hasImage: true
        },
        {
            type: 'ai',
            text: '풀이 과정을 보니,\\n\\n✅ aₙ = aₙ₊₁이 되는 조건만 먼저 확인하고\\n✅ 집합 A와 B의 교집합 개수 조건을 나중에 적용한 점에서 오류가 생겼어요.\\n\\n이 문제에서 핵심은\\n(n(A ∩ B) = 3) 이라는 조건이 어떤 항들이 같아야 하는지 먼저 정해주는 거예요.\\n\\n👉 그런데 왜\\naₙ = aₙ₊₁만 보고\\n34가 나온다고 판단했는지,\\n생각 과정을 조금 더 설명해 줄 수 있을까요?'
        },
        {
            type: 'user',
            text: '수열에서 값이 반복되면 교집합이 생긴다고 생각해서 aₙ = aₙ₊₁ 인 경우만 찾으면 된다고 봤어.'
        },
        {
            type: 'ai',
            text: '좋은 접근이었어요.\\n다만 이 문제에서는 "반복" 자체보다,\\n"A와 B에 동시에 속하는 항의 개수"가 핵심이에요.\\n\\n🔎 개념 정리\\n\\n집합 A, B가 수열의 항들로 구성될 때\\nn(A ∩ B) = 3 이라는 건\\n👉 두 집합에 동시에 포함되는 서로 다른 항이 정확히 3개라는 뜻이에요.\\n\\n즉,\\n단순히 값이 같아지는 순간만 보는 게 아니라,\\n어떤 항들이 A와 B에 공통으로 포함되는지를 먼저 정해야 해요.\\n\\n다음에는 이런 순서로 생각해보면 좋아요\\n\\n👉 교집합 조건이 "항의 개수"를 말하는지\\n👉 그 항들이 어떤 값인지\\n👉 그 다음에 수열의 규칙 적용하기'
        }
    ];

    return (
        <div className="page-wireframe">
            {/* Header */}
            <div className="analysis-header">
                <div className="analysis-header-left">
                    <button className="analysis-icon-btn" onClick={() => navigate('/scrapbook')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48">
                            <rect width="48" height="48" fill="#F4F4F5" rx="24" />
                            <path fill="#00B3AB" fillRule="evenodd" d="M31.5 18.5A1.5 1.5 0 0 0 30 20v.8c0 .11.09.2.2.2h2.6a.2.2 0 0 0 .2-.2V20a1.5 1.5 0 0 0-1.5-1.5Zm1.5 3.7a.2.2 0 0 0-.2-.2h-2.6a.2.2 0 0 0-.2.2v7.747a1 1 0 0 0 .168.555l1.166 1.748a.2.2 0 0 0 .332 0l1.166-1.748a1 1 0 0 0 .168-.555V22.2Zm-18-5.7v15a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5v-15a1.5 1.5 0 0 0-1.5-1.5h-11a1.5 1.5 0 0 0-1.5 1.5Zm7 3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm.5 1.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4Zm-.5 5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm.5 1.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4ZM18 26v1.5h1.5V26H18Zm-.5-1H20a.5.5 0 0 1 .5.5V28a.5.5 0 0 1-.5.5h-2.5a.5.5 0 0 1-.5-.5v-2.5a.5.5 0 0 1 .5-.5Zm3.354-5.146a.5.5 0 0 0-.707-.707L18.5 20.793l-.646-.646a.5.5 0 0 0-.707.707l1.353 1.353 2.354-2.354Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <h1 className="analysis-title">2024학년도 6월 모의고사</h1>
                </div>
                <div className="analysis-header-right">
                    <span className="analysis-meta">12번 문항</span>
                    <span className="analysis-meta">·</span>
                    <span className="analysis-meta">2025.12.08</span>
                    <span className="analysis-meta">·</span>
                    <span className="analysis-score">3점</span>
                </div>
            </div>

            <main className="analysis-main">
                {/* Left Column */}
                <div className="analysis-left-col" style={{ maxHeight: leftColMaxHeight }}>
                    {/* 기출 문제 (includes 답안 선택) */}
                    <div className={`analysis-section ${isProblemExpanded ? 'expanded' : ''}`}>
                        <button
                            className="section-header"
                            onClick={handleProblemToggle}
                        >
                            <span className="section-title">기출 문제</span>
                            <svg
                                className={`chevron ${isProblemExpanded ? 'expanded' : ''}`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {isProblemExpanded && (
                            <div className="section-content">
                                <div className="problem-text">
                                    <MathText>{problem.question}</MathText>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 답안 선택 - visually separate but controlled by problem toggle */}
                    {isProblemExpanded && (
                        <div className="analysis-section">
                            <div className="section-header-static">
                                <span className="section-title">답안 선택</span>
                                <span className="answer-status wrong">오답입니다</span>
                            </div>
                            <div className="section-content">
                                <div className="answer-comparison">
                                    <div className="answer-item wrong">
                                        <span className="answer-icon">✕</span>
                                        <span className="answer-label">{userAnswer}</span>
                                    </div>
                                    <div className="answer-item correct">
                                        <span className="answer-icon">✓</span>
                                        <span className="answer-label">{correctAnswer}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AI 튜터와의 대화 과정 */}
                    <div className={`analysis-section ${isConversationExpanded ? 'expanded' : ''}`}>
                        <button
                            className="section-header"
                            onClick={handleConversationToggle}
                        >
                            <span className="section-title">AI 튜터와의 대화 과정</span>
                            <svg
                                className={`chevron ${isConversationExpanded ? 'expanded' : ''}`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {isConversationExpanded && (
                            <div className="section-content conversation-content">
                                {conversationHistory.map((msg, idx) => (
                                    <div key={idx} className={`conversation-message ${msg.type}`}>
                                        {msg.hasImage && (
                                            <div className="message-image">
                                                <img src={new URL('../assets/sample-handwriting.png', import.meta.url).href} alt="풀이 과정" />
                                            </div>
                                        )}
                                        <div className="message-text">
                                            <MathText>{msg.text}</MathText>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="analysis-right-col" ref={rightColRef}>
                    {/* 프롬프트 내용 요약 */}
                    <div className="analysis-section">
                        <div className="section-header-static with-icon">
                            <div className="section-title-wrapper">
                                <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="#00B3AB" d="M14 20a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2h4ZM12 2c1.176 0 2.298.228 3.328.638a3.01 3.01 0 0 0 1 3.859l.106.066.06.094A3.01 3.01 0 0 0 19 8c.556 0 1.011-.149 1.362-.328a9 9 0 0 1-4 11.202 1 1 0 0 1-.485.126H8.124a1 1 0 0 1-.485-.126A9 9 0 0 1 12 2Zm0 5a1 1 0 0 0-.946.677l-.13.378c-.3.879-.99 1.57-1.87 1.87l-.377.129a1 1 0 0 0 0 1.892l.378.13c.88.3 1.57.99 1.87 1.87l.13.377a1 1 0 0 0 1.891 0l.13-.378c.3-.879.99-1.57 1.87-1.87l.377-.129a1 1 0 0 0 0-1.892l-.378-.13a3 3 0 0 1-1.87-1.87l-.129-.377A1 1 0 0 0 12 7Zm7-5c.361 0 .598.187.694.277.116.11.198.25.27.391a1 1 0 0 0 .4.386c.132.073.256.142.363.256a1.01 1.01 0 0 1 0 1.38c-.107.114-.23.183-.365.256a1 1 0 0 0-.4.386c-.077.144-.147.276-.268.39a1.01 1.01 0 0 1-1.39 0c-.12-.113-.19-.247-.267-.39a1 1 0 0 0-.4-.386 1.302 1.302 0 0 1-.364-.256 1.01 1.01 0 0 1 .001-1.38c.106-.106.229-.192.364-.256a1 1 0 0 0 .4-.386c.076-.143.147-.277.267-.39C18.4 2.186 18.638 2 19 2Z" />
                                </svg>
                                <span className="section-title">프롬프트 내용 요약</span>
                            </div>
                        </div>
                        <div className="section-content">
                            <p className="summary-text">
                                이 문제는 함수의 연속성과 미분가능성을 대한 깊은 이해를 요구합니다. 특히 구간의 정의된 함수의 경계점에서 연속과 미분가능 조건이 어떻게 적용되는지를 파악하는 것이 핵심입니다.
                            </p>
                            <p className="summary-text">
                                학생은 x = 1 에서의 좌미분계수와 우미분계수가 같아야 한다는 조건을 정확하게 활용했습니다. 다만, 좌미분을 한 극한에 값만 상수 대입 때 실수 항상지 완전히 보이지 않아야 유형이 되는 과정이 필요한 바로 직접이 문제적거나 바로의 적용하여 문제를 잘 해결할 수 있습니다.
                            </p>
                        </div>
                    </div>

                    {/* 사고 흐름 정리 */}
                    <div className="analysis-section">
                        <div className="section-header-static with-icon">
                            <div className="section-title-wrapper">
                                <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="#00B3AB" d="M5.5 2.5c1.025 0 1.904.617 2.29 1.5h8.71a4.5 4.5 0 1 1 0 9h-9a2.5 2.5 0 0 0 0 5h8.71a2.499 2.499 0 1 1 0 2H7.5a4.5 4.5 0 1 1 0-9h9a2.5 2.5 0 0 0 0-5H7.79A2.499 2.499 0 1 1 5.5 2.5Z" />
                                </svg>
                                <span className="section-title">사고 흐름 정리</span>
                            </div>
                        </div>
                        <div className="section-content">
                            <div className="section-content">
                                <div className="thinking-timeline">
                                    <div className="thinking-item">
                                        <div className="thinking-icon">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <circle cx="10" cy="10" r="9" fill="#14B8A6" />
                                                <path d="M6 10l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="thinking-content">
                                            <h4 className="thinking-title">사고 오류 포인트</h4>
                                            <p className="thinking-text">
                                                값이 반복된다는 직관에 집중하면서,<br />
                                                A와 B의 교집합 개수가 정확히 몇 개인지를 먼저 따져보지 못했어요.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="thinking-item">
                                        <div className="thinking-icon">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <circle cx="10" cy="10" r="9" fill="#14B8A6" />
                                                <path d="M6 10l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="thinking-content">
                                            <h4 className="thinking-title">핵심 개념 정리</h4>
                                            <p className="thinking-text">
                                                A와 B의 교집합 개수 조건은<br />
                                                서로 다른 수열 항들 중 같은 값이 되는 경우의 수를 정확히 제한하는 조건이에요.<br />
                                                따라서 단순한 반복 여부가 아니라,<br />
                                                어떤 항들이 같은 값을 가져야 하는지를 하나씩 확인하는 과정이 필요해요.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="thinking-item">
                                        <div className="thinking-icon">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <circle cx="10" cy="10" r="9" fill="#14B8A6" />
                                                <path d="M6 10l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="thinking-content">
                                            <h4 className="thinking-title">다음 학습 추천</h4>
                                            <p className="thinking-text">
                                                비슷한 유형의 문제에서<br />
                                                '교집합의 개수'나 '같은 값의 개수' 조건이 나오는 문제를 다시 풀어보며,<br />
                                                항을 직접 나열해 조건을 체크하는 연습을 해보세요.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Highlight Box */}
                                    <div className="thinking-highlight">
                                        조건의 개수는 직관으로 판단하지 말고, <strong>어떤 항들이 같아지는지 직접 대응시켜 확인</strong>해야 한다.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Disclaimer */}
            <div className="analysis-footer">
                <svg className="info-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#888888" strokeWidth="1.5" />
                    <path d="M8 7v4M8 5h.01" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="footer-text">
                    문제를 풀면서 AI 튜터와 나눈 대화를 바탕으로서고 흐름과 핵심 개념을 정리한 기록이에요.
                </span>
            </div>
        </div>
    );
}
