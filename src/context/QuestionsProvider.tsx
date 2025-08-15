import { useState, useEffect, type ReactNode, useCallback } from 'react';
import QuestionsContext from './QuestionsContext';
import type { QuestionType } from '~/types';
import { DOMAIN_BACKEND } from '~/config';

export function QuestionsProvider({ children }: { children: ReactNode }) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // trigger để fetch lại

    // Hàm fetch dữ liệu
    const fetchQuestions = useCallback(async () => {
        try {
            const token = localStorage.getItem('access_token');
            const res = await fetch(`${DOMAIN_BACKEND}/api/questions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            const json = await res.json();

            if (!res.ok) {
                console.error(`API error: ${res.status} ${res.statusText}`);
                console.error('API response body:', json);
                throw new Error(json.message || 'Unknown error');
            }
            setQuestions(json.data);
        } catch (error) {
            console.error('Fetch failed:', error);
        }
    }, []);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions, refreshTrigger]);

    const refreshQuestions = () => setRefreshTrigger((prev) => prev + 1);

    return (
        <QuestionsContext.Provider value={{ questions, setQuestions, refreshQuestions }}>
            {children}
        </QuestionsContext.Provider>
    );
}
