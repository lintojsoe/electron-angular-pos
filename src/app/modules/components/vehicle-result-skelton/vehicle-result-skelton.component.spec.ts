import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleResultSkeltonComponent } from './vehicle-result-skelton.component';

describe('VehicleResultSkeltonComponent', () => {
  let component: VehicleResultSkeltonComponent;
  let fixture: ComponentFixture<VehicleResultSkeltonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleResultSkeltonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleResultSkeltonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
