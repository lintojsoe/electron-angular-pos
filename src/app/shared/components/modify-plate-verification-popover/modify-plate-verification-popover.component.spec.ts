import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPlateVerificationPopoverComponent } from './modify-plate-verification-popover.component';

describe('ModifyPlateVerificationPopoverComponent', () => {
  let component: ModifyPlateVerificationPopoverComponent;
  let fixture: ComponentFixture<ModifyPlateVerificationPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPlateVerificationPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPlateVerificationPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
