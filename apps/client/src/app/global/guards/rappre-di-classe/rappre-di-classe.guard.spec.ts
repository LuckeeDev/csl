import { TestBed } from '@angular/core/testing';

import { RappreDiClasseGuard } from './rappre-di-classe.guard';

describe('RappreDiClasseGuard', () => {
  let guard: RappreDiClasseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RappreDiClasseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
