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
		'Family Movies',
		'Friends',
		'Notes',
		'Work',
		'Travel',
		'Reminders',
	];
	constructor(private ApiCallService: ApiCallService) {}

	showData() {
		// this.ApiCallService.getData().subscribe((data: Movie) => {
		// 	console.log(data);
		// });
		this.ApiCallService.getDataByFilter({
			with_genres: [10770],
		}).subscribe((data: Movie) => {
			console.log(data);
		});
	}

	ngOnInit() {
		this.showData();
	}
}
