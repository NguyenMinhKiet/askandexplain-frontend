import { useState, useRef, useEffect, useCallback } from 'react';
import Pagination from '../Pagination';
import QuestionCard from './QuestionCard';
import type { QuestionListType, QuestionType } from '~/types';
import { Tooltip } from 'react-tooltip';

function QuestionList({ questions, direction = 'vertical' }: QuestionListType) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);

    const [currentItems, setCurrentItems] = useState<QuestionType[]>([]);
    const [showTooltip, setShowTooltip] = useState(false);

    const handlePageChange = useCallback((items: QuestionType[]) => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
        setCurrentItems(items);
    }, []);

    useEffect(() => {
        if (direction === 'horizontal') {
            setCurrentItems(questions);
            setShowTooltip(true);
        } else {
            setShowTooltip(false);
        }
    }, [questions, direction]);

    useEffect(() => {
        if (direction !== 'horizontal') return;

        const el = scrollRef.current;
        if (!el) return;

        let isEnabled = false;

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            el.scrollLeft += e.deltaY;
        };

        const checkAndApply = () => {
            const isDesktop = window.matchMedia('(min-width: 768px)').matches;
            if (isDesktop && !isEnabled) {
                el.addEventListener('wheel', handleWheel, { passive: false });
                isEnabled = true;
            } else if (!isDesktop && isEnabled) {
                el.removeEventListener('wheel', handleWheel);
                isEnabled = false;
            }
        };

        checkAndApply();

        window.addEventListener('resize', checkAndApply);

        return () => {
            el.removeEventListener('wheel', handleWheel);
            window.removeEventListener('resize', checkAndApply);
        };
    }, [direction]);

    return (
        <div
            ref={topRef}
            className="max-w-5xl mx-auto p-6"
            data-tooltip-id={`tooltip-questionHorizontalList`}
            data-tooltip-content="Trượt để xem thêm câu hỏi"
        >
            <h1 className="text-3xl font-bold mb-6">📚 Danh sách câu hỏi</h1>
            {showTooltip && <Tooltip id={'tooltip-questionHorizontalList'} />}
            <div className="w-full flex justify-center">
                <div
                    ref={scrollRef}
                    className={
                        direction === 'horizontal'
                            ? 'flex flex-col gap-4 md:gap-1 w-full p-4 md:flex-row md:overflow-x-auto md:whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] md:w-[89%]'
                            : 'flex flex-col gap-4 w-full'
                    }
                >
                    {currentItems.map((q) => (
                        <QuestionCard key={q.id} question={q} direction={direction} />
                    ))}
                </div>
            </div>
            {direction === 'vertical' && (
                <Pagination<QuestionType> data={questions} perPage={5} onPageChange={handlePageChange} />
            )}
        </div>
    );
}

export default QuestionList;
