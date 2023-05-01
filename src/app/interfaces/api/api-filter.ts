import { MovieGenres } from 'src/app/enums/movie-genres';

export interface ApiFilter {
	with_genres?: (keyof typeof MovieGenres)[] | number[];
	sort_by?: string;
	page?: number;
	primary_release_year?: number;
	with_runtime?: number;
	with_original_language?: string;
	with_watch_monetization_types?: string;
	with_watch_providers?: string;
	with_keywords?: string;
	with_people?: string;
	with_crew?: string;
	with_cast?: string;
	with_companies?: string;
	with_networks?: string;
	with_release_type?: string;
}
