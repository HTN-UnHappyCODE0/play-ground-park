import {Dispatch, SetStateAction} from 'react';

export interface PropsFilterMany<T extends number | string> {
	styleRounded?: boolean;
	small?: boolean;
	name: string;
	listOption: {
		uuid: T;
		name: string;
		code?: string;
	}[];
	value: T[];
	setValue: Dispatch<SetStateAction<T[]>>;
}
