import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import { useUser } from '../context/UserContext';
import { mockUser, mockLearningStatus } from '../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const { userCans } = useUser();

    // Calculate stats
    const totalProblems = mockUser.totalProblems;
    const correctRate = mockUser.correctRate;
    const totalStudyTime = '12h 30m';

    // Weekly progress data
    const weeklyData = mockLearningStatus.weeklyProgress;
    const maxCount = Math.max(...weeklyData.map(d => d.count), 1);

    return (
        <div className="dashboard-wireframe">
            <TopNav />

            {/* Main Content */}
            <main className="dashboard-content">
                {/* Row 1: Welcome + Streak System */}
                <div className="content-row row-1">
                    <div className="welcome-section">
                        <span className="welcome-emoji">👋</span>
                        <h1 className="welcome-title">{mockUser.name}님 반가워요</h1>
                        <p className="welcome-subtitle">오늘도 힘차게 공부해볼까요?</p>
                    </div>
                    <div className="card streak-system-card">
                        <div className="streak-content">
                            <span className="card-label">연속 학습 시스템</span>
                            <div className="streak-display">
                                <span className="streak-fire">🔥</span>
                                <span className="streak-number">{mockUser.streak}</span>
                                <span className="streak-unit">일 연속</span>
                            </div>
                            <div className="streak-message">대단해요! 계속 유지해보세요</div>
                        </div>
                    </div>
                </div>

                {/* Row 2: Weekly Chart + Today's Can */}
                <div className="content-row row-2">
                    <div className="card weekly-chart-card">
                        <div className="chart-content">
                            <span className="card-label">주간 학습 추이</span>
                            <div className="weekly-chart">
                                {weeklyData.map((day) => (
                                    <div key={day.day} className="chart-bar-container">
                                        <div className="chart-bar">
                                            <div
                                                className="chart-bar-fill"
                                                style={{ height: `${(day.count / maxCount) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="chart-label">{day.day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="card today-can-card" onClick={() => navigate('/problem-select')}>
                        <div className="can-content">
                            <span className="card-label">오늘의 캔</span>
                            <div className="can-icon">🥫</div>
                            <div className="can-status">
                                <span className="can-count">{userCans}</span>
                                <span className="can-text">캔 보유중</span>
                            </div>
                            <button className="can-button">더 풀러가기 →</button>
                        </div>
                    </div>
                </div>

                {/* Row 3: Dark Area + Stats */}
                <div className="content-row row-3">
                    <div className="dark-area">
                        <div className="dark-content">
                            <span className="dark-label">오늘의 추천</span>
                            <div className="dark-message">
                                💡 {mockLearningStatus.weakSubjects[0]}
                                <br />집중 학습이 필요해요
                            </div>
                            <button className="dark-button" onClick={() => navigate('/problem-select')}>
                                바로 시작하기
                            </button>
                        </div>
                    </div>
                    <div className="stats-section">
                        <div className="card stat-card accuracy-card">
                            <div className="stat-content">
                                <span className="card-label">총 정답률</span>
                                <div className="stat-value">
                                    <span className="stat-number">{correctRate}</span>
                                    <span className="stat-unit">%</span>
                                </div>
                            </div>
                        </div>
                        <div className="stat-row">
                            <div className="card stat-card small-stat">
                                <div className="stat-content">
                                    <span className="card-label-small">총 풀이 문제</span>
                                    <div className="stat-value-small">
                                        <span className="stat-number-small">{totalProblems}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card stat-card small-stat">
                                <div className="stat-content">
                                    <span className="card-label-small">총 학습 시간</span>
                                    <div className="stat-value-small">
                                        <span className="stat-number-small">{totalStudyTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
