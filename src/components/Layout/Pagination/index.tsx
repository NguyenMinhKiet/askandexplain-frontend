import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Props<T> {
    data: T[];
    perPage?: number;
    onPageChange: (items: T[], page: number) => void;
}

function Pagination<T>({ data, perPage = 5, onPageChange }: Props<T>) {
    const [page, setPage] = useState(1);
    const total = Math.ceil(data.length / perPage);

    useEffect(() => {
        const start = (page - 1) * perPage;
        const items = data.slice(start, start + perPage);
        onPageChange(items, page);
    }, [page, data, perPage, onPageChange]);

    const paginationItems = useMemo(() => {
        const delta = 1;

        const range = [];
        for (let i = Math.max(2, page - delta); i <= Math.min(total - 1, page + delta); i++) {
            range.push(i);
        }

        if (page - delta > 2) {
            range.unshift('...');
        }
        if (page + delta < total - 1) {
            range.push('...');
        }

        range.unshift(1);
        if (total > 1) range.push(total);

        return range;
    }, [page, total]);

    return (
        <div className="flex justify-center gap-2 mt-4">
            {/* Prev */}
            <button
                className="flex items-center justify-center cursor-pointer p-3 disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            {/* Pagination numbers */}
            {paginationItems.map((p, idx) =>
                p === '...' ? (
                    <span key={idx} className="flex items-center justify-center p-3">
                        ...
                    </span>
                ) : (
                    <button
                        key={idx}
                        className={`flex items-center justify-center cursor-pointer p-3 rounded hover:text-white hover:bg-[var(--main-color-hover)] ${
                            p === page ? 'bg-[var(--main-color)]  text-white' : ''
                        }`}
                        onClick={() => setPage(Number(p))}
                    >
                        {p}
                    </button>
                ),
            )}

            {/* Next */}
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
