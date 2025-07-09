import React, {useContext, useEffect, useState} from 'react';

import {PropsFormPassword} from './interfaces';
import styles from './FormPassword.module.scss';
import {ContextForgotPassword, IContextForgotPassword} from '../../context';
import Button from '~/components/common/Button';
import {ShieldSecurity} from 'iconsax-react';
import {useRouter} from 'next/router';
import {useMutation} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import md5 from 'md5';
import {PATH} from '~/constants/config';
import Loading from '~/components/common/Loading';
import FormCustom, {ContextFormCustom, InputForm} from '~/components/common/FormCustom';
import authServices from '~/services/authServices';
import {useSelector} from 'react-redux';
import {RootState, store} from '~/redux/store';
import {setDataLoginStorage, setStateLogin, setToken} from '~/redux/reducer/auth';
import {setInfoUser} from '~/redux/reducer/user';

function FormPassword({}: PropsFormPassword) {
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
					password: md5(`${form.password}_${process.env.NEXT_PUBLIC_KEY_PASSWORD}`),
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
		<FormCustom form={form} setForm={setForm} onSubmit={handleLogin}>
			<Loading loading={funcLogin.isPending} />
			<InputForm
				label={
					<span>
						Mật khẩu mới <span style={{color: 'red'}}>*</span>
					</span>
				}
				placeholder='Nhập mật khẩu mới'
				type='password'
				name='password'
				onClean
				isRequired
				isBlur
				showDone
				icon={<ShieldSecurity size='22' variant='Bold' />}
			/>
			<InputForm
				label={
					<span>
						Xác nhận mật khẩu mới <span style={{color: 'red'}}>*</span>
					</span>
				}
				placeholder='Xác nhận mật khẩu mới'
				type='rePassword'
				name='rePassword'
				valueConfirm={form.password}
				onClean
				isRequired
				isBlur
				showDone
				icon={<ShieldSecurity size='22' variant='Bold' />}
			/>
			<div className={styles.btn}>
				<ContextFormCustom.Consumer>
					{({isDone}) => (
						<Button p_10_24 midnightBlue rounded_50 bold disable={!isDone}>
							Lấy lại mật khẩu
						</Button>
					)}
				</ContextFormCustom.Consumer>
			</div>
		</FormCustom>
	);
}

export default FormPassword;
