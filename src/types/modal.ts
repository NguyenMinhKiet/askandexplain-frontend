import { type ReactNode } from 'react';
import type { AnswerCreateType, QuestionCreateType } from '.';

export interface Modal<T> {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: T) => void;
    title?: string;
    children?: ReactNode;
}

export interface AnswerModalType extends Modal<AnswerCreateType> {
    questionId: string;
    onSubmit: (data: AnswerCreateType) => void;
}

export interface QuestionModalType extends Modal<QuestionCreateType> {
    onSubmit: (data: QuestionCreateType) => void;
}
