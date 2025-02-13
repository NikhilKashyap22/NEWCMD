import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleHomeComponent } from './doctor-schedule-home.component';

describe('DoctorScheduleHomeComponent', () => {
  let component: DoctorScheduleHomeComponent;
  let fixture: ComponentFixture<DoctorScheduleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorScheduleHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorScheduleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
