import { Component, OnInit, Input } from '@angular/core';
import { MovieList } from 'src/app/interfaces/api/movie-list';

@Component({
	selector: 'app-movie-poster',
	templateUrl: './movie-poster.component.html',
	styleUrls: ['./movie-poster.component.scss'],
})
export class MoviePosterComponent implements OnInit {
	@Input() movieList: MovieList[] = [];
	@Input() anchorTag: boolean = false;

	urlStart = 'https://image.tmdb.org/t/p/w500';

	clickAnim(item: Element) {
		console.log('hello');
		item.classList.add('clickAnimClass');
		item.addEventListener('animationend', () => {
			item.classList.remove('clickAnimClass');
		});
	}

	constructor() {}

	ngOnInit() {}
}
