import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Pagination from '~/components/Layout/Pagination';
import { useAuth } from '~/hooks/useAuth';
import { useQuestion } from '~/hooks/useQuestion';
import { type AnswerType, type AnswerListType } from '~/types';
import { DOMAIN_BACKEND } from '~/config';

// Schema validate nội dung
const schema = z.object({
    content: z.string().min(5, 'Câu trả lời phải dài ít nhất 5 ký tự'),
});

type EditFormType = z.infer<typeof schema>;

function AnswerList({ answers, questionBase }: AnswerListType) {
    const { user } = useAuth();
    const { setQuestions, refreshQuestions } = useQuestion();
    const [currentItems, setCurrentItems] = useState<AnswerType[]>(answers);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        setValue,
    } = useForm<EditFormType>({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    useEffect(() => {
        setCurrentItems(answers.slice(0, 5));
        setCurrentPage(1);
    }, [answers]);

    const handlePageChange = useCallback((items: AnswerType[], page: number) => {
        setCurrentItems(items);
        setCurrentPage(page);
    }, []);

    const handleEdit = (answer: AnswerType) => {
        setEditingId(answer._id);
        setValue('content', answer.content);
    };

    const handleSave = async (id: string, content: string) => {
        await fetch(`${DOMAIN_BACKEND}/api/answers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ _id: id, data: { content } }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log('API error: ', data.error);
                    return;
                }
                console.log('API success: ', data.message);

                // Cập nhật trong state local
                setCurrentItems((items) =>
                    items.map((item) => (item._id === data.data._id ? { ...item, content } : item)),
                );

                // Cập nhật trong questions context
                setQuestions((prev) =>
                    prev.map((question) =>
                        question._id === questionBase._id
                            ? {
                                  ...question,
                                  answers: question.answers.map((a) => (a._id === data.data._id ? data.data : a)),
                              }
                            : question,
                    ),
                );

                setEditingId(null);
                reset();
            })
            .catch((err) => console.log('Failed to fetch: ', err));
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Bạn có chắc muốn xóa câu trả lời này?')) {
            await fetch(`${DOMAIN_BACKEND}/api/answers`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        console.error('API error: ', data.error);
                        return;
                    }
                    setCurrentItems((items) => items.filter((item) => item._id !== data.data._id));

                    setQuestions((prev) =>
                        prev.map((question) =>
                            question._id === questionBase._id
                                ? {
                                      ...question,
                                      answerCount: question.answerCount - 1,
                                      answers: question.answers.filter((answer) => answer._id !== data.data._id),
                                  }
                                : question,
                        ),
                    );
                    refreshQuestions();
                })
                .catch((err) => console.log('Failed to fetch: ', err));
        }
    };

    const handleVote = async (id: string, value: number) => {
        await fetch(`${DOMAIN_BACKEND}/api/answers/updateVote`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ id, delta: value }),
        })
            .then((res) => res.json())
            .then((updated) => {
                if (updated.error) {
                    console.log('API error: ', updated.error);
                    return;
                }
                setCurrentItems((items) => items.map((item) => (item._id === id ? updated.data : item)));

                setQuestions((prev) =>
                    prev.map((question) =>
                        question._id === questionBase._id
                            ? {
                                  ...question,
                                  answers: question.answers.map((answer) =>
                                      answer._id === updated.data._id ? updated.data : answer,
                                  ),
                              }
                            : question,
                    ),
                );
            })
            .catch((err) => console.log('Failed to fetch: ', err));
    };

    const maxVote = Math.max(...answers.map((a) => a.voteCount ?? 0));
    const bestAnswer = answers.filter((a) => (a.voteCount ?? 0) > 0 && a.voteCount === maxVote)[0];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">📌 Danh sách câu trả lời</h1>

            <div className="space-y-4">
                {currentItems
                    .sort((a, b) => (b.voteCount ?? 0) - (a.voteCount ?? 0))
                    .map((answer) => {
                        const isBestAnswer = answer._id === bestAnswer?._id;

                        return (
                            <div
                                key={answer._id}
                                className={`border rounded p-4 mb-4 shadow-sm relative ${
                                    isBestAnswer
                                        ? 'bg-green-50 border-green-500 outline-green-400 outline-2'
                                        : 'border-gray-200 bg-white'
                                }`}
                            >
                                {isBestAnswer && (
                                    <div className="absolute -top-4 right-4 bg-green-500 text-white px-3 py-1 rounded shadow text-sm flex items-center gap-2">
                                        🏆 Câu trả lời tốt nhất
                                    </div>
                                )}

                                {editingId === answer._id ? (
                                    <form
                                        onSubmit={handleSubmit((data) => handleSave(answer._id, data.content))}
                                        className="space-y-2"
                                    >
                                        <textarea className="w-full border rounded p-2" {...register('content')} />
                                        {errors.content && (
                                            <p className="text-red-500 text-sm">{errors.content.message}</p>
                                        )}
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={!isValid}
                                                className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded"
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditingId(null);
                                                    reset();
                                                }}
                                                className="cursor-pointer bg-gray-300 px-3 py-1 rounded"
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <p className="text-gray-800 text-lg">{answer.content}</p>
                                        <div className="text-base text-gray-500 mt-2">
                                            ✍️ {answer.author?.name?.length > 1 ? answer.author.name : 'Ẩn danh'} – 🕒{' '}
                                            {new Date(answer.updatedAt).toLocaleString('vi-VN')}
                                        </div>

                                        <div className="flex justify-between mt-2">
                                            <div className="flex gap-2">
                                                <button
                                                    className="cursor-pointer text-green-600 font-bold text-xl"
                                                    onClick={() => handleVote(answer._id, 1)}
                                                >
                                                    👍
                                                </button>
                                                <span className="text-lg">{answer.voteCount ?? 0}</span>
                                                <button
                                                    disabled={answer.voteCount! <= 0}
                                                    className="cursor-pointer text-red-600 font-bold text-xl"
                                                    onClick={() => handleVote(answer._id, -1)}
                                                >
                                                    👎
                                                </button>
                                            </div>

                                            {answer.author && answer.author._id === user._id && (
                                                <div className="flex gap-2">
                                                    <button
                                                        className="text-blue-500 cursor-pointer"
                                                        onClick={() => handleEdit(answer)}
                                                    >
                                                        Chỉnh sửa
                                                    </button>
                                                    <button
                                                        className="text-red-500 cursor-pointer"
                                                        onClick={() => handleDelete(answer._id)}
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
            </div>

            {answers.length > 5 && (
                <Pagination<AnswerType>
                    data={answers || []}
                    perPage={5}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />
            )}
        </div>
    );
}

export default AnswerList;
