export interface ICustomerBase {
	uuid: string;
	name: string;
	type: number | null;
	staffUuid: string;
	email: string;
	contactNumber: string;
	representPerson: string;
	address: string;
	taxCode: string;
	bankName: string;
	bankNumber: string;
	provinceId: string;
	districtId: string;
	townId: string;
	description: string;
}

export interface ICustomer extends ICustomerBase {
	code: string;
	numRoutes: number;
	routes: {
		uuid: string;
		code: string;
		name: string;
	}[];
	isLocked: number;
	lockerUuid: string;
	lockReason: string;
	lockTime: Date;
	status: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IDetailCustomer extends ICustomerBase {
	routeUuids: string[];
	bankAccountName: string;
}
