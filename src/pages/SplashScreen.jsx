import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-screen">
            <div className="splash-content">
                <div className="splash-logo">
                    <div className="logo-icon">
                        <span className="logo-emoji">🎯</span>
                    </div>
                    <h1 className="logo-text">오프너</h1>
                    <p className="logo-subtitle">AI가 분석하는 학습 시작점</p>
                </div>

                <div className="splash-loader">
                    <div className="loader-dot"></div>
                    <div className="loader-dot"></div>
                    <div className="loader-dot"></div>
                </div>
            </div>

            <footer className="splash-footer">
                <p>수능 대비 최적의 학습 파트너</p>
            </footer>
        </div>
    );
}
