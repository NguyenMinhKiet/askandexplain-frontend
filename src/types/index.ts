import { type ReactNode } from 'react';

export type Answer = {
    id: number;
    questionId: number;
    content: string;
    author: string;
    createdAt: string;
};

export type Question = {
    id: number;
    title: string;
    description: string;
    author: string;
    answerCount: number;
    answers: Answer[];
};

export interface ModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: T) => void;
    title?: string;
    children?: ReactNode;
}

export interface AskQuestionProps extends ModalProps<Question> {}

export interface AnswerQuestionProps extends ModalProps<Answer> {
    questionId: number;
}
