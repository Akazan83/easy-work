import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateTicketsComponent } from './validate-tickets.component';

describe('ValidateTicketsComponent', () => {
  let component: ValidateTicketsComponent;
  let fixture: ComponentFixture<ValidateTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
