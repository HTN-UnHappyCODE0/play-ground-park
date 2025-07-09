import React, {Fragment, useCallback} from 'react';
import {PropsLayoutPages} from './interfaces';

import styles from './LayoutPages.module.scss';
import {useRouter} from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

function LayoutPages({children, listPages}: PropsLayoutPages) {
	const router = useRouter();

	const checkActive = useCallback(
		(pathname: string) => {
			const currentRoute = router.pathname;
			return pathname == `${currentRoute}`;
		},
		[router]
	);

	return (
		<Fragment>
			<div className={styles.tabs}>
				{listPages.map((item, i) => (
					<Link
						onClick={(e) => {
							if (checkActive(item.url)) {
								e.preventDefault();
							}
						}}
						href={item.url}
						className={clsx(styles.item, {
							[styles.active]: checkActive(item.url),
						})}
						key={i}
					>
						<div className={styles.flex}>
							<div
								style={{
									background: checkActive(item.url) ? '#fff' : item.color,
								}}
								className={styles.dot}
							></div>
							<p>{item.title}</p>
						</div>
					</Link>
				))}
			</div>
			<div className={styles.main}>{children}</div>
		</Fragment>
	);
}

export default LayoutPages;
