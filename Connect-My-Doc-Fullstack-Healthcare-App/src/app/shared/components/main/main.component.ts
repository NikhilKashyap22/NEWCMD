import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CreateScheduleComponent } from "../../../doctor-schedule/components/create-schedule/create-schedule.component";
import { GetAllSchedulesComponent } from "../../../doctor-schedule/components/get-all-schedules/get-all-schedules.component";
import { DoctorHomeComponent } from '../../../doctors/doctor-home/doctor-home.component';
import { NgClass } from '@angular/common';
import { ViewAllClinicsComponent } from "../../../clinics/components/view-all-clinics/view-all-clinics.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [DoctorHomeComponent, HeaderComponent, SidebarComponent, NgClass, ViewAllClinicsComponent, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
