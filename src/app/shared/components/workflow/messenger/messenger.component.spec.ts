import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerComponent } from './messenger.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {User} from '../../../models/user.model';

describe('MessengerComponent', () => {
  let component: MessengerComponent;
  let fixture: ComponentFixture<MessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerComponent ]
    })
    .compileComponents();

    const user = new User();
    user.id = '1';
    spyOn(window.sessionStorage, 'getItem').and.callFake(()=> JSON.stringify(user));

  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessengerComponent],
      imports: [RouterTestingModule,
        HttpClientTestingModule],
      providers: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
