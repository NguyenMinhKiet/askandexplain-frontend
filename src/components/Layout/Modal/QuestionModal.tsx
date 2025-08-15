import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import type { QuestionCreateType, QuestionModalType } from '~/types';

// 1. Define Schema
const schema = z.object({
    title: z.string().min(5, 'Tiêu đề phải dài ít nhất 5 ký tự'),
    content: z.string().min(10, 'Mô tả phải dài ít nhất 10 ký tự'),
});

type AskQuestionForm = z.infer<typeof schema>;

export default function AskQuestionModal({ isOpen, onClose, onSubmit }: QuestionModalType) {
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AskQuestionForm>({
        resolver: zodResolver(schema),
    });

    const handleOnSubmit = (data: AskQuestionForm) => {
        const newQuestion: QuestionCreateType = {
            title: data.title,
            content: data.content,
            author: user._id,
            answerCount: 0,
            answers: [],
        };

        onSubmit(newQuestion);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:bg-gray-200 text-xl z-50 flex items-center justify-center rounded-full p-3 border cursor-pointer"
                >
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <h2 className="text-xl font-semibold mb-4">Đặt câu hỏi mới</h2>
                <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Tiêu đề</label>
                        <input
                            type="text"
                            {...register('title')}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                        />
                        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Chi tiết câu hỏi</label>
                        <textarea
                            rows={4}
                            {...register('content')}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                        />
                        {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>}
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Hủy
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Gửi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
