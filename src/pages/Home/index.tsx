import type { JSX } from 'react';
import { useState } from 'react';

import AskQuestionModal from '~/components/Layout/Modal/QuestionModal';
import QuestionList from '~/components/Layout/QuestionList/QuestionList';
import { DOMAIN_BACKEND } from '~/config';
import { useAuth } from '~/hooks/useAuth';
import { useQuestion } from '~/hooks/useQuestion';
import type { QuestionCreateType } from '~/types';

function Home(): JSX.Element {
    const { isLogin } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const { questions, setQuestions } = useQuestion();

    const handleAddQuestion = async (newQ: QuestionCreateType) => {
        await fetch(`${DOMAIN_BACKEND}/api/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(newQ),
        })
            .then((res) => res.json())
            .then((res) => {
                setQuestions((prev) => [...prev, res.data]);
            })
            .catch((err) => {
                console.error('Error adding question:', err);
            });
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
                <div className="    px-2">
                    <img src="/idea.png" className="w-[35px] h-[35px]" />
                </div>
                Ask & Explain
            </h1>

            <div className="mb-4 text-right">
                {isLogin && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="cursor-pointer bg-[var(--main-color)] hover:bg-[var(--main-color-hover)] text-white py-2 px-4 rounded"
                    >
                        + Đặt câu hỏi mới
                    </button>
                )}
            </div>
            <AskQuestionModal isOpen={showModal} onSubmit={handleAddQuestion} onClose={() => setShowModal(false)} />
            <div className="space-y-4">
                <QuestionList questions={questions} direction="vertical" />
            </div>
        </div>
    );
}

export default Home;
