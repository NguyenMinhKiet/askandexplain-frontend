import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import SearchBox from '../SearchBox';
import { useState } from 'react';

function Header() {
    const { isLogin, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-y-2">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-[var(--main-color)]">
                    🧠 Ask&Explain
                </Link>

                {/* SearchBox: ẩn trên mobile, hiện trên md+ */}
                <div className="order-3 w-full md:order-none md:flex-1 flex items-center justify-center">
                    <div className="w-full md:max-w-[420px] md:min-w-[120px] flex justify-center items-center">
                        <SearchBox />
                    </div>
                </div>

                {/* Desktop buttons */}
                <div className="hidden md:flex space-x-4 items-center">
                    {isLogin ? (
                        <button
                            type="button"
                            className="px-4 py-1.5 bg-[var(--main-color)] text-white rounded hover:bg-[var(--main-color-hover)] transition"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="px-4 py-1.5 border border-main text-[var(--main-color)] rounded hover:text-white hover:bg-[var(--main-color-hover)] transition"
                            >
                                Đăng ký
                            </Link>
                            <Link
                                to="/login"
                                className="px-4 py-1.5 bg-[var(--main-color)] text-white rounded hover:bg-[var(--main-color-hover)] transition"
                            >
                                Đăng nhập
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile dropdown menu */}
                <div className="md:hidden relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-2xl px-2 py-1 rounded hover:bg-gray-100"
                    >
                        ☰
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                            <div className="flex flex-col items-start p-2 space-y-1">
                                {isLogin ? (
                                    <button
                                        type="button"
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-blue-500 text-blue-500"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            to="/register"
                                            className="w-full px-3 py-2 text-sm hover:bg-gray-100  rounded border"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Đăng ký
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="w-full px-3 py-2 text-sm hover:bg-gray-100  rounded border"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Đăng nhập
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
