import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import './ProblemSelect.css';

export default function ProblemSelect() {
    const navigate = useNavigate();
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedYear, setSelectedYear] = useState('2025');
    const [selectedExamType, setSelectedExamType] = useState(null);

    const subjects = [
        { id: 'korean', name: '국어' },
        { id: 'english', name: '영어' },
        { id: 'math', name: '수학' },
    ];

    const years = ['2025', '2024', '2023', '2022', '2021'];

    const examTypes = [
        { id: '6mo', name: '6모' },
        { id: '9mo', name: '9모' },
        { id: 'suneung', name: '수능' },
    ];

    const canStart = selectedSubject && selectedYear && selectedExamType;

    const handleStart = () => {
        if (canStart) {
            navigate('/problem-solve', {
                state: {
                    subject: selectedSubject,
                    year: selectedYear,
                    examType: selectedExamType
                }
            });
        }
    };

    return (
        <div className="page-wireframe">
            <TopNav />

            <main className="page-content">
                {/* Header Text */}
                <div className="page-header-text">
                    <p className="header-line">풀고 싶은 과목과 시험을 선택하세요.</p>
                    <p className="header-line">선택이 끝나면 바로 문제 풀이를 시작할 수 있어요.~</p>
                </div>

                {/* Selection Container */}
                <div className="selection-container">
                    {/* Subject Column */}
                    <div className="selection-column">
                        <h3 className="column-title">과목 선택</h3>
                        <div className="column-options">
                            {subjects.map((subject) => (
                                <button
                                    key={subject.id}
                                    className={`option-button ${selectedSubject === subject.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedSubject(subject.id)}
                                >
                                    {subject.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="column-divider"></div>

                    {/* Year Column */}
                    <div className="selection-column">
                        <h3 className="column-title">시험 연도</h3>
                        <div className="column-options">
                            <div className="year-dropdown">
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="year-select"
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="column-divider"></div>

                    {/* Exam Type Column */}
                    <div className="selection-column">
                        <h3 className="column-title">시험 종류</h3>
                        <div className="column-options">
                            {examTypes.map((type) => (
                                <button
                                    key={type.id}
                                    className={`option-button ${selectedExamType === type.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedExamType(type.id)}
                                >
                                    {type.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Start Button */}
                <div className="start-button-container">
                    <button
                        className={`start-button ${canStart ? 'active' : ''}`}
                        onClick={handleStart}
                        disabled={!canStart}
                    >
                        문제 풀이 시작하기 →
                    </button>
                </div>
            </main>
        </div>
    );
}
