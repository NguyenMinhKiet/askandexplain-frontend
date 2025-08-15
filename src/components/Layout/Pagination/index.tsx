import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Props<T> {
    data: T[];
    perPage?: number;
    onPageChange: (items: T[], page: number) => void;
    currentPage: number;
}

function Pagination<T>({ data, perPage = 5, onPageChange, currentPage }: Props<T>) {
    const [page, setPage] = useState(currentPage || 1);
    const total = Math.ceil(data.length / perPage);

    // Đồng bộ page state với prop currentPage
    useEffect(() => {
        setPage(currentPage || 1);
    }, [currentPage]);

    useEffect(() => {
        const start = (page - 1) * perPage;
        const items = data.slice(start, start + perPage);
        onPageChange(items, page);
    }, [page, data, perPage, onPageChange]);

    const paginationItems = useMemo(() => {
        const delta = 1;
        const range: (number | string)[] = [];

        for (let i = Math.max(2, page - delta); i <= Math.min(total - 1, page + delta); i++) {
            range.push(i);
        }

        if (page - delta > 2) range.unshift('...');
        if (page + delta < total - 1) range.push('...');

        range.unshift(1);
        if (total > 1) range.push(total);

        return range;
    }, [page, total]);

    return (
        <div className="flex justify-center gap-2 mt-4">
            <button
                className="flex items-center justify-center cursor-pointer p-3 disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            {paginationItems.map((p, idx) =>
                p === '...' ? (
                    <span key={idx} className="flex items-center justify-center p-3">
                        ...
                    </span>
                ) : (
                    <button
                        key={idx}
                        className={`flex items-center justify-center cursor-pointer p-3 rounded hover:text-white hover:bg-[var(--main-color-hover)] ${
                            p === page ? 'bg-[var(--main-color)] text-white' : ''
                        }`}
                        onClick={() => setPage(Number(p))}
                    >
                        {p}
                    </button>
                ),
            )}

            <button
                className="flex items-center justify-center cursor-pointer p-3 disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(total, p + 1))}
                disabled={page === total}
            >
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    );
}

export default Pagination;
