import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Layout/Header';
import QuestionDetail from './pages/QuestionDetail';
import { useEffect } from 'react';

function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        const titles: Record<string, string> = {
            '/': 'Trang chủ - Ask&Explain',
            '/login': 'Đăng nhập - Ask&Explain',
            '/register': 'Đăng ký - Ask&Explain',
        };

        if (pathname.startsWith('/questions/')) {
            document.title = 'Chi tiết câu hỏi - Ask&Explain';
        } else {
            document.title = titles[pathname] || 'Ask&Explain';
        }
    }, [pathname]);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/questions/:id" element={<QuestionDetail />} />
            </Routes>
        </>
    );
}

export default App;
