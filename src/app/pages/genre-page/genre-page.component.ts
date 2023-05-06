import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { MovieGenres } from 'src/app/enums/movie-genres';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss'],
})
export class GenrePageComponent implements OnInit {

  constructor(private ApiCallService: ApiCallService) { }

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  popularMovies: any = [];
  urlStart = 'https://image.tmdb.org/t/p/w500';
  pageNumVar = 1;

  totalNumSend: any = [];

  clickAnim(item: Element) {
    item.classList.add('clickAnimClass');
    item.addEventListener('animationend', () => {
      item.classList.remove('clickAnimClass');
    })
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('genreId') || "";
  }

  movieList: any = [];

  showMovies(pageNum: number) {
    this.ApiCallService.getDataByFilter({ with_genres: [MovieGenres[this.folder as keyof typeof MovieGenres]], page: pageNum }).subscribe((data: any) => {
      console.log(MovieGenres[this.folder as keyof typeof MovieGenres])
      console.log(data)
      this.movieList = data.results;
      if (data.total_pages > 500) {
        this.totalNumSend = new Array(500).fill(0).map((x, i) => i + 1);
      }
      else {
        this.totalNumSend = new Array(data.total_pages).fill(0).map((x, i) => i + 1);
      }
      console.log(this.totalNumSend)
    });
  }

  childToParent(name: any) {
    this.showMovies(name)
  }

  @ViewChild('child') child!: PaginatorComponent

}
