import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingTicketsComponent } from './waiting-tickets.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {RxStompService} from '@stomp/ng2-stompjs';

describe('WaitingTicketsComponent', () => {
  let component: WaitingTicketsComponent;
  let fixture: ComponentFixture<WaitingTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingTicketsComponent ],
      providers: [RxStompService]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaitingTicketsComponent],
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule],
      providers: [RxStompService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
