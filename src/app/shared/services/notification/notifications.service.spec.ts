import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RxStompService} from '@stomp/ng2-stompjs';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule,
        HttpClientTestingModule],
      providers: [NotificationsService,RxStompService]
    }).compileComponents();
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
