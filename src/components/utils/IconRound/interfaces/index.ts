import icons from '~/constants/images/icons';

export interface PropsIconRound {
	type?: IconRoundType;
	icon?: React.ReactNode;
	className?: string;
	size?: number;
}

export const ICON_ROUND_TYPES = ['successPlay', 'success', 'error', 'errorEnd', 'errorGoods'] as const;

export type IconRoundType = (typeof ICON_ROUND_TYPES)[number];

export const iconMap = {
	success: icons.tickCircle,
	successPlay: icons.successPlay,
	error: icons.errorWarning,
	errorEnd: icons.errorEnd,
	errorGoods: icons.errorGoods,
};
