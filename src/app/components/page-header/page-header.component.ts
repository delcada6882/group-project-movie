import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-page-header',
	templateUrl: './page-header.component.html',
	styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
	@Input() headerTitle?: String;
	@Input() menuIcon?: boolean;
	@Input() contentChild?: boolean;

	constructor() {}

	ngOnInit() {
		if (this.contentChild === undefined) this.contentChild = false;
	}
}
