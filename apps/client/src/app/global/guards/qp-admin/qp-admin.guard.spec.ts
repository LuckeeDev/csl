import { TestBed } from '@angular/core/testing';

import { QpAdminGuard } from './qp-admin.guard';

describe('QpAdminGuard', () => {
  let guard: QpAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QpAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
