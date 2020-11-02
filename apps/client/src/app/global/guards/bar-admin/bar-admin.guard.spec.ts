import { TestBed } from '@angular/core/testing';

import { BarAdminGuard } from './bar-admin.guard';

describe('BarAdminGuard', () => {
  let guard: BarAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BarAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
