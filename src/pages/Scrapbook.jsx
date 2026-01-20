import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import './Scrapbook.css';

// Mock data for scrapbook cards
const mockScrapbookItems = [
    { id: 1, year: '2022', title: '6월 모의평가', subject: '오프너 분석', count: 2, color: 'red', date: '2025.12.08' },
    { id: 2, year: '2023', title: '6월 모의평가', subject: '오프너 분석', count: 2, color: 'blue', date: '2025.12.08' },
    { id: 3, year: '2022', title: '9월 모의평가', subject: '오프너 분석', count: 1, color: 'teal', date: '2025.12.05' },
    { id: 4, year: '2022', title: '수학능력시험', subject: '오프너 분석', count: 4, color: 'purple', date: '2025.12.08' },
    { id: 5, year: '2024', title: '6월 모의평가', subject: '오프너 분석', count: 2, color: 'red', date: '2025.12.04' },
    { id: 6, year: '2023', title: '9월 모의평가', subject: '오프너 분석', count: 3, color: 'blue', date: '2025.12.04' },
    { id: 7, year: '2023', title: '수학능력시험', subject: '오프너 분석', count: 4, color: 'teal', date: '2025.12.03' },
    { id: 8, year: '2024', title: '수학능력시험', subject: '오프너 분석', count: 4, color: 'purple', date: '2025.12.03' },
    { id: 9, year: '2024', title: '9월 모의평가', subject: '오프너 분석', count: 2, color: 'red', date: '2025.12.03' },
    { id: 10, year: '2025', title: '6월 모의평가', subject: '오프너 분석', count: 3, color: 'blue', date: '2025.12.02' },
    { id: 11, year: '2025', title: '9월 모의평가', subject: '오프너 분석', count: 4, color: 'teal', date: '2025.12.02' },
    { id: 12, year: '2025', title: '수학능력시험', subject: '오프너 분석', count: 2, color: 'purple', date: '2025.11.30' },
];

export default function Scrapbook() {
    const navigate = useNavigate();

    const handleCardClick = (item) => {
        navigate('/scrapbook/detail', {
            state: {
                year: item.year,
                title: item.title
            }
        });
    };

    return (
        <div className="page-wireframe">
            <TopNav />

            <main className="scrapbook-page">
                <div className="scrapbook-header">
                    <h1 className="scrapbook-title">내 스크랩북</h1>
                    <p className="scrapbook-subtitle">지금까지 저장한 오프너 분석 내용을 확인할 수 있어요</p>
                </div>

                <div className="scrapbook-grid">
                    {mockScrapbookItems.map((item) => (
                        <div
                            key={item.id}
                            className="scrapbook-card"
                            onClick={() => handleCardClick(item)}
                        >
                            <div className="card-year">{item.year}</div>
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-subject">
                                {item.subject} <span className={`card-count ${item.color}`}>{item.count}개</span>
                            </p>
                            <div className="card-footer">
                                <span className="card-date-label">최근 분석 날짜</span>
                                <span className="card-date">{item.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
