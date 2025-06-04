import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateVerficationComponent } from './plate-verfication.component';

describe('PlateVerficationComponent', () => {
  let component: PlateVerficationComponent;
  let fixture: ComponentFixture<PlateVerficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlateVerficationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateVerficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
