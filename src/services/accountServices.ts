import axiosClient from '.';

const accountServices = {
	sendOTP: (
		data: {
			email: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/send-otp-email`, data, {
			cancelToken: tokenAxios,
		});
	},
	enterOTP: (
		data: {
			email: string;
			otp: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/enter-otp`, data, {
			cancelToken: tokenAxios,
		});
	},
	changePassForget: (
		data: {
			email: string;
			otp: string;
			newPass: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/reset-password`, data, {
			cancelToken: tokenAxios,
		});
	},
	changePassword: (
		data: {
			oldPass: string;
			newPass: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/change-password`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default accountServices;
