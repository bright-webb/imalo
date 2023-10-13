import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalGuideComponent } from './rental-guide.component';

describe('RentalGuideComponent', () => {
  let component: RentalGuideComponent;
  let fixture: ComponentFixture<RentalGuideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalGuideComponent]
    });
    fixture = TestBed.createComponent(RentalGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
