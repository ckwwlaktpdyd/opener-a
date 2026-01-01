import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import { mockUser } from '../data/mockData';
import './MyPage.css';

export default function MyPage() {
    const navigate = useNavigate();

    const menuItems = [
        {
            group: '학습 정보',
            items: [
                { id: 'stats', label: '학습 통계', icon: '📊', action: () => alert('학습 통계 (준비 중)') },
                { id: 'goal', label: '학습 목표 설정', icon: '🎯', action: () => alert('학습 목표 (준비 중)') },
            ]
        },
        {
            group: '구독 관리',
            items: [
                { id: 'plan', label: '구독 플랜', icon: '💎', badge: mockUser.subscription, action: () => alert('구독 플랜 (준비 중)') },
                { id: 'payment', label: '결제 수단 관리', icon: '💳', action: () => alert('결제 수단 (준비 중)') },
            ]
        },
        {
            group: '고객 지원',
            items: [
                { id: 'faq', label: 'FAQ', icon: '❓', action: () => alert('FAQ (준비 중)') },
                { id: 'contact', label: '1:1 문의', icon: '💬', action: () => alert('1:1 문의 (준비 중)') },
                { id: 'notice', label: '공지사항', icon: '📢', action: () => alert('공지사항 (준비 중)') },
            ]
        },
        {
            group: '설정',
            items: [
                { id: 'noti', label: '알림 설정', icon: '🔔', action: () => alert('알림 설정 (준비 중)') },
                { id: 'privacy', label: '개인정보 처리방침', icon: '🔒', action: () => alert('개인정보 처리방침 (준비 중)') },
                { id: 'terms', label: '이용약관', icon: '📄', action: () => alert('이용약관 (준비 중)') },
            ]
        },
    ];

    const handleLogout = () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            navigate('/login');
        }
    };

    return (
        <div className="page-wireframe">
            <TopNav />

            <main className="page-content">
                <div className="mypage-layout">
                    {/* Left: Profile & Stats */}
                    <div className="mypage-sidebar">
                        <section className="profile-card">
                            <div className="profile-avatar">
                                <span>👤</span>
                            </div>
                            <div className="profile-info">
                                <h1>{mockUser.name}</h1>
                                <p>{mockUser.email}</p>
                            </div>
                            <button className="edit-btn">프로필 수정</button>
                        </section>

                        <section className="stats-card">
                            <div className="stat-item">
                                <span className="stat-value">{mockUser.totalProblems}</span>
                                <span className="stat-label">총 문제</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{mockUser.correctRate}%</span>
                                <span className="stat-label">정답률</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{mockUser.streak}일</span>
                                <span className="stat-label">연속 학습</span>
                            </div>
                        </section>
                    </div>

                    {/* Right: Menu Groups */}
                    <div className="mypage-main">
                        {menuItems.map((group) => (
                            <section key={group.group} className="menu-group">
                                <h2 className="group-title">{group.group}</h2>
                                <div className="menu-list">
                                    {group.items.map((item) => (
                                        <button key={item.id} className="menu-item" onClick={item.action}>
                                            <span className="item-icon">{item.icon}</span>
                                            <span className="item-label">{item.label}</span>
                                            {item.badge && <span className="item-badge">{item.badge}</span>}
                                            <svg className="item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M9 18l6-6-6-6" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        ))}

                        <button className="logout-btn" onClick={handleLogout}>
                            로그아웃
                        </button>

                        <p className="version-text">버전 1.0.0</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
