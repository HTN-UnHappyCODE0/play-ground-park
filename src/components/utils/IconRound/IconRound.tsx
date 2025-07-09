import clsx from 'clsx';
import styles from './IconRound.module.scss';
import {iconMap, PropsIconRound} from './interfaces';
import {memo} from 'react';
import Image from 'next/image';
import icons from '~/constants/images/icons';

function IconRound({type = 'success', icon, className, size = 24}: PropsIconRound) {
	const renderDefaultIcon = () => {
		const imgSrc = iconMap[type] ?? icons.tickCircle;
		return <Image alt={`icon ${type}`} src={imgSrc} width={size} height={size} />;
	};

	return (
		<div className={clsx(styles.icon_round, styles[type], className)}>
			<div className={clsx(styles.icon, styles[`${type}Inner`])}>{icon ?? renderDefaultIcon()}</div>
		</div>
	);
}

export default memo(IconRound);
