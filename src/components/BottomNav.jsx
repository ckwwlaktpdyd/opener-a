import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

export default function BottomNav() {
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', label: '홈', icon: 'home' },
        { path: '/problem-select', label: '문제풀기', icon: 'edit' },
        { path: '/scrapbook', label: '스크랩북', icon: 'bookmark' },
        { path: '/mypage', label: '마이', icon: 'user' },
    ];

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'home':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9,22 9,12 15,12 15,22" />
                    </svg>
                );
            case 'edit':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                );
            case 'bookmark':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                );
            case 'user':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <nav className="sidebar-nav">
                <div className="sidebar-logo">
                    <span className="logo-icon">🎯</span>
                    <span className="logo-text">오답제로</span>
                </div>
                <div className="sidebar-menu">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            {getIcon(item.icon)}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">👤</div>
                        <div className="user-details">
                            <span className="user-name">김수험</span>
                            <span className="user-plan">프리미엄</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Nav */}
            <nav className="bottom-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        {getIcon(item.icon)}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </>
    );
}
