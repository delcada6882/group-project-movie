import { Component, Input, OnInit, Output } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { EventEmitter } from '@angular/core';
import { MovieList } from 'src/app/interfaces/api/movie-list';
import { Api } from 'src/app/interfaces/api/api-get';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
	@Input() pageLength: number | undefined;
	@Input() pageNumVar: number | undefined;
	@Input() totalPageNum: Array<number> | undefined;
	@Input() showMovies: Function | undefined;
	@Input() moviesArr: Array<MovieList> | undefined;

	@Output() childToParent = new EventEmitter();

	constructor(private ApiCallService: ApiCallService) {}

	private setPageNum: number = 0;

	private scrollElement?: Element;

	ngOnInit() {
		this.sendToParent(1);
	}

	public sendToParent(name: number) {
		this.setPageNum = name;
		this.childToParent.emit(name);
	}

	public backArrow() {
		if (this.setPageNum > 1) {
			this.paginatorSelect(this.setPageNum - 1);
			this.scrollElement?.scrollTo((Number(this.setPageNum) - 1) * 35, 0); // 35 is the width of each paginator number
		}
	}

	public forwardArrow() {
		if (!this.totalPageNum) return;
		if (this.setPageNum < this.totalPageNum?.length) {
			this.paginatorSelect(this.setPageNum + 1);

			this.scrollElement?.scrollTo((Number(this.setPageNum) - 1) * 35, 0); // 35 is the width of each paginator number
		}
	}
	public paginatorSelect(item: number) {
		if (!this.totalPageNum) return;
		if (this.setPageNum !== item) {
			this.setPageNum = Number(item);
			document.querySelectorAll('.paginatorNum').forEach((idx) => {
				idx.classList.remove('paginatorSelectClass');
			});
			document
				.getElementsByClassName('paginatorNum')
				[Number(item) - 1].classList.add('paginatorSelectClass');
			this.sendToParent(item);
			this.scrollElement =
				document.getElementById('paginatorScroll') || undefined;
		}
	}

	public showPopularMovies(pageNum: number) {
		return this.ApiCallService.getPopularMovies(pageNum).subscribe(
			(data: Api.Paginated<MovieList>) => {
				this.moviesArr = data.results;
			}
		);
	}
}
