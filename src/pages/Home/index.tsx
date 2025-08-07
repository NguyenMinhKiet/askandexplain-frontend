import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import AskQuestionModal from '../../components/Modal/AskQuestionModal';
import { type Question } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import QuestionList from '../../components/QuestionList';

function Home(): JSX.Element {
    const { isLogin } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        fetch('/src/mocks/questions.json')
            .then((res) => res.json())
            .then((data) => setQuestions(data));
    }, []);

    const handleAddQuestion = (newQ: Question) => {
        setQuestions((prev) => [newQ, ...prev]);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">🧠 Ask & Explain</h1>

            <div className="mb-4 text-right">
                {isLogin && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        + Đặt câu hỏi mới
                    </button>
                )}
            </div>
            <AskQuestionModal isOpen={showModal} onSubmit={handleAddQuestion} onClose={() => setShowModal(false)} />
            <div className="space-y-4">
                <QuestionList questions={questions} />
            </div>
        </div>
    );
}

export default Home;
