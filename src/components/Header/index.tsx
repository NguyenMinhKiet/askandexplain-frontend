import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Header() {
    const { isLogin, logout } = useAuth();

    return (
        <header className="bg-white border-b shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">
                    🧠 Ask&Explain
                </Link>
                <div className="space-x-4">
                    {isLogin ? (
                        <button
                            type="button"
                            className="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="px-4 py-1.5 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition"
                            >
                                Đăng ký
                            </Link>
                            <Link
                                to="/login"
                                className="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Đăng nhập
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
