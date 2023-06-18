import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { PopularPageComponent } from '../popular-page/popular-page.component';
import { MovieGenres } from 'src/app/enums/movie-genres';
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

  constructor(private ApiCallService: ApiCallService) { }

  familyMovies: any = [];
  actionMovies: any = [];
  comedyMovies: any = [];
  horrorMovies: any = [];
  fantasyMovies: any = [];
  dramaMovies: any = [];

  showPopularMovies(pageNum: number) {
    this.ApiCallService.getPopularMovies(pageNum).subscribe((data: any) => {
      console.log(data);
      this.popularMovies = data.results;
    });
  }

  showMovies() {
    this.ApiCallService.getDataByFilter({ with_genres: ['Family'], page: 1 }).subscribe((data: any) => {
      this.familyMovies = data.results;
    });
    this.ApiCallService.getDataByFilter({ with_genres: ['Action'], page: 1 }).subscribe((data: any) => {
      this.actionMovies = data.results;
    });
    this.ApiCallService.getDataByFilter({ with_genres: ['Comedy'], page: 1 }).subscribe((data: any) => {
      this.comedyMovies = data.results;
    });
    this.ApiCallService.getDataByFilter({ with_genres: ['Horror'], page: 1 }).subscribe((data: any) => {
      console.log(data)
      this.horrorMovies = data.results;
    });
    this.ApiCallService.getDataByFilter({ with_genres: ['Fantasy'], page: 1 }).subscribe((data: any) => {
      this.fantasyMovies = data.results;
    });
    this.ApiCallService.getDataByFilter({ with_genres: ['Drama'], page: 1 }).subscribe((data: any) => {
      this.dramaMovies = data.results;
    });
  }

  ngOnInit() {
    this.showPopularMovies(1);
    this.showMovies();
  }
}
