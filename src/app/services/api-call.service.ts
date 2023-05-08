import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/api/movie';
import { MovieGenres } from '../enums/movie-genres';
import { MovieList } from '../interfaces/api/movie-list';
import { ApiFilter } from './../interfaces/api/api-filter';
import { API_KEY } from 'src/utility/constants/api';
import { Api } from '../interfaces/api/api-get';

@Injectable({
	providedIn: 'root',
})
export class ApiCallService {
	private discoverMovieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
	private searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
	private popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

	constructor(private http: HttpClient) {}

	public getMovieById(movieId: number) {
		return this.http.get<Movie>(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
		);
	}

	public getGenres() {
		return this.http.get<MovieList>(
			`${this.discoverMovieUrl}&with_genres=${MovieGenres.Action}`
		);
	}

	public getDataByFilter(apiFilter: ApiFilter) {
		if (
			apiFilter.with_genres &&
			typeof apiFilter?.with_genres[0] === 'string'
		)
			apiFilter.with_genres = apiFilter.with_genres.map<number>(
				(genre) => (MovieGenres[genre] ?? 0) as number
			);
		return this.http.get<Api.Paginated<MovieList>>(
			`${this.discoverMovieUrl}${apiFilter ? '&' : '?'}${Object.entries(
				apiFilter
			)
				.map(([key, value]) => `${key}=${value}`)
				.join('&')}`
		);
	}

	public getSimilarMovies(movieId: Number) {
		return this.http.get<Api.Paginated<MovieList>>(
			`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`
		);
	}

	public getDataBySearch(searchString: String) {
		return this.http.get<Api.Paginated<MovieList>>(
			`${this.searchMovieUrl}&language=en-US&query=${searchString}&page=1&include_adult=false`
		);
	}
	public getPopularMovies(pageNum: number) {
		return this.http.get<Api.Paginated<MovieList>>(
			this.popularUrl + `&page=${String(pageNum)}`
		);
	}

    getCastByMovie(movieId: Number) {
        return this.http.get<MovieList>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8f698de309d981464d08b5325ff05667`
        );
    }
}
