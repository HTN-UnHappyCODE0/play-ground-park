import Image from 'next/image';
import styles from './ChartWrapper.module.scss';
import {PropsChartWrapper} from './interfaces';
import {memo} from 'react';
import icons from '~/constants/images/icons';
import clsx from 'clsx';

function ChartWrapper({children, isEmpty, message = 'Không có dữ liệu'}: PropsChartWrapper) {
	return (
		<div className={clsx(styles.wrapper, {[styles.wapper_empty]: isEmpty})}>
			{isEmpty ? (
				<div className={styles.empty}>
					<Image alt='Ảnh dữ liệu trống' src={icons.emptyTable} width={180} height={180} />
				</div>
			) : (
				children
			)}
		</div>
	);
}

export default memo(ChartWrapper);
