import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingTicketsComponent } from './waiting-tickets.component';

describe('WaitingTicketsComponent', () => {
  let component: WaitingTicketsComponent;
  let fixture: ComponentFixture<WaitingTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingTicketsComponent ]
    })
    .compileComponents();
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
