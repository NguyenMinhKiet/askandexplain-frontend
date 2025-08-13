import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import type { AnswerCreateType, QuestionType } from '~/types';
import { useParams } from 'react-router-dom';
import QuestionList from '~/components/Layout/QuestionList/QuestionList';
import AnswerList from '~/components/Layout/AnswerList';
import { useAuth } from '~/hooks/useAuth';
import AnswerQuestionModal from '~/components/Layout/Modal/AnswerQuestionModal';
import { useQuestion } from '~/hooks/useQuestion';

function QuestionDetail(): JSX.Element {
    const { questions, setQuestions } = useQuestion();

    const { isLogin } = useAuth();
    const { user } = useAuth();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [question, setQuestion] = useState<QuestionType | null>(null);

    const { id } = useParams();
    useEffect(() => {
        console.log('question: ', question);
    }, [question]);
    // Find question with id
    useEffect(() => {
        const found = questions.find((q) => q._id === id);
        setQuestion((found as unknown as QuestionType) || null);
    }, [questions, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddAnswer = (newA: AnswerCreateType) => {
        fetch(`http://localhost:3000/api/answers/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(newA),
        })
            .then(async (res) => {
                const data = await res.json(); // đọc body JSON
                if (!res.ok) {
                    // ném lỗi với message từ backend
                    throw new Error(data?.error || 'Failed to add answer');
                }
                return data;
            })
            .then((res) => {
                setQuestions((prev) =>
                    prev.map((q) =>
                        q._id === id
                            ? {
                                  ...q,
                                  answers: [res.data, ...q.answers],
                                  answerCount: q.answerCount + 1,
                              }
                            : q,
                    ),
                );
                setQuestion((prev) => {
                    if (!prev) return prev;

                    return {
                        ...prev,
                        answers: [res.data, ...prev.answers],
                        answerCount: prev.answerCount + 1,
                    };
                });
            })
            .catch((err) => {
                console.error('Error adding answer:', err.message); // in ra message từ backend
            });
    };

    if (!question) return <div className="p-6">❌ Câu hỏi không tồn tại.</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">🧠 Ask & Explain</h1>

            <div className="max-w-3xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">{question.title}</h2>
                <p className="text-gray-700 mb-4">{question.content}</p>
                <div className="text-sm text-gray-500">
                    Người hỏi: {question.author && question.author.name.length > 1 ? question.author.name : 'Ẩn danh'}
                </div>
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
                        questionId={id!}
                        isOpen={showModal}
                        onSubmit={handleAddAnswer}
                        onClose={() => setShowModal(false)}
                    />
                    {question.answers && question.answers.length > 0 ? (
                        <AnswerList answers={question.answers} currentUserId={user._id} />
                    ) : (
                        <p className="text-gray-500 italic">Chưa có câu trả lời nào.</p>
                    )}
                </div>
            </div>
            <div className="mt-8 border-t pt-4">
                <QuestionList questions={questions.filter((item) => item._id !== id)} direction="horizontal" />
            </div>
        </div>
    );
}

export default QuestionDetail;
