import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEstateComponent } from './new-estate.component';

describe('NewEstateComponent', () => {
  let component: NewEstateComponent;
  let fixture: ComponentFixture<NewEstateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewEstateComponent]
    });
    fixture = TestBed.createComponent(NewEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
