import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefusedTicketsComponent } from './refused-tickets.component';

describe('RefusedTicketsComponent', () => {
  let component: RefusedTicketsComponent;
  let fixture: ComponentFixture<RefusedTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefusedTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefusedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
