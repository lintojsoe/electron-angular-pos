import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateVerificationHistoryComponent } from './plate-verification-history.component';

describe('PlateVerificationHistoryComponent', () => {
  let component: PlateVerificationHistoryComponent;
  let fixture: ComponentFixture<PlateVerificationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlateVerificationHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateVerificationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
