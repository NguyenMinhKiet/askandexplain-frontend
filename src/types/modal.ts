import { type ReactNode } from 'react';

export default interface Modal<T> {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: T) => void;
    title?: string;
    children?: ReactNode;
}
