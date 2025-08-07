import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { type Question } from '../../types';

interface Props {
    questions: Question[];
}

function QuestionList({ questions }: Props) {
    const [currentItems, setCurrentItems] = useState<Question[]>([]);
    const handlePageChange = useCallback((items: Question[]) => {
        setCurrentItems(items);
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">📚 Danh sách câu hỏi</h1>

            <div className="space-y-4">
                {currentItems.map((q) => (
                    <Link
                        to={`/questions/${q.id}`}
                        key={q.id}
                        className="block border rounded p-4 shadow-sm hover:shadow-md transition"
                    >
                        <h2 className="text-xl font-semibold">{q.title}</h2>
                        <p className="text-gray-700 mt-1 line-clamp-2">{q.description}</p>
                        <div className="text-sm text-gray-500 mt-2 flex justify-between">
                            <span>Người hỏi: {q.author}</span>
                            <span>{q.answerCount} lượt giải thích</span>
                        </div>
                    </Link>
                ))}
            </div>

            <Pagination<Question> data={questions} perPage={5} onPageChange={handlePageChange} />
        </div>
    );
}

export default QuestionList;
