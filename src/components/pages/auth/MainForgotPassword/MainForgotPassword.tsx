import React, {useState} from 'react';

import {IFormForgotPassword, PropsMainForgotPassword, TYPE_FORGOT_PASWORD} from './interfaces';
import styles from './MainForgotPassword.module.scss';
import {ContextForgotPassword} from './context';
import FormEmail from './components/FormEmail';
import FormPassword from './components/FormPassword';

function MainForgotPassword({}: PropsMainForgotPassword) {
	const [type, setType] = useState<TYPE_FORGOT_PASWORD>(TYPE_FORGOT_PASWORD.EMAIL);
	const [form, setForm] = useState<IFormForgotPassword>({
		email: '',
		otp: '',
		password: '',
		rePassword: '',
	});

	return (
		<div className={styles.forgotPassword}>
			<h3>Quên mật khẩu</h3>
			<p>Nhập địa chỉ email liên kết với tài khoản của bạn để lấy lại mật khẩu!</p>
			<div className={styles.form}>
				<ContextForgotPassword.Provider
					value={{
						form: form,
						setForm: setForm,
						type: type,
						setType: setType,
					}}
				>
					{type == TYPE_FORGOT_PASWORD.EMAIL && <FormEmail />}
					{type == TYPE_FORGOT_PASWORD.PASSWORD && <FormPassword />}
				</ContextForgotPassword.Provider>
			</div>
		</div>
	);
}

export default MainForgotPassword;
