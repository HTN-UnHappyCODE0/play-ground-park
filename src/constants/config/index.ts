import {Element3} from 'iconsax-react';
import {TYPE_DATE} from './enum';

export const KEY_STORE = 'management-transport';

export enum PATH {
	Home = '/',
	Any = '/any',

	// AUTH
	Login = '/auth/login',
	ForgotPassword = '/auth/forgot-password',

	// PROFILE
	Profile = '/profile',
	UpdateProfile = '/profile/update',
}

export interface IMenus {
	titleModel: string;
	title: string;
	path?: string;
	pathActive?: string;
	isSpecial?: string;
	icon?: any;
	children?: IMenus[];
}

export const Menus: {
	title: string;
	group: {
		path: string;
		pathActive: string;
		title: string;
		icon: any;
	}[];
}[] = [
	{
		title: 'Tổng quan',
		group: [
			{
				title: 'Tổng quan',
				icon: Element3,
				path: PATH.Home,
				pathActive: PATH.Home,
			},
		],
	},
];

export const ListOptionFilterDate: {
	name: string;
	value: number;
}[] = [
	{
		name: 'Tất cả',
		value: TYPE_DATE.ALL,
	},
	{
		name: 'Hôm nay',
		value: TYPE_DATE.TODAY,
	},
	{
		name: 'Hôm qua',
		value: TYPE_DATE.YESTERDAY,
	},
	{
		name: 'Tuần này',
		value: TYPE_DATE.THIS_WEEK,
	},
	{
		name: 'Tuần trước',
		value: TYPE_DATE.LAST_WEEK,
	},
	{
		name: '7 ngày trước',
		value: TYPE_DATE.LAST_7_DAYS,
	},
	{
		name: 'Tháng này',
		value: TYPE_DATE.THIS_MONTH,
	},
	{
		name: 'Tháng trước',
		value: TYPE_DATE.LAST_MONTH,
	},
	{
		name: 'Năm này',
		value: TYPE_DATE.THIS_YEAR,
	},
	{
		name: 'Lựa chọn',
		value: TYPE_DATE.LUA_CHON,
	},
];
