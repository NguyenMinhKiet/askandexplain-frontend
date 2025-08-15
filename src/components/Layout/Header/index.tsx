import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import SearchBox from '../SearchBox';
import { useState } from 'react';

function Header() {
    const { isLogin, logout, user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-y-2">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-[var(--main-color)] flex items-center justify-center">
                    <div className="    px-2">
                        <img src="/idea.png" className="w-[35px] h-[35px]" />
                    </div>
                    Ask&Explain
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
                        <>
                            <span className="text-gray-700 font-medium line-clamp-1 max-w-[240px]">
                                Xin chào,{' '}
                                <span className="text-[var(--main-color)]">
                                    {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'Người dùng'}
                                </span>
                            </span>
                            <button
                                type="button"
                                className="cursor-pointer px-4 py-1.5 bg-[var(--main-color)] text-white rounded hover:bg-[var(--main-color-hover)] transition"
                                onClick={logout}
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="cursor-pointer px-4 py-1.5 border border-main text-[var(--main-color)] rounded hover:text-white hover:bg-[var(--main-color-hover)] transition"
                            >
                                Đăng ký
                            </Link>
                            <Link
                                to="/login"
                                className="cursor-pointer px-4 py-1.5 bg-[var(--main-color)] text-white rounded hover:bg-[var(--main-color-hover)] transition"
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
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                            <div className="flex flex-col items-start p-2 space-y-1">
                                {isLogin ? (
                                    <>
                                        <div className="px-3 py-2 text-sm text-gray-700 border-b w-full">
                                            Xin chào,{' '}
                                            <span className="font-semibold text-[var(--main-color)]">
                                                {user?.name
                                                    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                                                    : 'Người dùng'}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-red-500"
                                            onClick={() => {
                                                logout();
                                                setMenuOpen(false);
                                            }}
                                        >
                                            Đăng xuất
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/register"
                                            className="w-full px-3 py-2 text-sm hover:bg-gray-100 rounded border"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Đăng ký
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="w-full px-3 py-2 text-sm hover:bg-gray-100 rounded border"
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
