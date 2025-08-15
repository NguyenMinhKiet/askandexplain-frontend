import type { UserType, AnswerType } from '~/types';

export interface QuestionType {
    _id: string;
    title: string;
    content: string;
    author: UserType | null;
    answerCount: number;
    answers: AnswerType[];
}

export interface QuestionCreateType {
    title: string;
    content: string;
    author: string;
    answerCount: number;
    answers: AnswerType[];
}

export interface QuestionCardType {
    question: QuestionType;
    direction: 'vertical' | 'horizontal';
}

export interface QuestionListType {
    questions: QuestionType[];
    direction: 'horizontal' | 'vertical';
}
export interface QuestionsContextType {
    questions: QuestionType[];
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
    refreshQuestions: () => void;
}
