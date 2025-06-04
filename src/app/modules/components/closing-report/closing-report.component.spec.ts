import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingReportComponent } from './closing-report.component';

describe('ClosingReportComponent', () => {
  let component: ClosingReportComponent;
  let fixture: ComponentFixture<ClosingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
