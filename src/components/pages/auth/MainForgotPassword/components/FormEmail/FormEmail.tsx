import React, {useContext} from 'react';

import {PropsFormEmail} from './interfaces';
import styles from './FormEmail.module.scss';
import {ContextForgotPassword, IContextForgotPassword} from '../../context';
import {Sms} from 'iconsax-react';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import Popup from '~/components/common/Popup';
import FormOTP from '../FormOTP';
import {useRouter} from 'next/router';
import {useMutation} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import Loading from '~/components/common/Loading';
import FormCustom, {ContextFormCustom, InputForm} from '~/components/common/FormCustom';
import accountServices from '~/services/accountServices';

function FormEmail({}: PropsFormEmail) {
	const router = useRouter();

	const {_open} = router.query;

	const {form, setForm} = useContext<IContextForgotPassword>(ContextForgotPassword);

	const funcSendOTP = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Mã OTP đã được gửi đến email của bạn',
				http: accountServices.sendOTP({
					email: form?.email,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				router.replace({
					pathname: router.pathname,
					query: {
						...router.query,
						_open: 'otp',
					},
				});
			}
		},
	});

	const handleSendOTP = () => {
		return funcSendOTP.mutate();
	};

	return (
		<FormCustom form={form} setForm={setForm} onSubmit={handleSendOTP}>
			<Loading loading={funcSendOTP.isPending} />
			<InputForm
				label={
					<span>
						Email <span style={{color: 'red'}}>*</span>
					</span>
				}
				placeholder='Nhập email'
				type='text'
				name='email'
				isEmail
				onClean
				isRequired
				isBlur
				icon={<Sms size='22' variant='Bold' />}
			/>
			<div className={styles.btn}>
				<ContextFormCustom.Consumer>
					{({isDone}) => (
						<Button p_10_24 fleetBlue60 rounded_50 bold disable={!isDone}>
							Lấy lại mật khẩu
						</Button>
					)}
				</ContextFormCustom.Consumer>

				<div className={styles.line}></div>
				<Button p_10_24 white rounded_50 bold maxHeight href={PATH.Login}>
					Đăng nhập ngay
				</Button>
			</div>

			<Popup
				open={_open == 'otp'}
				onClose={() => {
					const {_open, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<FormOTP />
			</Popup>
		</FormCustom>
	);
}

export default FormEmail;
