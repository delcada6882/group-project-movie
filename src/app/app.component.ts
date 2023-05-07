import { Component, OnInit } from '@angular/core';
import { ApiCallService } from './services/api-call.service';
import { Movie } from './interfaces/api/movie';
import { AuthService } from './services/auth/auth.service';
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
	public appPages = [
		{ title: 'Profile', url: '/profile', icon: 'person' },
		{ title: 'Movies', url: '/movies', icon: 'film' },
		{ title: 'Spam', url: '/spam', icon: 'warning' },
	];
	public categories = [
		{ title: 'Popular', url: 'movies/popular', icon: 'sparkles' },
		{ title: 'Family', url: 'movies/genre/Family', icon: 'people' },
		{ title: 'Action', url: 'movies/genre/Action', src: '/icon/gun.svg' },
		{
			title: 'Comedy',
			url: 'movies/genre/Comedy',
			src: '/icon/laugh.svg',
		},
		{ title: 'Horror', url: 'movies/genre/Horror', icon: 'skull' },
		{
			title: 'Fantasy',
			url: 'movies/genre/Fantasy',
			src: '/icon/dragon-head.svg',
		},
		{
			title: 'Drama',
			url: 'movies/genre/Drama',
			src: '/icon/drama-masks.svg',
		},
	];

	public bookmarks = [
		'Harry Potter',
		'Lord of the Rings',
		'Avengers',
		'Pirates of the Caribbean',
		'Jurassic Park',
		'Back to the Future',
	];

	constructor(
		private ApiCallService: ApiCallService,
		public authService: AuthService
	) {}

	ngOnInit() {}
}
