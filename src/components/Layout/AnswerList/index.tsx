import { useCallback, useState } from 'react';
import Pagination from '~/components/Layout/Pagination';
import { type AnswerType, type AnswerListType } from '~/types';

function AnswerList({ answers, currentUserId }: AnswerListType) {
    const [currentItems, setCurrentItems] = useState<AnswerType[]>(answers);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState<string>('');

    const handlePageChange = useCallback((items: AnswerType[]) => {
        setCurrentItems(items);
    }, []);

    const handleEdit = (answer: AnswerType) => {
        setEditingId(answer.id);
        setEditContent(answer.content);
    };

    const handleSave = (id: number) => {
        // API update ...
        setCurrentItems((items) => items.map((item) => (item.id === id ? { ...item, content: editContent } : item)));
        setEditingId(null);
        setEditContent('');
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Bạn có chắc muốn xóa câu trả lời này?')) {
            // API Delete
            setCurrentItems((items) => items.filter((item) => item.id !== id));
        }
    };

    const handleVote = (id: number, value: number) => {
        setCurrentItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, voteCount: Math.max((item.voteCount ?? 0) + value, 0) } : item,
            ),
        );
        // API update vote
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">📌 Danh sách câu trả lời</h1>

            <div className="space-y-4">
                {currentItems
                    .sort((a, b) => (b.voteCount ?? 0) - (a.voteCount ?? 0))
                    .map((answer, index) => (
                        <div
                            key={answer.id}
                            className={`border rounded p-4 mb-4  shadow-sm relative ${
                                index === 0 && answer.voteCount > 0
                                    ? 'bg-green-50 border-green-500 outline-green-400 outline-2'
                                    : 'border-gray-200 bg-white'
                            }`}
                        >
                            {index === 0 && answer.voteCount > 0 && (
                                <div className="absolute -top-4 right-4 bg-green-500 text-white px-3 py-1 rounded shadow text-sm flex items-center gap-2">
                                    🏆 Câu trả lời tốt nhất
                                </div>
                            )}
                            {editingId === answer.id ? (
                                <div>
                                    <textarea
                                        className={'w-full border rounded p-2 mb-2'}
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                    />
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer "
                                        onClick={() => handleSave(answer.id)}
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        className="bg-gray-300 px-3 py-1 rounded cursor-pointer "
                                        onClick={() => setEditingId(null)}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p className="text-gray-800 text-lg">{answer.content}</p>
                                    <div className="text-base text-gray-500 mt-2">
                                        ✍️{' '}
                                        {answer.author && answer.author?.name?.length > 1
                                            ? answer.author.name
                                            : 'Ẩn danh'}{' '}
                                        – 🕒 {new Date(answer.createdAt).toLocaleString()}
                                    </div>

                                    <div className="flex justify-between mt-2">
                                        <div className="flex gap-2 ">
                                            <button
                                                className="cursor-pointer text-green-600 font-bold text-xl"
                                                onClick={() => handleVote(answer.id, 1)}
                                            >
                                                👍
                                            </button>
                                            <span className="text-lg">{answer.voteCount ?? 0}</span>
                                            <button
                                                className="cursor-pointer text-red-600 font-bold text-xl"
                                                onClick={() => handleVote(answer.id, -1)}
                                            >
                                                👎
                                            </button>
                                        </div>

                                        {answer.author && answer.author.id === currentUserId && (
                                            <div className="flex gap-2 ">
                                                <button
                                                    className="text-blue-500 cursor-pointer "
                                                    onClick={() => handleEdit(answer)}
                                                >
                                                    Chỉnh sửa
                                                </button>
                                                <button
                                                    className="text-red-500 cursor-pointer "
                                                    onClick={() => handleDelete(answer.id)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
            </div>

            {answers.length > 5 && (
                <Pagination<AnswerType> data={answers} perPage={5} onPageChange={handlePageChange} />
            )}
        </div>
    );
}

export default AnswerList;
