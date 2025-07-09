import {useRouter} from 'next/router';
import styles from './FormChangePassword.module.scss';
import {IFormChangePassword, PropsFormChangePassword} from './interfaces';
import {memo, useState} from 'react';
import FormCustom, {ContextFormCustom, InputForm} from '~/components/common/FormCustom';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import {clsx} from 'clsx';
import {useMutation} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import accountServices from '~/services/accountServices';
import md5 from 'md5';
import {PATH} from '~/constants/config';
import {toastWarn} from '~/common/funcs/toast';
import Loading from '~/components/common/Loading';

function FormChangePassword({onClose}: PropsFormChangePassword) {
	const router = useRouter();

	const [form, setForm] = useState<IFormChangePassword>({
		old_password: '',
		new_password: '',
		confirm_password: '',
	});

	const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

	const funcChangePassword = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Cập nhật mật khẩu thành công',
				http: accountServices.changePassword({
					oldPass: form.old_password,
					//  md5(`${form.old_password}_${process.env.NEXT_PUBLIC_KEY_PASSWORD}`),
					newPass: form?.new_password,
					//  md5(`${form?.new_password}_${process.env.NEXT_PUBLIC_KEY_PASSWORD}`),
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setForm({old_password: '', new_password: '', confirm_password: ''});
				onClose();
				const {redirect} = router.query;
				if (redirect && typeof redirect === 'string') {
					router.replace(redirect);
				} else {
					router.replace(PATH.Home); // hoặc bất kỳ trang mặc định nào
				}
			}
		},
	});
	const handleSubmit = () => {
		if (!regex.test(form?.new_password!)) {
			return toastWarn({
				msg: 'Mật khẩu mới phải chứa ít nhất 6 ký tự, bao gồm chữ cái, số và chữ in hoa!',
			});
		}

		return funcChangePassword.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcChangePassword.isPending} />
			<FormCustom form={form} setForm={setForm} onSubmit={handleSubmit}>
				<h4 className={styles.title}>Đổi mật khẩu </h4>
				<div className={styles.form}>
					<InputForm
						label={
							<span>
								Mật khẩu cũ <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập mật khẩu cũ'
						type='password'
						name='old_password'
						value={form?.old_password}
						isRequired
						onClean
						showDone
					/>
					<InputForm
						label={
							<span>
								Mật khẩu mới <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập mật khẩu mới'
						type='password'
						name='new_password'
						value={form?.new_password}
						onClean
						isRequired
						showDone
					/>
					<InputForm
						label={
							<span>
								Nhập lại mật khẩu mới <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Xác nhận mật khẩu mới'
						type='password'
						name='confirm_password'
						value={form?.confirm_password}
						valueConfirm={form.new_password}
						onClean
						isRequired
						showDone
					/>
				</div>

				<div className={styles.group_button}>
					<div>
						<Button rounded_50 p_10_40 greyBlue onClick={onClose}>
							Hủy bỏ
						</Button>
					</div>

					<div>
						<ContextFormCustom.Consumer>
							{({isDone}) => (
								<Button p_10_40 midnightBlue rounded_50 disable={!isDone}>
									Xác nhận
								</Button>
							)}
						</ContextFormCustom.Consumer>
					</div>
				</div>
				<div className={styles.close} onClick={onClose}>
					<IoClose size={28} color='#9EA5C0' />
				</div>
			</FormCustom>
		</div>
	);
}

export default memo(FormChangePassword);
