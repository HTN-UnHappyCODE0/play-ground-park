import React from 'react';

import {PropsTabNavLink} from './interfaces';
import styles from './TabNavLink.module.scss';
import {useRouter} from 'next/router';
import clsx from 'clsx';

function TabNavLink({query, listHref}: PropsTabNavLink) {
	const router = useRouter();

	const handleActive = (value: string | null) => {
		const {[query]: str, ...rest} = router.query;

		if (value == null) {
			return router.replace(
				{
					query: {
						...rest,
					},
				},
				undefined,
				{
					scroll: false,
				}
			);
		}

		return router.replace(
			{
				query: {
					...router.query,
					[query]: value,
				},
			},
			undefined,
			{
				scroll: false,
			}
		);
	};

	return (
		<div className={styles.container}>
			{listHref.map((item, i, arr) => (
				<div
					className={clsx(styles.item, {
						[styles.active]: router.query[`${query}`]
							? router.query[`${query}`] === item.query
							: !item.query || item.query == arr[0].query,
					})}
					key={i}
					onClick={() => handleActive(item.query)}
				>
					{item.title}
				</div>
			))}
		</div>
	);
}

export default TabNavLink;
