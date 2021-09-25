import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackView } from './callback.view';

describe('CallbackView', () => {
	let component: CallbackView;
	let fixture: ComponentFixture<CallbackView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CallbackView],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CallbackView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
