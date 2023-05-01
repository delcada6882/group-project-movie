import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Movie } from '../interfaces/api/movie';
import { MovieList } from '../interfaces/api/movie-list';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpClient) {}

  exampleUrl =
    'https://api.themoviedb.org/3/movie/550?api_key=8f698de309d981464d08b5325ff05667';

  popularUrl =
    'https://api.themoviedb.org/3/movie/popular?api_key=8f698de309d981464d08b5325ff05667';

  getData() {
    return this.http.get<Movie>(this.exampleUrl);
  }

  getDataBySearch(searchString: String) {
    return this.http.get<MovieList>(
      `https://api.themoviedb.org/3/search/movie?api_key=8f698de309d981464d08b5325ff05667&language=en-US&query=${searchString}&page=1&include_adult=false`
    );
  }

  getPopularMovies() {
    return this.http.get<MovieList>(this.popularUrl);
  }
}
