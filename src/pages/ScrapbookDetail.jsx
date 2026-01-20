import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from '../components/TopNav';
import './ScrapbookDetail.css';

// Mock problem data
const mockProblems = [
    {
        id: 1,
        type: '미적분',
        problem: '23. 도함수가 f\'(x) = x³ - 6x² + 9x = a인 최고차항의 계수가 1인 삼차함수 f(x)의 극댓값은?',
        date: '2025.12.08 15:20'
    },
    {
        id: 2,
        type: '수학 + 수학',
        problem: '12. 두 변의 길이가 4인 이등변삼각형 ABC에서 직선 BC와 점 A사이의 거리가 2일 때, 벡터 AB · 벡터 AC의 값은? [3점]',
        date: '2025.12.08 15:10'
    },
    {
        id: 3,
        type: '미적분',
        problem: '23. 도함수가 f\'(x) = x³ - 6x² + 9x = a인 최고차항의 계수가 1인 삼차함수 f(x)의 극댓값은?',
        date: '2025.12.05 14:20'
    },
    {
        id: 4,
        type: '수학 + 수학',
        problem: '12. 두 변의 길이가 4인 이등변삼각형 ABC에서 직선 BC와 점 A사이의 거리가 2일 때, 벡터 AB · 벡터 AC의 값은? [3점]',
        date: '2025.12.04 14:17'
    },
];

export default function ScrapbookDetail() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get exam info from navigation state, fallback to default
    const examInfo = location.state || { year: '2022', title: '6월 모의평가' };
    const pageTitle = `${examInfo.year}년 ${examInfo.title}`;

    const handleBackClick = () => {
        navigate('/scrapbook');
    };

    const handleProblemClick = (problem) => {
        console.log('Problem clicked:', problem);
        navigate('/analysis');
    };

    return (
        <div className="page-wireframe">
            <TopNav />

            <main className="scrapbook-detail-page">
                <div className="detail-header">
                    <button className="back-button" onClick={handleBackClick}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 15L7.5 10L12.5 5" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{pageTitle}</span>
                    </button>
                </div>

                <div className="problems-table">
                    <div className="table-header">
                        <div className="table-cell header-cell type-col">유형</div>
                        <div className="table-cell header-cell problem-col">문제</div>
                        <div className="table-cell header-cell date-col">분석 날짜</div>
                    </div>

                    <div className="table-body">
                        {mockProblems.map((problem) => (
                            <div
                                key={problem.id}
                                className="table-row"
                                onClick={() => handleProblemClick(problem)}
                            >
                                <div className="table-cell type-col">{problem.type}</div>
                                <div className="table-cell problem-col">{problem.problem}</div>
                                <div className="table-cell date-col">{problem.date}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pagination">
                    <button className="pagination-btn" disabled>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 15L7.5 10L12.5 5" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <span className="page-number">1</span>
                    <button className="pagination-btn" disabled>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 5L12.5 10L7.5 15" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </main>
        </div>
    );
}
