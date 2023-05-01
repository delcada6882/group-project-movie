import { ApiFilter } from './../interfaces/api/api-filter';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Movie } from '../interfaces/api/movie';
import { MovieGenres } from '../enums/movie-genres';
import { MovieList } from '../interfaces/api/movie-list';

@Injectable({
    providedIn: 'root',
})
export class ApiCallService {
    private exampleUrl =
        'https://api.themoviedb.org/3/movie/550?api_key=8f698de309d981464d08b5325ff05667';
    private discoverMovieUrl =
        'https://api.themoviedb.org/3/discover/movie?api_key=8f698de309d981464d08b5325ff05667';
    private searchMovieUrl =
        'https://api.themoviedb.org/3/search/movie?api_key=8f698de309d981464d08b5325ff05667';
    private popularUrl =
        'https://api.themoviedb.org/3/movie/popular?api_key=8f698de309d981464d08b5325ff05667';

    constructor(private http: HttpClient) { }


    getData() {
        return this.http.get<Movie>(this.exampleUrl);
    }

    getGenres() {
        return this.http.get<Movie>(
            `${this.discoverMovieUrl}&with_genres=${MovieGenres.Action}`
        );
    }

    getDataByFilter(apiFilter: ApiFilter) {
        if (
            apiFilter.with_genres &&
            typeof apiFilter?.with_genres[0] === 'string'
        )
            apiFilter.with_genres = apiFilter.with_genres.map<number>(
                (genre) => (MovieGenres[genre] ?? 0) as number
            );
        return this.http.get<Movie>(
            `${this.discoverMovieUrl}${apiFilter ? '&' : '?'}${Object.entries(
                apiFilter
            )
                .map(([key, value]) => `${key}=${value}`)
                .join('&')}`
        );
    }

    getDataBySearch(searchString: String) {
        return this.http.get<MovieList>(
            `${this.searchMovieUrl}&language=en-US&query=${searchString}&page=1&include_adult=false`
        );
    }

    getPopularMovies() {
        return this.http.get<MovieList>(this.popularUrl);
    }
}
