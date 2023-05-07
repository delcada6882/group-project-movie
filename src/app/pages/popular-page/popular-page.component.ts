import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
	selector: 'app-popular-page',
	templateUrl: './popular-page.component.html',
	styleUrls: ['./popular-page.component.scss'],
})
export class PopularPageComponent implements AfterViewInit {
	constructor(
		private ApiCallService: ApiCallService,
		private animationCtrl: AnimationController
	) {}
	popularMovies: any = [];
	urlStart = 'https://image.tmdb.org/t/p/w500';
	pageNumVar = 1;

	totalNumSend: any = [];

	ionInfiniteTest() {
		console.log('uhh');
		this.pageNumVar++;
		this.showPopularMovies(this.pageNumVar);
	}

	clickAnim(item: Element) {
		item.classList.add('clickAnimClass');
		item.addEventListener('animationend', () => {
			item.classList.remove('clickAnimClass');
		});
	}

	showPopularMovies(pageNum: number) {
		console.log('hey');
		this.ApiCallService.getPopularMovies(pageNum).subscribe((data: any) => {
			console.log(data);
			this.popularMovies = data.results;
			if (data.total_pages > 500) {
				this.totalNumSend = new Array(500).fill(0).map((x, i) => i + 1);
			} else {
				this.totalNumSend = new Array(data.total_pages)
					.fill(0)
					.map((x, i) => i + 1);
			}
			console.log(this.totalNumSend);
		});
	}

	childToParent(name: any) {
		this.showPopularMovies(name);
	}

	@ViewChild('child') child!: PaginatorComponent;

	ngAfterViewInit() {}
}
