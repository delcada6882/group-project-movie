import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { MovieList } from 'src/app/interfaces/api/movie-list';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
	selector: 'app-popular-page',
	templateUrl: './popular-page.component.html',
	styleUrls: ['./popular-page.component.scss'],
})
export class PopularPageComponent implements AfterViewInit {
	@ViewChild('child') child!: PaginatorComponent;

	public popularMovies: MovieList[] = [];
	private pageNumVar = 1;
	public totalNumSend: number[] = [];

	constructor(private ApiCallService: ApiCallService) {}

	ngAfterViewInit() {}

	public ionInfiniteTest() {
		this.pageNumVar++;
		this.showPopularMovies(this.pageNumVar);
	}

	public clickAnim(item: Element) {
		item.classList.add('clickAnimClass');
		item.addEventListener('animationend', () => {
			item.classList.remove('clickAnimClass');
		});
	}

	public showPopularMovies(pageNum: number) {
		this.ApiCallService.getPopularMovies(pageNum).subscribe((data) => {
			this.popularMovies = data.results;
			if (data.total_pages > 500) {
				this.totalNumSend = new Array(500).fill(0).map((_, i) => i + 1);
			} else {
				this.totalNumSend = new Array(data.total_pages)
					.fill(0)
					.map((_, i) => i + 1);
			}
		});
	}

	public childToParent(name: number) {
		this.showPopularMovies(name);
	}
}
