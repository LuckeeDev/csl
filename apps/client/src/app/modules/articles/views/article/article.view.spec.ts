import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleView } from './article.view';

describe('ArticleView', () => {
	let component: ArticleView;
	let fixture: ComponentFixture<ArticleView>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ArticleView],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ArticleView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
