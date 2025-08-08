import type { UserType } from '~/types';

export default interface Answer {
    id: number;
    questionId: number;
    content: string;
    author: UserType | null;
    createdAt: string;
    voteCount: number;
}
