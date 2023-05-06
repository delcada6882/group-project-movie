import { Component, ElementRef, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { IconPaths } from 'src/app/enums/icon-paths';
import { Movie } from 'src/app/interfaces/api/movie';
import { ApiCallService } from 'src/app/services/api-call.service';
import months from 'src/utility/constants/month';

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

	movieData?: Movie;

	showLoading: boolean = true;

	movieId?: number;

	private activatedRoute = inject(ActivatedRoute);

	similarMovies?: any[];

	revenueText?: string;

	releaseDateText?: string;

	backDropIcons?: Array<any> = [];

	smallerTest?: string;

	movieGenres?: Array<string> = [];

	moneyHeader?: string = 'Budget: ';
	moneyAmount?: string;

	runtimeHeader?: string = 'Runtime: ';
	runtimeData?: string;

	ngOnInit() {
		this.showLoading = true;
		this.movieId = Number(
			this.activatedRoute.snapshot.paramMap.get('movieId') || '0'
		);
		this.showMovie();
		this.getSimilarMovies();
		this.initTimeout();
	}

	initTimeout() {
		this.timeoutId = setTimeout(() => {
			console.log('done');
			this.MenuCtrl.swipeGesture(true);
		}, 1000);
	}

	moneyChange() {
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
	runtimeChange() {
		if (this.runtimeHeader === 'Runtime: ') {
			this.runtimeHeader = 'Status: ';
			this.runtimeData = this.movieData?.status;
		} else {
			this.runtimeHeader = 'Runtime: ';
			this.runtimeData = this.movieData?.runtime?.toString() + ' minutes';
		}
	}

	showMovie() {
		this.ApiCallService.getMovieById(Number(this.movieId)).subscribe(
			(data: Movie) => {
				console.log(data);
				this.movieData = data;
				this.Host.nativeElement.style.setProperty(
					`--backdrop-image`,
					'url(' + this.urlStart + this.movieData.backdrop_path + ')'
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
				this.runtimeData =
					this.movieData?.runtime?.toString() + ' minutes';
				this.releaseDateText =
					new Date(this.movieData?.release_date)
						.getFullYear()
						.toString() +
					', ' +
					months[
						new Date(this.movieData?.release_date).getUTCMonth()
					] +
					' ' +
					new Date(this.movieData?.release_date)
						.getUTCDate()
						.toString();
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

					console.log(
						IconPaths[this.smallerTest as keyof typeof IconPaths]
					);
					console.log(this.movieData.genres[x]?.name);
					this.backDropIcons?.push(
						IconPaths[this.smallerTest as keyof typeof IconPaths]
					);
					this.movieGenres?.push(this.movieData.genres[x]?.name);
				}

				console.log(this.backDropIcons);

				this.showLoading = false;
			}
		);
	}

	testFunc() {
		console.log('test');
		this.MenuCtrl.swipeGesture(false);
		clearTimeout(this.timeoutId);
		this.initTimeout();
	}

	getSimilarMovies() {
		this.ApiCallService.getSimilarMovies(Number(this.movieId)).subscribe(
			(data: any) => {
				console.log(data);
				this.similarMovies = data.results;
			}
		);
	}
}
