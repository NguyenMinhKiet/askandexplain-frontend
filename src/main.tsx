import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import GlobalStyle from './components/GlobalStyle/index.tsx';
import { QuestionsProvider } from './context/QuestionsProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GlobalStyle>
            <AuthProvider>
                <QuestionsProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </QuestionsProvider>
            </AuthProvider>
        </GlobalStyle>
    </StrictMode>,
);
