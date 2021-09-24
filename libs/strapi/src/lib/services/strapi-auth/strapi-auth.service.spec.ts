import { TestBed } from '@angular/core/testing';

import { StrapiAuthService } from './strapi-auth.service';

describe('StrapiAuthService', () => {
	let service: StrapiAuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(StrapiAuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
