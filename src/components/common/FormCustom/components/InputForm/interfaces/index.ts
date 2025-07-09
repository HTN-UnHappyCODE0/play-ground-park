import {Dispatch, SetStateAction} from 'react';

export interface PropsInputForm {
	type: string;
	name: string;
	placeholder: string;

	icon?: React.ReactNode;
	label?: string | React.ReactNode;

	value?: string | number;
	unit?: string;
	note?: string;
	textRequired?: string;
	valueConfirm?: string;
	textConfirm?: string;

	isBlur?: boolean;
	onClean?: boolean;
	showDone?: boolean;
	readOnly?: boolean;

	max?: number;
	min?: number;

	isRequired?: boolean;
	isNumber?: boolean;
	isPhone?: boolean;
	isEmail?: boolean;
	isMoney?: boolean;
	isUppercase?: boolean;

	onBlur?: () => void;
	onChangeValue?: (val: string | number) => void;
}
