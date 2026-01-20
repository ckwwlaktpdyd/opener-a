import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import TodayQuiz from './pages/TodayQuiz';
import ProblemSelect from './pages/ProblemSelect';
import ProblemSolve from './pages/ProblemSolve';
import AnalysisResult from './pages/AnalysisResult';
import ChatPrompt from './pages/ChatPrompt';
import Scrapbook from './pages/Scrapbook';
import ScrapbookDetail from './pages/ScrapbookDetail';
import MyPage from './pages/MyPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/today-quiz" element={<TodayQuiz />} />
        <Route path="/problem-select" element={<ProblemSelect />} />
        <Route path="/problem-solve" element={<ProblemSolve />} />
        <Route path="/analysis" element={<AnalysisResult />} />
        <Route path="/chat" element={<ChatPrompt />} />
        <Route path="/scrapbook" element={<Scrapbook />} />
        <Route path="/scrapbook/detail" element={<ScrapbookDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
