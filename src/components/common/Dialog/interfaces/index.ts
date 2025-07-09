import {IconRoundType} from '~/components/utils/IconRound/interfaces';

export interface PropsDialog {
	open: boolean;
	title: React.ReactNode;
	note?: string | React.ReactNode;
	onClose: () => any;
	onSubmit: () => any;
	titleCancel?: string;
	titleSubmit?: string;
	type?: IconRoundType;
}
