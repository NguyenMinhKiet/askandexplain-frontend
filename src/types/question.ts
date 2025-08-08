import type { UserType, AnswerType } from '~/types';

export default interface Question {
    id: number;
    title: string;
    description: string;
    author: UserType | null;
    answerCount: number;
    answers: AnswerType[];
}
