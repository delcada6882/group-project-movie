import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-movie-search-page',
  templateUrl: './movie-search-page.component.html',
  styleUrls: ['./movie-search-page.component.scss'],
})
export class MovieSearchPageComponent implements OnInit {

  constructor(private ApiCallService: ApiCallService) { }

  movieList: any = []

  urlStart = "https://image.tmdb.org/t/p/w500"

  searchMovie: String = ""

  showLoading = false;



  showData() {
    this.ApiCallService.getData()
      .subscribe((data: Movie) => {
        console.log(data);
      });
  }
  showDataList(searchString: String) {
    this.showLoading = true;
    this.ApiCallService.getDataBySearch(searchString)
      .subscribe((data: any) => {
        console.log(data)
        this.movieList = data.results;
        this.showLoading = false
      });
  }

  ngOnInit() {
  }
}
