import { TestBed } from '@angular/core/testing';

import { RappreGuard } from './rappre.guard';

describe('RappreGuard', () => {
  let guard: RappreGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RappreGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
