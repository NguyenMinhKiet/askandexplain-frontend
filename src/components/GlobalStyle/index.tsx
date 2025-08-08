import { useEffect, useRef, useState, type ReactNode } from 'react';
import './GlobalStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

interface GlobalStyleProps {
    children: ReactNode;
}
function GlobalStyle({ children }: GlobalStyleProps) {
    const globalTopRef = useRef<HTMLDivElement>(null);
    const [showGoToTop, setShowGoToTop] = useState(false);

    useEffect(() => {
        const element = globalTopRef.current;
        if (!element) return;

        const observer = new ResizeObserver(() => {
            const height = element.clientHeight;
            const vh = window.visualViewport?.height || height;
            setShowGoToTop(height >= vh);
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const handleScrollToTop = () => {
        globalTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div ref={globalTopRef} className="relative">
            {children}
            {showGoToTop && (
                <button
                    className="absolute bottom-5 right-3 border p-4 cursor-pointer rounded-full bg-[var(--main-color)] hover:bg-[var(--main-color-hover)] text-white"
                    onClick={handleScrollToTop}
                    data-tooltip-id="tooltip-globalGotoTop"
                    data-tooltip-content="Trở về đầu trang"
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                    <Tooltip id="tooltip-globalGotoTop" />
                </button>
            )}
        </div>
    );
}

export default GlobalStyle;
