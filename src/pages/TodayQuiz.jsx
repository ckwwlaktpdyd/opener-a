import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todayQuiz } from '../data/mockData';
import './TodayQuiz.css';

export default function TodayQuiz() {
    const navigate = useNavigate();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const handleSubmit = () => {
        if (selectedAnswer !== null) {
            setIsSubmitted(true);
        }
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
            setSelectedAnswer(null);
            setIsSubmitted(false);
        } else {
            // Complete - go to results
            navigate('/dashboard');
        }
    };

    const getChoiceClass = (choiceId) => {
        if (!isSubmitted) {
            return selectedAnswer === choiceId ? 'selected' : '';
        }
        if (choiceId === todayQuiz.correctAnswer) {
            return 'correct';
        }
        if (choiceId === selectedAnswer && selectedAnswer !== todayQuiz.correctAnswer) {
            return 'incorrect';
        }
        return '';
    };

    const getDifficultyColor = (diff) => {
        switch (diff) {
            case '상': return 'hard';
            case '중': return 'medium';
            case '하': return 'easy';
            default: return 'medium';
        }
    };

    return (
        <div className="today-quiz">
            {/* Header */}
            <header className="quiz-header">
                <button className="back-btn" onClick={() => navigate('/dashboard')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="quiz-title">
                    <h1>오늘의 퀴즈</h1>
                    <span className={`difficulty-badge ${getDifficultyColor(todayQuiz.difficulty)}`}>
                        난이도: {todayQuiz.difficulty}
                    </span>
                </div>
                <div style={{ width: 40 }}></div>
            </header>

            {/* Progress */}
            <div className="quiz-progress">
                <div className="progress-steps">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={`progress-step ${step === currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}
                        >
                            {step < currentStep ? '✓' : step}
                        </div>
                    ))}
                </div>
                <span className="progress-label">{currentStep} / 3</span>
            </div>

            {/* Question */}
            <div className="quiz-content">
                <div className="question-card animate-fadeIn">
                    <span className="subject-tag">{todayQuiz.subject}</span>
                    <p className="question-text">{todayQuiz.question}</p>
                </div>

                {/* Choices */}
                <div className="choices-list">
                    {todayQuiz.choices.map((choice) => (
                        <button
                            key={choice.id}
                            className={`choice-btn ${getChoiceClass(choice.id)}`}
                            onClick={() => !isSubmitted && setSelectedAnswer(choice.id)}
                            disabled={isSubmitted}
                        >
                            <span className="choice-number">{choice.id}</span>
                            <span className="choice-text">{choice.text}</span>
                            {isSubmitted && choice.id === todayQuiz.correctAnswer && (
                                <span className="choice-icon correct">✓</span>
                            )}
                            {isSubmitted && choice.id === selectedAnswer && selectedAnswer !== todayQuiz.correctAnswer && (
                                <span className="choice-icon incorrect">✗</span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Result Message */}
                {isSubmitted && (
                    <div className={`result-card animate-slideUp ${selectedAnswer === todayQuiz.correctAnswer ? 'correct' : 'incorrect'}`}>
                        {selectedAnswer === todayQuiz.correctAnswer ? (
                            <>
                                <span className="result-emoji">🎉</span>
                                <span className="result-text">정답입니다!</span>
                            </>
                        ) : (
                            <>
                                <span className="result-emoji">💪</span>
                                <span className="result-text">아쉽지만 다음에 도전!</span>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Action Button */}
            <div className="action-container">
                {!isSubmitted ? (
                    <button
                        className={`action-btn ${selectedAnswer ? 'active' : ''}`}
                        onClick={handleSubmit}
                        disabled={!selectedAnswer}
                    >
                        정답 확인
                    </button>
                ) : (
                    <button className="action-btn active" onClick={handleNext}>
                        {currentStep < 3 ? '다음 문제' : '완료'}
                    </button>
                )}
            </div>
        </div>
    );
}
