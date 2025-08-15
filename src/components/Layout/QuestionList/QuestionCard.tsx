import { Link } from 'react-router-dom';
import { memo } from 'react';
import type { QuestionCardType } from '~/types';

function QuestionCard({ question, direction = 'vertical' }: QuestionCardType) {
    return (
        <Link
            to={`/questions/${question._id}`}
            className={
                direction === 'horizontal'
                    ? 'cursor-pointer w-full inline-block md-w-64 min-w-[16rem] h-40 bg-white border rounded-lg p-4 shadow-md mr-4 hover:shadow-lg transition relative'
                    : 'cursor-pointer w-full h-40 bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition flex flex-col'
            }
        >
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 text-wrap">{question.title}</h2>
            <p className="text-gray-600 mt-2 text-sm line-clamp-2 text-wrap">{question.content}</p>
            <div
                className={`text-xs text-gray-500 flex justify-between ${
                    direction === 'horizontal' ? 'absolute left-4 right-4 bottom-4' : 'mt-auto'
                }`}
            >
                <span>
                    Người hỏi: {question.author && question.author?.name?.length > 1 ? question.author.name : 'Ẩn danh'}
                </span>
                <span>{question.answerCount} lượt giải thích</span>
            </div>
        </Link>
    );
}

export default memo(QuestionCard);
