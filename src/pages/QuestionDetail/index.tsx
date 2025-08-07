import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { type Answer, type Question } from '../../types';
import { useParams } from 'react-router-dom';
import questionData from '../../mocks/questions.json';
import QuestionList from '../../components/QuestionList';
import AnswerList from '../../components/AnswerList';
import { useAuth } from '../../hooks/useAuth';
import AnswerQuestionModal from '../../components/Modal/AnswerQuestionModal';

function QuestionDetail(): JSX.Element {
    const { isLogin } = useAuth();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [question, setQuestion] = useState<Question | null>(null);

    const { id } = useParams();

    useEffect(() => {
        const found = questionData.find((q) => q.id === Number(id));
        setQuestion((found as Question) || null);
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        fetch('/src/mocks/questions.json')
            .then((res) => res.json())
            .then((data) => setQuestions(data));
    }, []);

    const handleAddAnswer = (newA: Answer) => {
        setQuestion((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                answers: [newA, ...prev.answers],
                answerCount: prev.answerCount + 1,
            };
        });
    };

    if (!question) return <div className="p-6">❌ Câu hỏi không tồn tại.</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">🧠 Ask & Explain</h1>

            <div className="max-w-3xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">{question.title}</h2>
                <p className="text-gray-700 mb-4">{question.description}</p>
                <div className="text-sm text-gray-500">Người hỏi: {question.author}</div>
                <div className="text-sm text-gray-500 mb-6">{question.answerCount} lượt giải thích</div>

                <div className="mt-8 border-t pt-4">
                    <div className="flex justify-between">
                        {isLogin && (
                            <div className="text-sm">
                                {
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
                                    >
                                        + Thêm câu trả lời mới
                                    </button>
                                }
                            </div>
                        )}
                    </div>
                    <AnswerQuestionModal
                        questionId={Number(id)}
                        isOpen={showModal}
                        onSubmit={handleAddAnswer}
                        onClose={() => setShowModal(false)}
                    />
                    {question.answers && question.answers.length > 0 ? (
                        <AnswerList answers={question.answers} />
                    ) : (
                        <p className="text-gray-500 italic">Chưa có câu trả lời nào.</p>
                    )}
                </div>
            </div>
            <div className="mt-8 border-t pt-4">
                <QuestionList questions={questions.filter((item) => item.id !== Number(id))} direction="horizontal" />
            </div>
        </div>
    );
}

export default QuestionDetail;
