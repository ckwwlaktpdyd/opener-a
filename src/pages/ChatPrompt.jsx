import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockChatHistory } from '../data/mockData';
import './ChatPrompt.css';

export default function ChatPrompt() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState(mockChatHistory);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            message: inputValue
        };
        setMessages([...messages, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                type: 'ai',
                message: getAIResponse(inputValue)
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const getAIResponse = (question) => {
        // Simple mock responses
        if (question.includes('공식') || question.includes('암기')) {
            return '삼각함수 극한 공식을 암기하는 팁을 알려드릴게요!\n\n1. 기본 공식부터 시작하세요:\n   lim(x→0) sinx/x = 1\n\n2. 계수가 있는 경우를 연습하세요:\n   lim(x→0) sin(ax)/x = a\n\n3. 분모와 분자의 계수가 다른 경우:\n   lim(x→0) sin(ax)/(bx) = a/b\n\n매일 5문제씩 풀면서 손에 익히는 것을 추천드려요! 💪';
        }
        if (question.includes('다른') || question.includes('유형')) {
            return '비슷한 유형의 문제들을 추천해드릴게요:\n\n1. 2023 수능 14번 - 삼각함수 극한\n2. 2022 9모 16번 - 삼각함수 극한\n3. 2024 6모 12번 - 삼각함수 미분\n\n이 문제들을 순서대로 풀어보시면 개념이 더 확실해질 거예요! 문제 풀기로 이동할까요?';
        }
        return '좋은 질문이에요! 수학 공부에서 가장 중요한 것은 개념을 정확히 이해하고, 충분한 연습을 하는 것입니다.\n\n이 문제와 관련해서 더 궁금한 점이 있으시면 편하게 질문해 주세요. 공식, 풀이 방법, 비슷한 유형 등 무엇이든 도와드릴게요! 😊';
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-prompt">
            {/* Header */}
            <header className="chat-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="chat-title">
                    <div className="ai-avatar">🤖</div>
                    <div className="ai-info">
                        <h1>오답 분석 AI</h1>
                        <span className="ai-status">온라인</span>
                    </div>
                </div>
                <div style={{ width: 40 }}></div>
            </header>

            {/* Messages */}
            <div className="messages-container">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message ${msg.type === 'user' ? 'message-user' : 'message-ai'}`}
                    >
                        {msg.type === 'ai' && <div className="message-avatar">🤖</div>}
                        <div className="message-bubble">
                            <p>{msg.message}</p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="message message-ai">
                        <div className="message-avatar">🤖</div>
                        <div className="message-bubble typing">
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <button className="quick-btn" onClick={() => setInputValue('다른 유형의 문제도 추천해줘')}>
                    📚 비슷한 문제 추천
                </button>
                <button className="quick-btn" onClick={() => setInputValue('공식 암기 팁 알려줘')}>
                    💡 암기 TIP
                </button>
            </div>

            {/* Input */}
            <div className="chat-input-container">
                <div className="chat-input-wrapper">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="궁금한 점을 질문해보세요..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className={`send-btn ${inputValue.trim() ? 'active' : ''}`}
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22,2 15,22 11,13 2,9" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
