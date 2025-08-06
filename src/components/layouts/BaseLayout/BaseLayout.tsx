import React, {createContext} from 'react';

import {PropsBaseLayout, TContextBaseLayout} from './interfaces';
import styles from './BaseLayout.module.scss';
import Header from './components/Header';
import Navbar from './components/Navbar';
import RequireAuth from '~/components/protected/RequiredAuth';
import {create} from 'domain';
import clsx from 'clsx';

export const ContextBaseLayout = createContext<TContextBaseLayout>({});

function BaseLayout({children, title, breadcrumb}: PropsBaseLayout) {
	const [showFull, setShowFull] = React.useState<boolean>(true);

	return (
		// <RequireAuth>
		<ContextBaseLayout.Provider value={{showFull, setShowFull}}>
			<div className={clsx(styles.container, {[styles.full]: !showFull})}>
				<nav className={styles.nav}>
					<Navbar />
				</nav>
				<header className={styles.header}>
					<Header title={title} breadcrumb={breadcrumb} />
				</header>
				<main className={styles.main}>{children}</main>
			</div>
		</ContextBaseLayout.Provider>
		// </RequireAuth>
	);
}

export default BaseLayout;
