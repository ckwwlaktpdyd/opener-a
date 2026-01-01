import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { mockUser } from '../data/mockData';
import './TopNav.css';

export default function TopNav() {
    const location = useLocation();
    const { userCans } = useUser();

    const navItems = [
        { path: '/dashboard', label: '대시보드' },
        { path: '/problem-select', label: '문제 선택' },
        { path: '/scrapbook', label: '스크랩북' },
        { path: '/mypage', label: '마이페이지' },
    ];

    const streak = mockUser.streak * 4 + 2; // X30

    return (
        <header className="top-nav">
            <div className="nav-container">
                <div className="nav-left">
                    <Link to="/dashboard" className="logo">
                        <span className="logo-box"></span>
                        <span className="logo-text">오프너</span>
                    </Link>
                    <nav className="nav-links">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="nav-right">
                    <div className="streak-box">
                        <span className="streak-icon-box"></span>
                        <span className="streak-text">X{userCans}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
