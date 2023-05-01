import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/api/movie';
import { MovieList } from 'src/app/interfaces/api/movie-list';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit {
  constructor(private ApiCallService: ApiCallService) {}

  popularMovies: any = [];
  urlStart = 'https://image.tmdb.org/t/p/w500';
  buttonText = 'Show More';

  showMorePopularMovies(item: Element) {
    if (this.buttonText == 'Show More') {
      this.buttonText = 'Show Less';
    } else {
      this.buttonText = 'Show More';
    }
    item.classList.toggle('popularMoviesShowMore');
  }

  showPopularMovies() {
    this.ApiCallService.getPopularMovies().subscribe((data: any) => {
      console.log(data);
      this.popularMovies = data.results;
    });
  }

  ngOnInit() {
    this.showPopularMovies();
  }
}
