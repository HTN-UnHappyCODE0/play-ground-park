import {Dispatch, SetStateAction} from 'react';

export interface PropsSelectMany<OptionType> {
	text: string;
	placeholder: string;
	label?: string | React.ReactNode;

	isSearch?: boolean;
	readOnly?: boolean;
	showSelectedItems?: false | 'default' | 'input';

	disabledItems?: Array<string | number>;
	selectedItems: Array<string | number>;
	options: OptionType[];
	title?: string;

	onClickSelect?: () => void;
	setSelectedItems?: Dispatch<SetStateAction<Array<string | number>>>;
	getOptionLabel: (option: OptionType) => string;
	getOptionValue: (option: OptionType) => string | number;
	onRemove?: (item: string | number) => void;

	action?: React.ReactNode;
	renderOption?: (option: OptionType) => React.ReactNode;
	selectedItemFields?: (keyof OptionType)[];
	selectedItemFieldLabels?: Record<string, string>;
}
