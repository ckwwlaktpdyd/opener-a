import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import { useUser } from '../context/UserContext';
import { mockUser } from '../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const { userCans } = useUser();

    return (
        <div className="dashboard-page">
            <TopNav />

            <main className="dashboard-main">
                {/* Welcome Section */}
                <div className="welcome-section">
                    <div className="welcome-avatar">👋</div>
                    <div className="welcome-text-container">
                        <h1 className="welcome-title">홍길동님 반가워요.</h1>
                        <p className="welcome-subtitle">오늘도 힘차게 공부해볼까요?</p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="dashboard-grid">
                    {/* Left Column */}
                    <div className="left-column">
                        {/* Accuracy Card */}
                        <div className="stat-card accuracy-card">
                            <div className="accuracy-content">
                                <div className="accuracy-info">
                                    <h2 className="accuracy-title">총 정답률</h2>
                                    <p className="accuracy-description">이번 달 학습 성취도 분석입니다.</p>
                                    <div className="accuracy-legend">
                                        <div className="legend-item">
                                            <div className="legend-dot correct"></div>
                                            <span className="legend-label">정답</span>
                                        </div>
                                        <div className="legend-item">
                                            <div className="legend-dot incorrect"></div>
                                            <span className="legend-label">오답</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="accuracy-display">
                                    <div className="accuracy-circle">
                                        <svg viewBox="0 0 100 100" className="progress-ring">
                                            <circle cx="50" cy="50" r="45" className="progress-ring-bg" />
                                            <circle cx="50" cy="50" r="45" className="progress-ring-fill"
                                                style={{ strokeDasharray: `${75 * 2.827} 282.7` }} />
                                        </svg>
                                        <div className="accuracy-value">
                                            <div className="accuracy-number">75%</div>
                                            <div className="accuracy-rank">상위10%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="bottom-row">
                            {/* Study Time Card */}
                            <div className="stat-card study-time-card">
                                <div className="card-header">
                                    <div className="card-icon-wrapper">
                                        <svg className="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#00B3AB" />
                                        </svg>
                                    </div>
                                    <span className="card-label">총 학습 시간</span>
                                </div>
                                <div className="stat-content">
                                    <div className="stat-value">12h 30m</div>
                                    <div className="stat-description">어제보다 30분 더 공부했어요!</div>
                                </div>
                            </div>

                            {/* Problems Solved Card */}
                            <div className="stat-card problems-card">
                                <div className="card-header">
                                    <div className="card-icon-wrapper">
                                        <svg className="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="#00B3AB" />
                                        </svg>
                                    </div>
                                    <span className="card-label">총 풀이 문제</span>
                                </div>
                                <div className="stat-content">
                                    <div className="stat-value">142문제</div>
                                    <div className="stat-description">목표 달성까지 8문제 남았어요</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Shortcut */}
                    <div className="shortcut-card">
                        <div className="shortcut-content">
                            <div className="shortcut-icon">
                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3333 66.6667H66.6667V70H13.3333V66.6667ZM63.3333 16.6667L53.3333 6.66667L20 40V53.3333H33.3333L66.6667 20L63.3333 16.6667ZM56.6667 16.6667L23.3333 50H20V46.6667L53.3333 13.3333L56.6667 16.6667Z" fill="#7D7E7F" />
                                </svg>
                            </div>
                            <div className="shortcut-text">
                                <h2 className="shortcut-title">지금 바로<br />문제를 풀어보세요</h2>
                                <p className="shortcut-subtitle">과목과 시험을 선택하면<br />문제 풀이를 시작할 수 있어요</p>
                            </div>
                            <button className="shortcut-button" onClick={() => navigate('/problem-select')}>
                                문제풀이 시작하기
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
