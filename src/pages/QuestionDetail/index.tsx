import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import type { AnswerCreateType } from '~/types';
import { useParams } from 'react-router-dom';
import QuestionList from '~/components/Layout/QuestionList/QuestionList';
import AnswerList from '~/components/Layout/AnswerList';
import { useAuth } from '~/hooks/useAuth';
import AnswerQuestionModal from '~/components/Layout/Modal/AnswerModal';
import { useQuestion } from '~/hooks/useQuestion';
import { DOMAIN_BACKEND } from '~/config';

function QuestionDetail(): JSX.Element {
    const { questions, setQuestions } = useQuestion();
    const { isLogin } = useAuth();
    const [showModal, setShowModal] = useState<boolean>(false);

    const { id } = useParams();

    const question = questions.find((q) => q._id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddAnswer = async (newA: AnswerCreateType) => {
        const res = await fetch(`${DOMAIN_BACKEND}/api/answers/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(newA),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error('Error adding answer:', data.message || data.error);
            return;
        }

        setQuestions((prev) =>
            prev.map((q) =>
                q._id === id
                    ? {
                          ...q,
                          answers: [data.data, ...q.answers],
                          answerCount: q.answerCount + 1,
                      }
                    : q,
            ),
        );
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
                    <div className="flex justify-end">
                        {isLogin && (
                            <div className="text-sm">
                                {
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="bg-[var(--main-color)] hover:bg-[var(--main-color-hover)] text-white py-2 px-4 rounded cursor-pointer"
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
                        <AnswerList answers={question.answers} questionBase={question} />
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
