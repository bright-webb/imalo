import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSidebearComponent } from './account-sidebear.component';

describe('AccountSidebearComponent', () => {
  let component: AccountSidebearComponent;
  let fixture: ComponentFixture<AccountSidebearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSidebearComponent]
    });
    fixture = TestBed.createComponent(AccountSidebearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
