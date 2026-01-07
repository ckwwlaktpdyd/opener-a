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
                        <svg className="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="6" width="18" height="12" rx="6" fill="#15A9A1" />
                        </svg>
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
                        <svg className="streak-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 1.66699L3.33333 3.33366V16.667L5 18.3337H15L16.6667 16.667V3.33366L15 1.66699H5ZM5 3.33366H15V16.667H5V3.33366ZM7.5 5.83366V7.50033H12.5V5.83366H7.5ZM7.5 9.16699V10.8337H12.5V9.16699H7.5ZM7.5 12.5003V14.167H10.8333V12.5003H7.5Z" fill="#00B3AB" />
                        </svg>
                        <span className="streak-text">X{userCans}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
