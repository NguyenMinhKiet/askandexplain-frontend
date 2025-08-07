import { useCallback, useState } from 'react';
import Pagination from '../../components/Pagination';
import { type Answer } from '../../types';

interface Props {
    answers: Answer[];
}

function AnswerList({ answers }: Props) {
    const [currentItems, setCurrentItems] = useState<Answer[]>(answers);

    const handlePageChange = useCallback((items: Answer[]) => {
        setCurrentItems(items);
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">📚 Danh sách câu trả lời</h1>

            <div className="space-y-4">
                {currentItems.map((answer) => (
                    <div key={answer.id} className="border border-gray-200 rounded p-4 mb-4 bg-white shadow-sm">
                        <p className="text-gray-800">{answer.content}</p>
                        <div className="text-sm text-gray-500 mt-2">
                            ✍️ {answer.author} – 🕒 {new Date(answer.createdAt).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            <Pagination<Answer> data={answers} perPage={5} onPageChange={handlePageChange} />
        </div>
    );
}

export default AnswerList;
