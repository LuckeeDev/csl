import { TestBed } from '@angular/core/testing';

import { ViceGuard } from './vice.guard';

describe('ViceGuard', () => {
  let guard: ViceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
