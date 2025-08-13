import { type ReactNode } from 'react';
import type { AnswerType, QuestionCreateType, QuestionType } from '.';
import type { AnswerCreate } from './answer';

export interface Modal<T> {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: T) => void;
    title?: string;
    children?: ReactNode;
}

export interface AnswerModal extends Modal<AnswerType> {
    questionId: string;
    onSubmit: (data: AnswerCreate) => void;
}

export interface QuestionModal extends Modal<QuestionType> {
    onSubmit: (data: QuestionCreateType) => void;
}
