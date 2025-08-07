import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { type Question } from '../../types';
import Pagination from '../Pagination';

interface Props {
    questions: Question[];
    direction?: 'horizontal' | 'vertical';
}

function QuestionList({ questions, direction = 'vertical' }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const [currentItems, setCurrentItems] = useState<Question[]>([]);

    const handlePageChange = useCallback((items: Question[]) => {
        setCurrentItems(items);
    }, []);

    useEffect(() => {
        setCurrentItems(questions);
    }, [questions]);

    useEffect(() => {
        if (direction !== 'horizontal') return;
        const el = scrollRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            el.scrollLeft += e.deltaY;
        };

        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            el.removeEventListener('wheel', handleWheel);
        };
    }, [direction]);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">📚 Danh sách câu hỏi</h1>

            <div className="w-full flex justify-center">
                <div
                    ref={scrollRef}
                    className={
                        direction === 'horizontal'
                            ? 'overflow-x-auto whitespace-nowrap p-4 [scrollbar-width:none] [-ms-overflow-style:none] w-[89%]'
                            : 'flex flex-col gap-4 w-full'
                    }
                >
                    {currentItems.map((q) => (
                        <Link
                            to={`/questions/${q.id}`}
                            key={q.id}
                            className={
                                direction === 'horizontal'
                                    ? 'inline-block w-64 min-w-[16rem] h-40 bg-white border rounded-lg p-4 shadow-md mr-4 hover:shadow-lg transition'
                                    : 'w-full h-40 bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition'
                            }
                        >
                            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{q.title}</h2>
                            <p className="text-gray-600 mt-2 text-sm line-clamp-2">{q.description}</p>
                            <div className="text-xs text-gray-500 mt-4 flex justify-between">
                                <span>Người hỏi: {q.author}</span>
                                <span>{q.answerCount} lượt giải thích</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            {direction === 'vertical' ? (
                <Pagination<Question> data={questions} perPage={5} onPageChange={handlePageChange} />
            ) : null}
        </div>
    );
}

export default QuestionList;
