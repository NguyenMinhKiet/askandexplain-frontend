import type { QuestionType, UserType } from '~/types';

export interface AnswerType {
    _id: string;
    questionId: string;
    content: string;
    author: UserType;
    createdAt: string;
    updatedAt: string;
    voteCount: number;
}

export interface AnswerCreateType {
    questionId: string;
    content: string;
    author: string;
    voteCount: number;
}

export interface AnswerListType {
    questionBase: QuestionType;
    answers: AnswerType[];
}
