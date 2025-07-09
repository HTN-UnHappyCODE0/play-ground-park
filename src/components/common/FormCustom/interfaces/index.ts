import {Dispatch, SetStateAction} from 'react';

export interface PropsFormCustom<T extends Record<string, any>> {
	children: React.ReactNode;
	form: T;
	setForm: Dispatch<SetStateAction<T>>;
	onSubmit?: () => void;
}
