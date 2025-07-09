export interface Pagination {
	totalCount: number;
	totalPage: number;
}

export interface PaginatedResponse<T> {
	items: T[];
	pagination: Pagination;
}
