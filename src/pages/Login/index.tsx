import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../hooks/useAuth';
import { DOMAIN_BACKEND } from '~/config';

// Define schema with Zod
const loginSchema = z.object({
    email: z.email({ message: 'Email không hợp lệ' }),
    password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
});

type LoginForm = z.infer<typeof loginSchema>;

function Login(): JSX.Element {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        await fetch(`${DOMAIN_BACKEND}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.token) {
                    login(result.token);
                    console.log('Login: ', result.message);
                } else {
                    setError(result.error);
                }
            })
            .catch((err) => {
                setError(err.message || 'Login error');
            });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && <p className="text-red-500">{error}</p>}
                <div>
                    <label>Email</label>
                    <input placeholder="Nhập email..." {...register('email')} className="w-full border px-2 py-1" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                    <label>Mật khẩu</label>
                    <div className="flex">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            className="w-full border  px-2 py-1"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-sm text-gray-600 cursor-pointer border border-l-0  px-1.5"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-[var(--main-color)] hover:bg-[var(--main-color-hover)] text-white py-2 rounded cursor-pointer"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}

export default Login;
