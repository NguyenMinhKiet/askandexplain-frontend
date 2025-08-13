import { useContext } from 'react';

import QuestionContext from '~/context/QuestionsContext';
import type { QuestionsContextType } from '~/types';

// Custom hook to access context
export const useQuestion = (): QuestionsContextType => {
    const context = useContext(QuestionContext);
    if (!context) {
        throw new Error('useQuestion must be used within an QuestionProvider');
    }
    return context;
};
