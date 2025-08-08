import type { AnswerType, ModalType } from '~/types';

export default interface AnswerQuestionProps extends ModalType<AnswerType> {
    questionId: number;
}
