import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Movie } from '../interfaces/movie';
import { MovieList } from '../interfaces/movie-list';

@Injectable({
    providedIn: 'root'
})
export class ApiCallService {

    constructor(private http: HttpClient) { }

    exampleUrl = 'https://api.themoviedb.org/3/movie/550?api_key=8f698de309d981464d08b5325ff05667';

    popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=8f698de309d981464d08b5325ff05667';



    getData() {
        return this.http.get<Movie>(this.exampleUrl);
    }

    getDataBySearch(searchString: String) {
        // console.log(this.http.get<any>("https://api.themoviedb.org/3/search/movie?api_key=8f698de309d981464d08b5325ff05667&language=en-US&query=Harry%20Potter&page=1&include_adult=false"))
        return this.http.get<MovieList>(`https://api.themoviedb.org/3/search/movie?api_key=8f698de309d981464d08b5325ff05667&language=en-US&query=${searchString}&page=1&include_adult=false`);
        //The &include_adult=false parameter is used to filter out adult content from the results.
        //TODO: Add a way to filter out certain things like adult movies or not in full compatibility with the app.
    }

    getPopularMovies() {
        return this.http.get<MovieList>(this.popularUrl);
    }


}
