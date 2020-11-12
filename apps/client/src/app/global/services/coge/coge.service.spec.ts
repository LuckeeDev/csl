import { TestBed } from '@angular/core/testing';

import { CogeService } from './coge.service';

describe('CogeService', () => {
  let service: CogeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CogeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
