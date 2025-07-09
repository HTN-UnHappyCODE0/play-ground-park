import axiosClient from '.';

const userServices = {
	listUser: (
		data: {
			keyword: string;
			pageSize: number;
			page: number;
			position: number | null;
			gender: number | null;
			status: number | null;
			salaryFrom: number | null;
			salaryTo: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/get-list-page-user`, data, {
			cancelToken: tokenAxios,
		});
	},

	changeStatus: (
		data: {
			uuid: string;
			status: number;
			lockReason?: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/change-status`, data, {
			cancelToken: tokenAxios,
		});
	},

	createUser: (
		data: {
			uuid: string;
			name: string;
			managerUuid: string;
			doB: string;
			provinceId: string;
			districtId: string;
			townId: string;
			socialInsurance: string;
			position: number;
			phoneNumber: string;
			email: string;
			profileImage: string;
			gender: number;
			address: string;
			baseSalary: number;
			description: string;
			identityNumber: string;
			driverProfile: {
				vehiclePlate: string;
				licenseType: number | null;
				licenseNumber: string;
			};
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/create-user`, data, {
			cancelToken: tokenAxios,
		});
	},

	detailUser: (
		data: {
			keyword?: string;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/get-detail-user`, data, {
			cancelToken: tokenAxios,
		});
	},

	updateUser: (
		data: {
			uuid: string;
			name: string;
			managerUuid: string;
			doB: string;
			provinceId: string;
			districtId: string;
			townId: string;
			socialInsurance: string;
			position: number;
			phoneNumber: string;
			email: string;
			profileImage: string;
			gender: number;
			address: string;
			baseSalary: number;
			description: string;
			identityNumber: string;
			driverProfile: {
				vehiclePlate: string;
				licenseType: number | null;
				licenseNumber: string;
			};
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/update-user`, data, {
			cancelToken: tokenAxios,
		});
	},

	profileUser: (data: {}, tokenAxios?: any) => {
		return axiosClient.post(`/User/profile`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateProfile: (
		data: {
			name: string;
			phoneNumber: string;
			email: string;
			profileImage: string;
			gender: number;
			address: string;
			identityNumber: string;
			dob: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/update-profile`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default userServices;
