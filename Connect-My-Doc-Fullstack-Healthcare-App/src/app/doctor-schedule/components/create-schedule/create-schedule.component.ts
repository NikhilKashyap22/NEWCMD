import { Component } from '@angular/core';
import { DoctorSchedule } from '../../models/doctor-schedule';
import { DoctorScheduleService } from '../../services/doctor-schedule.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.css'
})
export class CreateScheduleComponent {
  isVisible = false;

  schedules: DoctorSchedule = {
    doctorId: '',
    name: '',
    weekDay: 'MONDAY',
    startTime: '',
    endTime: '',
    availabilityMode: 'OFFLINE',
    clinicId: ''
  }

  constructor(private doctorScheduleService:DoctorScheduleService, private router:Router){}

  public submitSchedule(){
    this.doctorScheduleService.addDoctorSchedule(this.schedules).subscribe({
      next: (data) => {
        this.schedules = data;
      },
      error: (error) => {
        console.error('Error creating schedule: ', error);
      }
    });

    this.router.navigate(['/doctor-schedules']);
  }
}
