import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumAdsComponent } from './premium-ads.component';

describe('PremiumAdsComponent', () => {
  let component: PremiumAdsComponent;
  let fixture: ComponentFixture<PremiumAdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiumAdsComponent]
    });
    fixture = TestBed.createComponent(PremiumAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
