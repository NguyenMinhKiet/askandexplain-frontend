import type { AnswerType } from '~/types';

export default interface AnswerList {
    answers: AnswerType[];
    currentUserId: number | null;
}
