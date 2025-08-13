import { useState, useEffect, type ReactNode } from 'react';
import QuestionsContext from './QuestionsContext';
import type { QuestionType } from '~/types';

export function QuestionsProvider({ children }: { children: ReactNode }) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        fetch('http://localhost:3000/api/questions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            credentials: 'include',
        })
            .then(async (res) => {
                const json = await res.json();

                if (!res.ok) {
                    console.error(`API error: ${res.status} ${res.statusText}`);
                    console.error('API response body:', json);
                    throw new Error(json.message || 'Unknown error');
                }
                console.log(`API: ${json.message || 'No message field'}`);
                console.log(`API: `, json.data);

                setQuestions(json.data);
            })
            .catch((error) => {
                console.error('Fetch failed:', error);
            });
    }, []);

    return <QuestionsContext.Provider value={{ questions, setQuestions }}>{children}</QuestionsContext.Provider>;
}
