export * from './container';
export * from './content';
export * from './fields';
export * from './footer';

export interface FormProps<T> {
    onSubmit: (value: T) => void;
    onCancel?: () => void;
    defaultValues?: T;
}
