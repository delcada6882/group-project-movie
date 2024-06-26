import { Component, OnInit } from '@angular/core';
import { ApiCallService } from './services/api-call.service';
import { AuthService } from './services/auth/auth.service';

// import dragonHead from './assets/icon/dragon-head.svg';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    public appPages = [
        { title: 'Profile haha', url: '/profile', icon: 'person' },
        { title: 'Movies', url: '/movies', icon: 'film' },
    ];
    public categories = [
        { title: 'Popular', url: 'movies/popular', icon: 'sparkles' },
        { title: 'Family', url: 'movies/genre/Family', icon: 'people' },
        { title: 'Action', url: 'movies/genre/Action', src: '../assets/icon/gun.svg' },
        {
            title: 'Comedy',
            url: 'movies/genre/Comedy',
            src: '../assets/icon/laugh.svg',
        },
        { title: 'Horror', url: 'movies/genre/Horror', icon: 'skull' },
        {
            title: 'Fantasy',
            url: 'movies/genre/Fantasy',
            src: "assets/icon/dragon-head.svg",
            
        },
        { title: 'Drama', url: 'movies/genre/Drama', src: '../assets/icon/drama-masks.svg' },
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
    ) { }

	ngOnInit() {}
}
