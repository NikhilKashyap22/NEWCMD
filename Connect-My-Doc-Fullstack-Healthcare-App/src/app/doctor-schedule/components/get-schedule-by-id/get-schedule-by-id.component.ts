import { Component } from '@angular/core';
import { DoctorSchedule } from '../../models/doctor-schedule';
import { DoctorScheduleService } from '../../services/doctor-schedule.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-get-schedule-by-id',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './get-schedule-by-id.component.html',
  styleUrl: './get-schedule-by-id.component.css'
})
export class GetScheduleByIdComponent {
  doctorId!:string;
  doctorSchedule!:DoctorSchedule;

  constructor(private doctorScheduleService:DoctorScheduleService){}

  public fetchDoctorSchedule():void{
    this.doctorScheduleService.getScheduleById(this.doctorId).subscribe({
      next:(data) =>{
        this.doctorSchedule = data;
      },
      error: (error) =>{
        console.error(`Error fetching doctor schedule for ${this.doctorId} `, error )
      }
    })
  }

}
