import { Component, Input, OnInit, Output } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { EventEmitter } from '@angular/core';

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
	@Input() moviesArr: Array<any> | undefined;

	@Output() childToParent = new EventEmitter();

	constructor(private ApiCallService: ApiCallService) {}

	setPageNum = 0;

	scrollElement?: Element;

	sendToParent(name: any) {
		this.setPageNum = name;
		this.childToParent.emit(name);
	}

	backArrow() {
		if (this.setPageNum > 1) {
			this.paginatorSelect(this.setPageNum - 1);

			this.scrollElement?.scrollTo(
				// Number(item) * (this.scrollElement.scrollWidth / this.totalPageNum?.length)
				(Number(this.setPageNum) - 1) * 35,
				0
			);
		}
	}

	forwardArrow() {
		if (this.totalPageNum === undefined) return;
		if (this.setPageNum < this.totalPageNum?.length) {
			console.log(this.totalPageNum?.length);
			this.paginatorSelect(this.setPageNum + 1);

			this.scrollElement?.scrollTo((Number(this.setPageNum) - 1) * 35, 0);
		}
	}
	paginatorSelect(item: Number) {
		if (this.totalPageNum === undefined) return;
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

	nonSpecMoviesArr = [];

	showPopularMovies(pageNum: number) {
		console.log(pageNum);
		return this.ApiCallService.getPopularMovies(pageNum).subscribe(
			(data: any) => {
				// console.log(data);
				this.moviesArr = data.results;
			}
		);
	}

	ngOnInit() {
		this.sendToParent(1);
	}
}
