import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/api/movie';
import { MovieList } from 'src/app/interfaces/api/movie-list';
import { ApiCallService } from 'src/app/services/api-call.service';
import { PopularPageComponent } from '../popular-page/popular-page.component';

@Component({
	selector: 'app-movie-page',
	templateUrl: './movie-page.component.html',
	styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit {
	constructor(private ApiCallService: ApiCallService) {}

	componentPop = PopularPageComponent;

	popularMovies: any = [];
	buttonText = 'Show More';

	showPopularMovies(pageNum: number) {
		this.ApiCallService.getPopularMovies(pageNum).subscribe((data: any) => {
			console.log(data);
			this.popularMovies = data.results;
		});
	}
	ngOnInit() {
		this.showPopularMovies(1);
	}
}
