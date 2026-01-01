import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
    };

    return (
        <div className="login-page">
            <div className="login-content animate-slideUp">
                <div className="login-header">
                    <div className="login-logo">
                        <span>🎯</span>
                    </div>
                    <h1>오프너</h1>
                    <p>AI 오답 분석으로 수능 정복하기</p>
                </div>


                <div className="login-buttons">
                    <button className="login-btn kakao" onClick={handleLogin}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 0C4.477 0 0 3.582 0 8c0 2.867 1.878 5.378 4.697 6.797-.145.527-.935 3.401-1.012 3.66 0 0-.02.083-.009.117.012.034.046.041.046.041.061.008.141-.043.141-.043l4.27-2.82c.54.054 1.09.082 1.648.082C15.523 15.834 20 12.252 20 8c0-4.418-4.477-8-10-8z" />
                        </svg>
                        카카오로 시작하기
                    </button>

                    <button className="login-btn email" onClick={handleLogin}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        이메일로 시작하기
                    </button>
                </div>

                <div className="login-terms">
                    <p>계속 진행하면 <a href="#">서비스 이용약관</a> 및 <a href="#">개인정보 처리방침</a>에 동의하는 것으로 간주됩니다.</p>
                </div>
            </div>
        </div>
    );
}
