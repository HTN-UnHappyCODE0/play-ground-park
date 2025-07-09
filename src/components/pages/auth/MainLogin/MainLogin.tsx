import React, {useEffect, useState} from 'react';

import {PropsMainLogin} from './interfaces';
import styles from './MainLogin.module.scss';
import {LockCircle, ShieldSecurity, User} from 'iconsax-react';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import {useSelector} from 'react-redux';
import {RootState, store} from '~/redux/store';
import {setRememberPassword} from '~/redux/reducer/site';
import {useMutation} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import md5 from 'md5';
import Loading from '~/components/common/Loading';
import {setDataLoginStorage, setStateLogin, setToken} from '~/redux/reducer/auth';
import {setInfoUser} from '~/redux/reducer/user';
import {useRouter} from 'next/router';
import FormCustom, {InputForm} from '~/components/common/FormCustom';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import authServices from '~/services/authServices';

function MainLogin({}: PropsMainLogin) {
	const router = useRouter();

	const {dataLoginStorage} = useSelector((state: RootState) => state.auth);
	const {isRememberPassword} = useSelector((state: RootState) => state.site);

	const [form, setForm] = useState<{
		username: string;
		password: string;
	}>({
		username: '',
		password: '',
	});

	useEffect(() => {
		if (isRememberPassword) {
			setForm({
				username: dataLoginStorage?.usernameStorage || '',
				password: dataLoginStorage?.passwordStorage || '',
			});
		} else {
			setForm({
				username: '',
				password: '',
			});
		}
	}, []);

	const funcLogin = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Đăng nhập thành công!',
				http: authServices.login({
					username: form.username,
					password: form.password,
					ip: '',
					address: '',
					type: 0,
				}),
			}),
		onSuccess(data) {
			if (data) {
				store.dispatch(setStateLogin(true));
				store.dispatch(setToken(data.accessToken));
				store.dispatch(
					setDataLoginStorage({
						usernameStorage: form.username,
						passwordStorage: form.password,
					})
				);
				store.dispatch(
					setInfoUser({
						accessToken: data?.accessToken || '',
						refreshToken: data?.refreshToken || '',
						accessExpiresAt: data?.accessExpiresAt || '',
						refreshExpiresAt: data?.refreshExpiresAt || '',
						avatar: data?.avatar || '',
						fullname: data?.fullname || '',
					})
				);

				router.replace(PATH.Home, undefined, {scroll: false});
			}
		},
	});

	const handleLogin = () => {
		if (isRememberPassword) {
			store.dispatch(
				setDataLoginStorage({
					usernameStorage: form.username,
					passwordStorage: form.password,
				})
			);
		} else {
			store.dispatch(setDataLoginStorage(null));
		}

		return funcLogin.mutate();
	};

	return (
		<div className={styles.login}>
			<Loading loading={funcLogin.isPending} />
			<FormCustom form={form} setForm={setForm} onSubmit={handleLogin}>
				<h3>Đăng nhập</h3>
				<p>Chào mừng bạn đến với hệ thống quản lý </p>

				<div className={styles.form}>
					<InputForm
						label={
							<span>
								Tài khoản <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Tài khoản'
						type='text'
						name='username'
						onClean
						isRequired
						isBlur
						showDone
						icon={<User size='22' variant='Bold' />}
					/>
					<InputForm
						label={
							<span>
								Mật khẩu <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Mật khẩu'
						type='password'
						name='password'
						onClean
						isRequired
						isBlur
						showDone
						icon={<ShieldSecurity size='22' variant='Bold' />}
					/>
					<div className={styles.remember_password}>
						<input
							className={styles.checkbox}
							id='rememberPassword'
							type='checkbox'
							name='isRememberPassword'
							checked={isRememberPassword}
							onChange={() => store.dispatch(setRememberPassword(!isRememberPassword))}
						/>
						<label htmlFor='rememberPassword'>Nhớ mật khẩu</label>
					</div>
					<div className={styles.btn}>
						<Button p_10_24 midnightBlue rounded_50 bold>
							Đăng nhập
						</Button>
						<div className={styles.line}></div>
						<Button icon={<LockCircle size='24' />} p_10_24 white rounded_50 bold maxHeight href={PATH.ForgotPassword}>
							Quên mật khẩu
						</Button>
					</div>
				</div>
			</FormCustom>
		</div>
	);
}

export default MainLogin;
