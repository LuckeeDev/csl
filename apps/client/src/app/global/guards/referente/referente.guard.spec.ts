import { TestBed } from '@angular/core/testing';

import { ReferenteGuard } from './referente.guard';

describe('ReferenteGuard', () => {
  let guard: ReferenteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReferenteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
