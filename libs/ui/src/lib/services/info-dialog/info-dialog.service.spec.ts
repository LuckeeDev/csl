import { TestBed } from '@angular/core/testing';

import { InfoDialogService } from './info-dialog.service';

describe('InfoDialogService', () => {
  let service: InfoDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
