import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndervelopedComponent } from './underveloped.component';

describe('UndervelopedComponent', () => {
  let component: UndervelopedComponent;
  let fixture: ComponentFixture<UndervelopedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UndervelopedComponent]
    });
    fixture = TestBed.createComponent(UndervelopedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
