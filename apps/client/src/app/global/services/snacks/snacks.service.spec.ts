import { TestBed } from '@angular/core/testing';

import { SnacksService } from './snacks.service';

describe('SnacksService', () => {
  let service: SnacksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnacksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
