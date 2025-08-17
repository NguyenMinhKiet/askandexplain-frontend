import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { DOMAIN_BACKEND } from '~/config';
// define Schema
const registerSchema = z
    .object({
        name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(20, 'Tối đa 20 ký tự'),
        email: z.email('Email không hợp lệ'),
        password: z.string().min(6, 'Mật khẩu ít nhất có 6 ký tự'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu xác nhận không khớp',
        path: ['confirmPassword'],
    });

type RegisterForm = z.infer<typeof registerSchema>;

function Register(): JSX.Element {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState('');
    const { login } = useAuth();

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
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        await fetch(`${DOMAIN_BACKEND}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setError(res.error);
                    return;
                }
                console.log('API success:', res.message);
                login(res.token);
            })
            .catch((err) => console.log('Failed to fetch: ', err));
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && <p className="text-red-500">{error}</p>}
                <div>
                    <label>Họ tên</label>
                    <input placeholder="Nhập họ tên..." {...register('name')} className="w-full border px-2 py-1" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
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
                            className="w-full border px-2 py-1"
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
                <div>
                    <label>Xác nhận mật khẩu</label>
                    <div className="flex">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register('confirmPassword')}
                            className="w-full border px-2 py-1"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="text-sm text-gray-600 cursor-pointer border border-l-0  px-1.5"
                        >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-[var(--main-color)] hover:bg-[var(--main-color-hover)] text-white py-2 rounded cursor-pointer"
                >
                    Đăng ký
                </button>
            </form>
        </div>
    );
}

export default Register;
