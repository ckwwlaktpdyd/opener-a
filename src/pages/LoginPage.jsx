import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import openerLogo from '../assets/opener-logo.png';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    const handleKakaoLogin = () => {
        navigate('/dashboard');
    };

    return (
        <div className="login-page">
            <div className="login-content">
                {/* Logo */}
                <div className="login-logo">
                    <img src={openerLogo} alt="오프너 로고" className="logo-square" />
                    <div className="logo-text">
                        <span className="logo-letter">오</span>
                        <span className="logo-letter">프</span>
                        <span className="logo-letter">너</span>
                    </div>
                </div>

                {/* Email Input */}
                <div className="input-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button className="login-btn primary" onClick={handleLogin}>
                        로그인
                    </button>
                    <button className="login-btn kakao" onClick={handleKakaoLogin}>
                        <div className="kakao-icon"></div>
                        카카오 로그인
                    </button>
                </div>
            </div>
        </div>
    );
}
