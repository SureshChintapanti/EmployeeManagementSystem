import { TestBed } from '@angular/core/testing';

import { DcDialogService } from './dc-dialog.service';

describe('DcDialogService', () => {
  let service: DcDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DcDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
