import { Component, OnInit } from '@angular/core';
import { DoctorScheduleService } from '../../services/doctor-schedule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { DoctorSchedule } from '../../models/doctor-schedule';

@Component({
  selector: 'app-update-doctor-schedule',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './update-doctor-schedule.component.html',
  styleUrl: './update-doctor-schedule.component.css'
})
export class UpdateDoctorScheduleComponent implements OnInit{
  doctorId:string = '';
  doctorSchedule: DoctorSchedule = {doctorId:'',name:'',weekDay:'MONDAY',startTime:'',endTime:'',availabilityMode:'OFFLINE',clinicId:''};


  constructor(private doctorScheduleService:DoctorScheduleService, private route:ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['id']){
        this.doctorId = params['id'];
        this.fetchDoctor();
      }
    });
  }


    public fetchDoctor(){
      this.doctorScheduleService.getScheduleById(this.doctorId).subscribe({
        next: (data) => {
          this.doctorSchedule = data;
        },
        error: (error) => {
          console.error('error fetching doctor: ', error);
        }
      });
    }

    public updateSchedule(){
      this.doctorScheduleService.updateDoctorSchedule(this.doctorId,this.doctorSchedule).subscribe({
        next: (data) => {
          this.doctorSchedule = data;
        },
        error: (error) => {
          console.error('error fetching doctor: ', error);
        }
      });
      this.router.navigate(['/doctor-schedules']);
    }


}
