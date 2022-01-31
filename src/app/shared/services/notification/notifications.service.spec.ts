import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsService],
      imports: [RouterTestingModule,
        HttpClientTestingModule],
      providers: []
    }).compileComponents();
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
