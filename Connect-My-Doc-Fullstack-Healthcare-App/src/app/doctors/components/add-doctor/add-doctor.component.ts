import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoggerService } from '../../../loggers/logger.service';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [FormsModule, NgFor, RouterModule],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent {
  /**
   * Controls the visibility of the form.
   */
  isVisible = false;

  /**
   * Stores doctor details to be submitted.
   */
  doctors: Doctor = {
    doctorId: '',
    firstName: '',
    lastName: '',
    phoneNum: 0,
    dateOfBirth: '',
    email: '',
    experienceInYears: 0,
    gender: 'MALE',
    status: '',
    clinicId: '',
    address: {
      houseName: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    specialization: {
      specializationType: '',
      specializationDescription: ''
    },
    experiences: [
      {
        clinicName: '',
        experienceInYears: 0,
        role: '',
        experienceType: 'PRESENTLY_WORKING'
      }
    ],
    qualifications: [
      {
        degree: '',
        university: '',
        startYear: '',
        endYear: '',
        yearCompleted: 0
      }
    ]
  };

  cities: string[] = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune',
    'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
    'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar',
    'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Howrah',
    'Gwalior', 'Jabalpur', 'Coimbatore', 'Vijayawada', 'Jodhpur', 'Madurai',
    'Raipur', 'Kota', 'Chandigarh', 'Guwahati', 'Solapur', 'Hubli', 'Mysore',
    'Tiruchirappalli', 'Bareilly', 'Aligarh', 'Tirunelveli', 'Jammu'
  ];

  states: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  countries: string[] = [
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
    'Germany', 'France', 'Singapore', 'Japan', 'South Africa'
  ];

  specializations: string[] = [
    'General Physician', 'Pediatrics', 'Dermatology', 'Cardiology', 'Neurology',
    'Oncology', 'Gynecology', 'Orthopedics', 'Ophthalmology', 'ENT', 'Psychiatry',
    'Urology', 'Gastroenterology', 'Pulmonology', 'Endocrinology', 'Nephrology',
    'Rheumatology', 'Plastic Surgery', 'Dental', 'MBBS'
  ];


  /**
   * Creates an instance of AddDoctorComponent.
   * @param doctorService Service for handling doctor-related operations.
   * @param router Angular Router for navigation.
   * @param loggerService Service for logging errors.
   */
  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private loggerService: LoggerService
  ) {}

  /**
   * Submits the doctor details to the server.
   * Logs the response or error and navigates to the home page.
   */
  public submitDoctor() {
    console.log(this.doctors);
    this.doctorService.addDoctor(this.doctors).subscribe(
      response => {
        console.log('Doctor added', response);
      },
      error => {
        console.error('Error adding doctor', error);
        this.loggerService.logError("Error detected: " + error);
      }
    );
    this.router.navigate(['/doctors']);
  }

  /**
   * Toggles the visibility of the doctor form.
   */
  public displayForm() {
    this.isVisible = !this.isVisible;
  }
}
