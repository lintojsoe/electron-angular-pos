import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectSuccessPopupComponent } from './collect-success-popup.component';

describe('CollectSuccessPopupComponent', () => {
  let component: CollectSuccessPopupComponent;
  let fixture: ComponentFixture<CollectSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectSuccessPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
