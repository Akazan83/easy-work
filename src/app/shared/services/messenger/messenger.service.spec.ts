import { TestBed } from '@angular/core/testing';

import { MessengerService } from './messenger.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MessengerService', () => {
  let service: MessengerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule,
        HttpClientTestingModule],
      providers: [MessengerService]
    }).compileComponents();
    service = TestBed.inject(MessengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
