import { Component } from '@angular/core';
import { GetAllSchedulesComponent } from "../components/get-all-schedules/get-all-schedules.component";

@Component({
  selector: 'app-doctor-schedule-home',
  standalone: true,
  imports: [GetAllSchedulesComponent],
  templateUrl: './doctor-schedule-home.component.html',
  styleUrl: './doctor-schedule-home.component.css'
})
export class DoctorScheduleHomeComponent {

}
