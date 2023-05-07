import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/api/movie';
import { MovieList } from 'src/app/interfaces/api/movie-list';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
	selector: 'app-movie-search-page',
	templateUrl: './movie-search-page.component.html',
	styleUrls: ['./movie-search-page.component.scss'],
})
export class MovieSearchPageComponent implements OnInit {
	public movieList: MovieList[] = [];
	public urlStart = 'https://image.tmdb.org/t/p/w500';
	public searchMovie: String = '';
	public showLoading = false;

	constructor(private ApiCallService: ApiCallService) {}

	ngOnInit() {}

	public showDataList(searchString: String) {
		this.showLoading = true;
		this.ApiCallService.getDataBySearch(searchString).subscribe((data) => {
			this.movieList = data.results;
			this.showLoading = false;
		});
	}
}
