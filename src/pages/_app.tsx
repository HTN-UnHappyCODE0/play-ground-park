import '~/styles/_globals.scss';

import Head from 'next/head';
import {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {Fragment, ReactElement, ReactNode} from 'react';
import AppProvider from '~/contexts/AppProvider';
import 'tippy.js/dist/tippy.css';

export const metadata = {
	icons: {
		icon: '/favicon.ico',
	},
};

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<Fragment>
			<Head>
				<title>Hệ thống quản lý</title>
				<meta name='description' content='Hệ thống quản lý' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale = 1.0' />
			</Head>
			<AppProvider pageProps={pageProps}>{getLayout(<Component {...pageProps} />)}</AppProvider>
		</Fragment>
	);
}
