import { Component, OnInit } from '@angular/core';
import { ApiCallService } from './services/api-call.service';
import { Movie } from './interfaces/movie';
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
	public appPages = [
		{ title: 'Profile', url: '/folder/profile', icon: 'person' },
		{ title: 'Movies', url: '/folder/movies', icon: 'film' },
		{ title: 'Spam', url: '/folder/spam', icon: 'warning' },
	];
	public categories = [
		{ title: 'Popular', url: '/popular', icon: 'sparkles' },
		{ title: 'Family', url: '/genre/Family', icon: 'people' },
		{ title: 'Action', url: '/genre/Action', src: '/icon/gun.svg' },
		{
			title: 'Comedy',
			url: '/genre/Comedy',
			src: '/icon/laugh.svg',
		},
		{ title: 'Horror', url: '/genre/Horror', icon: 'skull' },
		{
			title: 'Fantasy',
			url: '/genre/Fantasy',
			src: '/icon/dragon-head.svg',
		},
		{ title: 'Drama', url: '/genre/Drama', src: '/icon/drama-masks.svg' },
	];

	public bookmarks = [
		'Harry Potter',
		'Lord of the Rings',
		'Avengers',
		'Pirates of the Caribbean',
		'Jurassic Park',
		'Back to the Future',
	];

	constructor(private ApiCallService: ApiCallService) {}

	showData() {
		this.ApiCallService.getData().subscribe((data: Movie) => {
			console.log(data);
		});
	}

	ngOnInit() {
		this.showData();
	}
}
