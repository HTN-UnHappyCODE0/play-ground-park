import axiosClient from '.';

const authServices = {
	login: (
		data: {
			username: string;
			password: string;
			ip: string;
			address: string;
			type: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Auth/login`, data, {
			cancelToken: tokenAxios,
		});
	},
	logout: (data: {}, tokenAxios?: any) => {
		return axiosClient.post(`/Auth/logout`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default authServices;
