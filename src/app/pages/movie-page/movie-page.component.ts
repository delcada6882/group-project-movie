import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { PopularPageComponent } from '../popular-page/popular-page.component';
import { MovieList } from 'src/app/interfaces/api/movie-list';

@Component({
	selector: 'app-movie-page',
	templateUrl: './movie-page.component.html',
	styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit {
	public popularMovies: MovieList[] = [];
	public buttonText = 'Show More';

	componentPop = PopularPageComponent;

	constructor(private ApiCallService: ApiCallService) {}

	ngOnInit() {
		this.showPopularMovies(1);
	}

	public showPopularMovies(pageNum: number) {
		this.ApiCallService.getPopularMovies(pageNum).subscribe((data) => {
			this.popularMovies = data.results;
		});
	}
}
