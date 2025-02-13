
//1.imports
import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../services/clinic.service';
import { ClinicSummary } from '../../models/clinic.model';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

//2.Component and Templates
@Component({
  selector: 'app-view-all-clinics',
  standalone: true,
  templateUrl: './view-all-clinics.component.html',
  styleUrls: ['./view-all-clinics.component.css'],
  imports: [NgFor,DatePipe,CommonModule,RouterModule],

}) //3.Class
export class ViewAllClinicsComponent implements OnInit {
 
  //4.Properties
  clinics: ClinicSummary[] = [];
  
  //5.Constructor
  constructor(private clinicService: ClinicService) {}
  
  //6.On-Init
  ngOnInit(): void {
    this.fetchClinics();
  }
  
  //7. Funtional Methods to get data
  fetchClinics(): void {
    this.clinicService.getClinics().subscribe(data => {
      this.clinics = data;
    });
  }
  
  //8. Events
  deleteClinic(id: number): void {
    if (confirm('Are you sure you want to delete this clinic?')) {
      this.clinicService.deleteClinic(id).subscribe(() => {
        this.clinics = this.clinics.filter(clinic => clinic.id !== id);
      });
    }
  }
}

