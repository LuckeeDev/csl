import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesView } from './articles.view';

describe('ArticlesView', () => {
	let component: ArticlesView;
	let fixture: ComponentFixture<ArticlesView>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ArticlesView],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ArticlesView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
