import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, MenuController } from '@ionic/angular';
import { IconPaths } from 'src/app/enums/icon-paths';
import { Movie } from 'src/app/interfaces/api/movie';
import { ApiCallService } from 'src/app/services/api-call.service';
import months from 'src/utility/constants/month';
import { OverlayEventDetail } from '@ionic/core/components';

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
  ) { }



  public urlStart = 'https://image.tmdb.org/t/p/w500';

  public timeoutId: NodeJS.Timeout | undefined;

  movieData?: Movie;

  showLoading: boolean = true;

  movieId?: number;

  private activatedRoute = inject(ActivatedRoute);

  similarMovies?: any[];

  cast?: any[];

  revenueText?: string;

  releaseDateText?: string;

  backDropIcons?: Array<any> = [];

  smallerTest?: string;

  movieGenres?: Array<string> = [];

  moneyHeader?: string = 'Budget: ';
  moneyAmount?: string;

  runtimeHeader?: string = 'Runtime: ';
  runtimeData?: string;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name?: string;

  @ViewChild(IonModal) modal?: IonModal;

  cancel(item: IonModal) {
    item?.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal?.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }



  ngOnInit() {
    this.showLoading = true;
    this.movieId = Number(
      this.activatedRoute.snapshot.paramMap.get('movieId') || '0'
    );
    this.showMovie();
    this.showCast();
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
      if (this.movieData?.revenue !== 0) {
        this.moneyAmount = (this.movieData?.revenue?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        }).split('.')[0])
      }
      else {
        this.moneyAmount = "Unknown"
      }
    } else {
      this.moneyHeader = 'Budget: ';
      if (this.movieData?.budget !== 0) {
        this.moneyAmount = (this.movieData?.budget?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        }).split('.')[0])
      }
      else {
        this.moneyAmount = "Unknown"
      }
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

        if (this.movieData?.budget !== 0) {
          this.moneyAmount = (this.movieData?.budget?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          }).split('.')[0])
        }
        else {
          this.moneyAmount = "Unknown"
        }
        this.runtimeData = this.movieData?.runtime?.toString() + ' minutes';
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
          this.revenueText = this.movieData?.revenue?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }).split('.')[0];

        }

        for (let x = 0; x < 2; x++) {
          this.smallerTest = (this.movieData?.genres[x]?.name === undefined ? this.movieData?.genres[x]?.name : 'unknown');
          this.backDropIcons?.push(IconPaths[this.smallerTest as keyof typeof IconPaths]);
          this.movieGenres?.push(this.smallerTest)
        }

        this.showLoading = false;
      }
    );
  }

  showCast() {
    this.ApiCallService.getCastByMovie(Number(this.movieId)).subscribe(
      (data: any) => {
        console.log(data);
        this.cast = data.cast;
        console.log(this.cast)
      }
    );
  }

  testFunc() {
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
