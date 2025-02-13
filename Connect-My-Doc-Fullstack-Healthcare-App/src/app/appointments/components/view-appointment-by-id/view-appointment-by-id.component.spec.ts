import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppointmentByIdComponent } from './view-appointment-by-id.component';

describe('ViewAppointmentByIdComponent', () => {
  let component: ViewAppointmentByIdComponent;
  let fixture: ComponentFixture<ViewAppointmentByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAppointmentByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAppointmentByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
