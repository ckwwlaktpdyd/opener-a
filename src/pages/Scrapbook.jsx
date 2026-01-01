import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import { mockScrapbook } from '../data/mockData';
import './Scrapbook.css';

export default function Scrapbook() {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('latest');

    const sortedItems = [...mockScrapbook].sort((a, b) => {
        if (sortBy === 'latest') {
            return new Date(b.wrongDate) - new Date(a.wrongDate);
        }
        return 0;
    });

    return (
        <div className="page-wireframe">
            <TopNav />

            <main className="scrapbook-content">
                {/* Filter Bar */}
                <div className="filter-bar">
                    <div className="filter-group">
                        <button className="filter-dropdown">
                            ▼ 전체
                        </button>
                        <button className="filter-dropdown">
                            문제 과목 ▼
                        </button>
                        <button className="filter-dropdown">
                            시험 유형 ▼
                        </button>
                        <button className="filter-dropdown">
                            오답 유형 ▼
                        </button>
                    </div>
                    <div className="sort-group">
                        <select
                            className="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="latest">최신순 ▼</option>
                            <option value="oldest">오래된순 ▼</option>
                        </select>
                    </div>
                </div>

                {/* Scrap Grid */}
                <div className="scrap-grid">
                    {sortedItems.map((item) => (
                        <div
                            key={item.id}
                            className="scrap-card"
                            onClick={() => navigate('/analysis')}
                        >
                            <div className="scrap-card-header">
                                <span className="scrap-subject">{item.subject}</span>
                                <button className="bookmark-btn" onClick={(e) => e.stopPropagation()}>🔖</button>
                            </div>
                            <div className="scrap-card-body">
                                <p className="scrap-line">문제 설명</p>
                                <p className="scrap-line">문제 설명</p>
                                <p className="scrap-line">문제....</p>
                            </div>
                            <div className="scrap-card-footer">
                                <span className="scrap-date">저장 날짜</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
