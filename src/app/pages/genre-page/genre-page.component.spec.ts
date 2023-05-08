import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenrePageComponent } from './genre-page.component';

describe('GenrePageComponent', () => {
	let component: GenrePageComponent;
	let fixture: ComponentFixture<GenrePageComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [GenrePageComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(GenrePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
