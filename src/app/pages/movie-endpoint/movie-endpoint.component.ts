import { Component, ElementRef, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { IconPaths } from 'src/app/enums/icon-paths';
import { Movie } from 'src/app/interfaces/api/movie';
import { MovieList } from 'src/app/interfaces/api/movie-list';
import { ApiCallService } from 'src/app/services/api-call.service';
import { MONTHS_OF_YEAR } from 'src/utility/constants/month';

@Component({
	selector: 'app-movie-endpoint',
	templateUrl: './movie-endpoint.component.html',
	styleUrls: ['./movie-endpoint.component.scss'],
})
export class MovieEndpointComponent implements OnInit {
	constructor(
		private ApiCallService: ApiCallService,
		private Host: ElementRef,
		public MenuCtrl: MenuController
	) {}

	public urlStart = 'https://image.tmdb.org/t/p/w500';

	public timeoutId: NodeJS.Timeout | undefined;

	public movieData?: Movie;

	public showLoading: boolean = true;

	public movieId?: number;

	public activatedRoute = inject(ActivatedRoute);

	public similarMovies?: MovieList[];

	public revenueText?: string;

	public releaseDateText?: string;

	public backDropIcons?: Array<any> = [];

	public smallerTest?: string;

	public movieGenres?: Array<string> = [];

	public moneyHeader?: string = 'Budget: ';
	public moneyAmount?: string;

	public runtimeHeader?: string = 'Runtime: ';
	public runtimeData?: string;

	ngOnInit() {
		this.showLoading = true;
		this.movieId = Number(
			this.activatedRoute.snapshot.paramMap.get('movieId') || '0'
		);
		this.showMovie();
		this.getSimilarMovies();
		this.initTimeout();
	}

	private initTimeout() {
		this.timeoutId = setTimeout(() => {
			this.MenuCtrl.swipeGesture(true);
		}, 1000);
	}

	public moneyChange() {
		if (this.moneyHeader === 'Budget: ') {
			this.moneyHeader = 'Revenue: ';
			if (this.movieData?.revenue === 0) {
				this.moneyAmount = 'N/A';
			}
			this.moneyAmount = this.movieData?.revenue?.toLocaleString(
				'en-US',
				{
					style: 'currency',
					currency: 'USD',
				}
			);
		} else {
			this.moneyHeader = 'Budget: ';
			if (this.movieData?.budget === 0) {
				this.moneyAmount = 'N/A';
			}
			this.moneyAmount = this.movieData?.budget?.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			});
		}
	}
	public runtimeChange() {
		if (this.runtimeHeader === 'Runtime: ') {
			this.runtimeHeader = 'Status: ';
			this.runtimeData = this.movieData?.status;
		} else {
			this.runtimeHeader = 'Runtime: ';
			this.runtimeData = `${this.movieData?.runtime} minutes`;
		}
	}

	public showMovie() {
		this.ApiCallService.getMovieById(Number(this.movieId)).subscribe(
			(data: Movie) => {
				this.movieData = data;
				this.Host.nativeElement.style.setProperty(
					`--backdrop-image`,
					`url(${this.urlStart + this.movieData.backdrop_path})`
				);
				this.Host.nativeElement.style.setProperty(
					`--company-image-amount`,
					this.movieData.production_companies.length.toString()
				);

				this.moneyAmount = this.movieData?.budget?.toLocaleString(
					'en-US',
					{
						style: 'currency',
						currency: 'USD',
					}
				);
				this.runtimeData = `${this.movieData?.runtime} minutes`;
				this.releaseDateText = `${new Date(
					this.movieData?.release_date
				).getFullYear()}, ${
					MONTHS_OF_YEAR[
						new Date(this.movieData?.release_date).getUTCMonth()
					]
				} ${new Date(this.movieData?.release_date).getUTCDate()}`;

				if (this.movieData?.revenue === 0) {
					this.revenueText = 'Unknown';
				} else {
					this.revenueText = this.movieData?.revenue?.toLocaleString(
						'en-US',
						{ style: 'currency', currency: 'USD' }
					);
				}

				for (let x = 0; x < 2; x++) {
					this.smallerTest = this.movieData?.genres[x]?.name;
					this.backDropIcons?.push(
						IconPaths[this.smallerTest as keyof typeof IconPaths]
					);
					this.movieGenres?.push(this.movieData.genres[x]?.name);
				}

				this.showLoading = false;
			}
		);
	}

	public scrollTimeout() {
		this.MenuCtrl.swipeGesture(false);
		clearTimeout(this.timeoutId);
		this.initTimeout();
	}

	public getSimilarMovies() {
		this.ApiCallService.getSimilarMovies(Number(this.movieId)).subscribe(
			(data) => {
				this.similarMovies = data.results;
			}
		);
	}
}
