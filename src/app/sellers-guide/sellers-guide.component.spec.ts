import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersGuideComponent } from './sellers-guide.component';

describe('SellersGuideComponent', () => {
  let component: SellersGuideComponent;
  let fixture: ComponentFixture<SellersGuideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellersGuideComponent]
    });
    fixture = TestBed.createComponent(SellersGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
