import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersGuideComponent } from './buyers-guide.component';

describe('BuyersGuideComponent', () => {
  let component: BuyersGuideComponent;
  let fixture: ComponentFixture<BuyersGuideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyersGuideComponent]
    });
    fixture = TestBed.createComponent(BuyersGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
