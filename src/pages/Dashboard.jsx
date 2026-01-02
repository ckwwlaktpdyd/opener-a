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
                    <span className="welcome-emoji">👋</span>
                    <h1 className="welcome-text">
                        {mockUser.name}님 반가워요.<br />
                        오늘도 함께 공부해볼까요?
                    </h1>
                </div>

                {/* Content Grid */}
                <div className="dashboard-grid">
                    {/* Left Column - Stats */}
                    <div className="stats-column">
                        {/* Accuracy Card */}
                        <div className="stat-card accuracy-card">
                            <div className="card-title">총 정답률(원형차트)</div>
                            <div className="stat-placeholder"></div>
                        </div>

                        {/* Study Time Card */}
                        <div className="stat-card">
                            <div className="card-title">총 학습 시간(수치표시)</div>
                            <div className="stat-placeholder small"></div>
                        </div>

                        {/* Problems Solved Card */}
                        <div className="stat-card">
                            <div className="card-title">총 풀이 문제(수치)</div>
                            <div className="stat-placeholder small"></div>
                        </div>
                    </div>

                    {/* Right Column - Problem Solving Shortcut */}
                    <div className="shortcut-card" onClick={() => navigate('/problem-select')}>
                        <div className="shortcut-title">문제 풀이</div>
                        <div className="shortcut-subtitle">(바로가기 용도)</div>
                    </div>
                </div>
            </main>
        </div>
    );
}
