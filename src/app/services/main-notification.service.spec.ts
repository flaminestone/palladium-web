import { TestBed } from '@angular/core/testing';

import { MainNotificationService } from './main-notification.service';

describe('MainNotificationService', () => {
  let service: MainNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
