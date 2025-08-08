import type { QuestionType } from '~/types';

export default interface QuestionCard {
    question: QuestionType;
    direction: 'vertical' | 'horizontal';
}
