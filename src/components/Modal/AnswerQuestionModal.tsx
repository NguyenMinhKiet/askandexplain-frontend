import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { type AnswerQuestionProps, type Answer } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

// 1. Define Schema
const schema = z.object({
    content: z.string().min(5, 'Câu trả lời phải dài ít nhất 5 ký tự'),
});

type AnswerQuestionModal = z.infer<typeof schema>;

export default function AnswerQuestionModal({ isOpen, onClose, onSubmit, questionId }: AnswerQuestionProps) {
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AnswerQuestionModal>({
        resolver: zodResolver(schema),
    });

    const handleOnSubmit = (data: AnswerQuestionModal) => {
        const newAnswer: Answer = {
            id: Date.now(),
            questionId: questionId,
            content: data.content,
            author: user?.username || 'Ẩn danh',
            createdAt: new Date(Date.now()).toDateString(),
        };

        console.log('Gửi câu hỏi:', newAnswer);
        onSubmit(newAnswer);
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
                        <label className="block font-medium mb-1">Câu trả lời</label>
                        <input
                            type="text"
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
