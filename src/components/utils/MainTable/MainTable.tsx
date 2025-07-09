import React from 'react';

import {PropsMainTable} from './interfaces';
import styles from './MainTable.module.scss';

function MainTable({icon, title, action, children}: PropsMainTable) {
	return (
		<div className={styles.container}>
			<div className={styles.head} style={{display: !title && !action ? 'none' : undefined}}>
				<div className={styles.info}>
					{icon && icon}
					<h4>{title}</h4>
				</div>

				{action && <div className={styles.actions}>{action}</div>}
			</div>

			<div className={styles.line} style={{display: !title && !action ? 'none' : undefined}}></div>
			<div className={styles.main}>{children}</div>
		</div>
	);
}

export default MainTable;
