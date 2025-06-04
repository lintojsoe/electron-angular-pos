import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateManagementComponent } from './gate-management.component';

describe('GateManagementComponent', () => {
  let component: GateManagementComponent;
  let fixture: ComponentFixture<GateManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
