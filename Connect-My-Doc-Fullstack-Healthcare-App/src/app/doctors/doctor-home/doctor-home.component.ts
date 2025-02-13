import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ViewAllDoctorsComponent } from '../components/view-all-doctors/view-all-doctors.component';
import { AddDoctorComponent } from '../components/add-doctor/add-doctor.component';
import { ViewDoctorByIdComponent } from '../components/view-doctor-by-id/view-doctor-by-id.component';
import { EditDoctorComponent } from '../components/edit-doctor/edit-doctor.component';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [ViewAllDoctorsComponent, RouterModule],
  templateUrl: './doctor-home.component.html',
  styleUrl: './doctor-home.component.css'
})
export class DoctorHomeComponent {

}
