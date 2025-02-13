import { Component, OnInit } from '@angular/core';
import { DoctorSchedule } from '../../models/doctor-schedule';
import { DoctorScheduleService } from '../../services/doctor-schedule.service';
import { NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-get-all-schedules',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './get-all-schedules.component.html',
  styleUrl: './get-all-schedules.component.css'
})
export class GetAllSchedulesComponent implements OnInit {
  doctorSchedules: DoctorSchedule[] = [];

  constructor(private doctorScheduleService:DoctorScheduleService, private router: Router){}

  ngOnInit(): void {
      this.loadSchedules();
  }

  public loadSchedules():void{
    this.doctorScheduleService.getAllSchedules().subscribe({
      next: (data) => (this.doctorSchedules = data),
      error:(err) => console.log('Error Message: ' + err)
    })
  }

  public navigateToUpateComponent(doctorId:string){
    this.router.navigate(['/update-doctor-schedule'],{ queryParams: { id: doctorId, section: 'address' } })
  }

}
