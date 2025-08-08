import { useState, useEffect, useRef } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import type { QuestionType } from '~/types';

function SearchBox() {
    const [keyword, setKeyword] = useState<string>('');
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filtered = questions
        .filter(
            (q) =>
                q.title.toLowerCase().includes(keyword.toLowerCase()) ||
                q.description.toLowerCase().includes(keyword.toLowerCase()),
        )
        .slice(0, 5);

    useEffect(() => {
        fetch('/src/mocks/questions.json')
            .then((res) => res.json())
            .then((data) => setQuestions(data));
    }, []);

    const handleOnClick = () => {
        setKeyword('');
    };

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    return (
        <div ref={wrapperRef} className="w-full max-w-[420px] min-w-[120px]">
            <Tippy
                visible={!!keyword}
                interactive
                placement="bottom-start"
                appendTo={document.body}
                getReferenceClientRect={() => wrapperRef.current?.getBoundingClientRect() ?? new DOMRect()}
                render={() => (
                    <div
                        className="bg-white border rounded shadow p-2 flex flex-col gap-3"
                        style={{ width: wrapperRef.current?.offsetWidth }}
                    >
                        {filtered.length > 0 ? (
                            filtered.map((q) => (
                                <Link
                                    key={q.id}
                                    onClick={handleOnClick}
                                    to={`/questions/${q.id}`}
                                    data-tooltip-id={`tooltip-${q.id}`}
                                    data-tooltip-content="Bấm để xem chi tiết"
                                    className="w-full py-1 px-2 border hover:bg-gray-300 bg-white rounded group cursor-pointer"
                                >
                                    <p className="text-wrap line-clamp-3">{q.title}</p>
                                    <Tooltip id={`tooltip-${q.id}`} place="right" />
                                </Link>
                            ))
                        ) : (
                            <div className="py-1 px-2 border hover:bg-gray-300 bg-white rounded">Không có kết quả</div>
                        )}
                    </div>
                )}
            >
                <div className="flex w-full h-12 group">
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 border border-r-0 h-full rounded-tl-md rounded-bl-md px-3 py-3 outline-0 group-hover:border-[var(--main-color-hover)]"
                        placeholder="Tìm kiếm câu hỏi..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={handleFocus}
                        className="cursor-pointer flex items-center h-full border rounded-tr-md rounded-br-md px-3 group-hover:text-white group-hover:bg-[var(--main-color)] group-hover:border-[var(--main-color-hover)]"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default SearchBox;
