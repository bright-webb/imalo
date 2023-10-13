import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownalodAppComponent } from './downalod-app.component';

describe('DownalodAppComponent', () => {
  let component: DownalodAppComponent;
  let fixture: ComponentFixture<DownalodAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownalodAppComponent]
    });
    fixture = TestBed.createComponent(DownalodAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
