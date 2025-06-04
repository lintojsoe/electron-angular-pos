import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTicketsListComponent } from './live-tickets-list.component';

describe('LiveTicketsListComponent', () => {
  let component: LiveTicketsListComponent;
  let fixture: ComponentFixture<LiveTicketsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveTicketsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTicketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
