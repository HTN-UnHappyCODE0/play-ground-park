export interface PropsBaseLayout {
	children: React.ReactNode;
	title: string;
	breadcrumb?: React.ReactNode;
}

export interface TContextBaseLayout {
	showFull?: boolean;
	setShowFull?: (show: boolean) => void;
}
