import React from 'react';

import {PropsBaseLayout} from './interfaces';
import styles from './BaseLayout.module.scss';
import Header from './components/Header';
import Navbar from './components/Navbar';
import RequireAuth from '~/components/protected/RequiredAuth';

function BaseLayout({children, title, breadcrumb}: PropsBaseLayout) {
	return (
		// <RequireAuth>
		<div className={styles.container}>
			<nav className={styles.nav}>
				<Navbar />
			</nav>
			<header className={styles.header}>
				<Header title={title} breadcrumb={breadcrumb} />
			</header>
			<main className={styles.main}>{children}</main>
		</div>
		// </RequireAuth>
	);
}

export default BaseLayout;
