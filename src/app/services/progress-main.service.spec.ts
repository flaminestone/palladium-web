import { TestBed } from '@angular/core/testing';

import { ProgressMainService } from './progress-main.service';

describe('ProgressMainService', () => {
  let service: ProgressMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
