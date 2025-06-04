import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPopoverComponent } from './settings-popover.component';

describe('SettingsPopoverComponent', () => {
  let component: SettingsPopoverComponent;
  let fixture: ComponentFixture<SettingsPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
