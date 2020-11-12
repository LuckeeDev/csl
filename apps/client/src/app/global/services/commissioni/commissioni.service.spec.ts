import { TestBed } from '@angular/core/testing';

import { CommissioniService } from './commissioni.service';

describe('CommissioniService', () => {
  let service: CommissioniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommissioniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
