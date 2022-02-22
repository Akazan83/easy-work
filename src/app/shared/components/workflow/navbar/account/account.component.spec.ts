import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {User} from '../../../../models/user.model';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    const user = new User();
    user.id = '1';
    spyOn(window.sessionStorage, 'getItem').and.callFake(()=> JSON.stringify(user));

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
