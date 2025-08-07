// src/components/Pagination.tsx
import { useEffect, useState } from 'react';

interface PaginationProps<T> {
    data: T[];
    perPage?: number;
    onPageChange: (currentItems: T[], currentPage: number) => void;
}

function Pagination<T>({ data, perPage = 5, onPageChange }: PaginationProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / perPage);

    useEffect(() => {
        const start = (currentPage - 1) * perPage;
        const currentItems = data.slice(start, start + perPage);
        onPageChange(currentItems, currentPage);
    }, [currentPage, data, perPage, onPageChange]);

    return (
        <div className="flex justify-center mt-6 space-x-2">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                ⬅ Trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-gray-200 font-bold' : ''}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Tiếp ➡
            </button>
        </div>
    );
}

export default Pagination;
