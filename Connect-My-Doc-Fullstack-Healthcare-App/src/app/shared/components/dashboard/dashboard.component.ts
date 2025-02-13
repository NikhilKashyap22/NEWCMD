import { Component } from '@angular/core';
import { ViewAllAppointmentsComponent } from "../../../appointments/components/view-all-appointments/view-all-appointments.component";
import { ViewAllClinicsComponent } from "../../../clinics/components/view-all-clinics/view-all-clinics.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
