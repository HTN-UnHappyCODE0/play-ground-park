import React, {useContext, useEffect, useState} from 'react';

import {PropsFormOTP} from './interfaces';
import styles from './FormOTP.module.scss';
import fancyTimeFormat, {obfuscateEmail} from '~/common/funcs/optionConvert';
import {ContextForgotPassword, IContextForgotPassword} from '../../context';
import InputSingle from '~/components/common/InputSingle';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import {useRouter} from 'next/router';
import {TYPE_FORGOT_PASWORD} from '../../interfaces';
import {useMutation} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import Loading from '~/components/common/Loading';
import accountServices from '~/services/accountServices';

function FormOTP({}: PropsFormOTP) {
	const TIME_OTP = 60;

	const router = useRouter();

	const [countDown, setCoutDown] = useState<number>(TIME_OTP);

	const {form, setForm, setType} = useContext<IContextForgotPassword>(ContextForgotPassword);

	useEffect(() => {
		if (countDown > 0) {
			const time = setTimeout(() => {
				setCoutDown(countDown - 1);
			}, 1000);
			return () => clearInterval(time);
		}
	}, [countDown]);

	const closeForm = () => {
		const {_open, ...rest} = router.query;

		router.replace({
			pathname: router.pathname,
			query: {
				...rest,
			},
		});
	};

	const funcSendOTP = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Mã OTP đã được gửi đến email của bạn',
				http: accountServices.sendOTP({
					email: form?.email!,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setCoutDown(TIME_OTP);
			}
		},
	});

	const funcSubmitOTP = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xác thực thành công',
				http: accountServices.enterOTP({
					email: form?.email!,
					otp: form?.otp!,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setType(TYPE_FORGOT_PASWORD.PASSWORD);
				closeForm();
			}
		},
	});

	const handleSendcode = () => {
		return funcSendOTP.mutate();
	};

	const handleSubmit = () => {
		return funcSubmitOTP.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcSendOTP.isPending || funcSubmitOTP.isPending} />
			<h3 className={styles.title}>Xác thực mã OTP</h3>
			<p className={styles.des}>
				Một mã xác thực đã được gửi cho bạn qua địa chỉ email: <span>{obfuscateEmail(form?.email!)}</span>
			</p>
			<div className={styles.form}>
				<p className={styles.text_otp}>Nhập mã OTP</p>
				<div className={styles.box_code}>
					<InputSingle onSetValue={setForm} name='otp' lenght={6} />
				</div>
				<p className={styles.countDown}>
					Bạn chưa nhận được mã.
					{countDown > 0 ? (
						<span className={styles.textGreen}>Gửi lại OTP ({fancyTimeFormat(countDown)})</span>
					) : (
						<span className={styles.textGreen} onClick={handleSendcode}>
							Gửi lại OTP
						</span>
					)}
				</p>
			</div>
			<div className={styles.btn}>
				<Button p_10_24 midnightBlue rounded_50 bold disable={form?.otp?.length! < 6} onClick={handleSubmit}>
					Xác thực Email
				</Button>
			</div>

			<div className={styles.close} onClick={closeForm}>
				<IoClose size={24} />
			</div>
		</div>
	);
}

export default FormOTP;
