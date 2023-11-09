import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPropertyPostComponent } from './preview-property-post.component';

describe('PreviewPropertyPostComponent', () => {
  let component: PreviewPropertyPostComponent;
  let fixture: ComponentFixture<PreviewPropertyPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewPropertyPostComponent]
    });
    fixture = TestBed.createComponent(PreviewPropertyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
