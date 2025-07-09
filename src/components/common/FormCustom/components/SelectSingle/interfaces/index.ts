export interface PropsSelectSingle<OptionType> {
	text?: string;
	label?: React.ReactNode;
	placeholder?: string;
	isSearch?: boolean;
	readOnly?: boolean;
	disabledItems?: (string | number)[];
	selectedItem?: string | number | null;
	options: OptionType[];
	title?: string;
	action?: React.ReactNode;
	getOptionLabel: (opt: OptionType) => string;
	getOptionValue: (opt: OptionType) => string | number;
	setSelectedItem?: (value: string | number | null) => void;
	renderOption?: (option: OptionType) => React.ReactNode;
	onClickSelect?: () => void;
}
