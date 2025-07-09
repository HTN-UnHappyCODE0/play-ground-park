import {useEffect} from 'react';
import {RootState, store} from '~/redux/store';

import {PropsSplashScreen} from './interfaces';
import clsx from 'clsx';
import styles from './SplashScreen.module.scss';
import {useSelector} from 'react-redux';
import {getItemStorage, setItemStorage} from '~/common/funcs/localStorage';
import {KEY_STORE} from '~/constants/config';
import {setLoading, setRememberPassword} from '~/redux/reducer/site';
import Lottie from 'react-lottie';
import {setDataLoginStorage, setStateLogin, setToken} from '~/redux/reducer/auth';
import {setInfoUser} from '~/redux/reducer/user';

import loading from '../../../../public/static/anim/loading_screen.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: loading,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

function SplashScreen({}: PropsSplashScreen) {
	const {loading, isRememberPassword} = useSelector((state: RootState) => state.site);
	const {infoUser} = useSelector((state: RootState) => state.user);
	const {token, isLogin, dataLoginStorage} = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		(async () => {
			const encryptedState = await getItemStorage(KEY_STORE);

			const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'default_key';

			const decode = (data: string): any => {
				try {
					const decoded = decodeURIComponent(atob(data));
					const clean = decoded.startsWith(SECRET_KEY) ? decoded.slice(SECRET_KEY.length) : null;
					return clean ? JSON.parse(clean) : null;
				} catch (err) {
					console.error('Decode error:', err);
					return null;
				}
			};

			const state = typeof encryptedState === 'string' ? decode(encryptedState) : null;

			if (!!state) {
				store.dispatch(setToken(state.token));
				store.dispatch(setStateLogin(state.isLogin));
				store.dispatch(setInfoUser(state.infoUser));
				store.dispatch(setRememberPassword(state.isRememberPassword));
				store.dispatch(setDataLoginStorage(state.dataLoginStorage));
			}

			store.dispatch(setLoading(false));
		})();
	}, []);

	useEffect(() => {
		if (!loading) {
			const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'default_key';

			const encode = (data: string): string => {
				const textToEncode = SECRET_KEY + data;
				return btoa(encodeURIComponent(textToEncode));
			};

			const hashedData = encode(
				JSON.stringify({
					isLogin,
					token,
					infoUser,
					isRememberPassword,
					dataLoginStorage,
				})
			);

			setItemStorage(KEY_STORE, hashedData);
		}
	}, [loading, isLogin, token, infoUser, isRememberPassword, dataLoginStorage]);

	return (
		<div className={clsx(styles.container, {[styles.close]: !loading})}>
			<div className={styles.logo}>
				<Lottie options={defaultOptions} />
			</div>
		</div>
	);
}

export default SplashScreen;
