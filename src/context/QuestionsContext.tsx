import { createContext } from 'react';
import type { QuestionsContextType } from '~/types';

const QuestionsContext = createContext<QuestionsContextType | null>(null);
export default QuestionsContext;
