import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTicketsComponent } from './new-tickets.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('NewTicketsComponent', () => {
  let component: NewTicketsComponent;
  let fixture: ComponentFixture<NewTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTicketsComponent],
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule],
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(NewTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
