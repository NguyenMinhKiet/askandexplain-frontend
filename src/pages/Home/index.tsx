import type { JSX } from 'react';
import { useEffect, useState } from 'react';

import AskQuestionModal from '~/components/Layout/Modal/AskQuestionModal';
import QuestionList from '~/components/Layout/QuestionList/QuestionList';
import type { QuestionType } from '~/types';

function Home(): JSX.Element {
    const [showModal, setShowModal] = useState(false);
    const [questions, setQuestions] = useState<QuestionType[]>([]);

    useEffect(() => {
        fetch('/src/mocks/questions.json')
            .then((res) => res.json())
            .then((data) => setQuestions(data));
    }, []);

    const handleAddQuestion = (newQ: QuestionType) => {
        setQuestions((prev) => [newQ, ...prev]);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">🧠 Ask & Explain</h1>

            <div className="mb-4 text-right">
                {
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-[var(--main-color)] hover:bg-[var(--main-color-hover)] text-white py-2 px-4 rounded"
                    >
                        + Đặt câu hỏi mới
                    </button>
                }
            </div>
            <AskQuestionModal isOpen={showModal} onSubmit={handleAddQuestion} onClose={() => setShowModal(false)} />
            <div className="space-y-4">
                <QuestionList questions={questions} direction="vertical" />
            </div>
        </div>
    );
}

export default Home;
