import {store} from '~/redux/store';
import {HydrationBoundary, QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import SplashScreen from '~/components/protected/SplashScreen';
import LoadingTopBar from '~/components/protected/LoadingTopBar';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

function AppProvider({children, pageProps}: {children: React.ReactNode; pageProps: any}) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<HydrationBoundary state={pageProps.dehydratedState}>
					<LoadingTopBar />
					<SplashScreen />
					<ToastContainer autoClose={3000} />
					{children}
				</HydrationBoundary>
			</QueryClientProvider>
		</Provider>
	);
}

export default AppProvider;
