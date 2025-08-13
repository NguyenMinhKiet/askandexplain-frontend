import type { UserType } from '~/types';

export interface Answer {
    _id: string;
    questionId: string;
    content: string;
    author: UserType;
    createdAt: string;
    voteCount: number;
}

export interface AnswerCreate {
    questionId: string;
    content: string;
    author: string;
    createdAt: string;
    voteCount: number;
}

export interface AnswerList {
    answers: Answer[];
    currentUserId: string;
}
