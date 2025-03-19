import { TestBed } from '@angular/core/testing';

import { CommonSingletonService } from './common-singleton.service';

describe('CommonSingletonService', () => {
  let service: CommonSingletonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonSingletonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
