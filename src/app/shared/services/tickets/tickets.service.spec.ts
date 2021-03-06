import { TestBed } from '@angular/core/testing';

import { TicketsService } from './tickets.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule,
        HttpClientTestingModule],
      providers: [TicketsService]
    }).compileComponents();
    service = TestBed.inject(TicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
