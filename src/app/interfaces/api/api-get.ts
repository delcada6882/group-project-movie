export namespace Api {
	export interface Paginated<T> {
		page: number;
		results: T[];
		total_pages: number;
		total_results: number;
	}
}
