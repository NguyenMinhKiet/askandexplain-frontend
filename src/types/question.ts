import type { UserType, AnswerType } from '~/types';

export interface Question {
    _id: string;
    title: string;
    content: string;
    author: UserType | null;
    answerCount: number;
    answers: AnswerType[];
}

export interface QuestionCreate {
    title: string;
    content: string;
    author: UserType | null;
    answerCount: number;
    answers: AnswerType[];
}

export interface QuestionCard {
    question: Question;
    direction: 'vertical' | 'horizontal';
}

export interface QuestionList {
    questions: Question[];
    direction: 'horizontal' | 'vertical';
}
export interface QuestionsContext {
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}
