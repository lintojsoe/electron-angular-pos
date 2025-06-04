import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsSkeltonComponent } from './tickets-skelton.component';

describe('TicketsSkeltonComponent', () => {
  let component: TicketsSkeltonComponent;
  let fixture: ComponentFixture<TicketsSkeltonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsSkeltonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsSkeltonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
