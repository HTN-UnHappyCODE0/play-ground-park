import axiosClient from '.';

const provinceServices = {
	listProvince: (
		data: {
			keyword: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Province/get-list-province`, data, {
			cancelToken: tokenAxios,
		});
	},
	listDistrict: (
		data: {
			keyword: string;
			idParent: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Province/get-list-district`, data, {
			cancelToken: tokenAxios,
		});
	},
	listTown: (
		data: {
			keyword: string;
			idParent: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Province/get-list-town`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default provinceServices;
