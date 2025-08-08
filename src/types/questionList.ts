import type { QuestionType } from '~/types';

export default interface QuestionList {
    questions: QuestionType[];
    direction: 'horizontal' | 'vertical';
}
