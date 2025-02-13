// 1. Imports
import { DoctorService } from './../../services/doctor.service';
import { Component, OnInit } from '@angular/core';
import { Address, Doctor, Experience } from '../../models/doctor.model';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// 2. Component and Templates
@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.css',
})

// 3. Class
export class EditDoctorComponent implements OnInit {
  // 4. Properties

  /**
   * Stores the ID of the doctor being edited.
   */
  doctorId: string = '';

  /**
   * Holds the doctor details retrieved from the API.
   */
  doctor: Doctor | null = null;

  /**
   * Represents a new experience entry for the doctor.
   */
  newExperience: Experience = {
    clinicName: '',
    experienceInYears: 0,
    role: '',
    experienceType: 'PRESENTLY_WORKING',
  };

  /**
   * Stores the updated experience details for submission.
   */
  updatedExperience: Experience[] = [this.newExperience];

  /**
   * Represents a new address entry for the doctor.
   */
  newAddress: Address = {
    houseName: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  };

  // 5. Constructor

  /**
   * Creates an instance of EditDoctorComponent.
   * @param doctorService Service for handling doctor-related API calls.
   * @param route ActivatedRoute for retrieving query parameters.
   * @param router Router for navigation.
   */
  constructor(
    private doctorService: DoctorService, // Injecting instance DoctorService
    private route: ActivatedRoute, // Injecting instance of ActivatedRoute
    private router: Router // Injecting instance of Router
  ) {}

  // 6. On-Init Method

  /**
   * Lifecycle hook that is called after component initialization.
   * Retrieves doctor ID from query parameters and fetches doctor details.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.doctorId = params['id'];
        this.fetchDoctor();
      }
    });
  }

  // 7. Functional Methods to get data.

  /**
   * Fetches doctor details from the API using the stored doctor ID.
   * If the doctor is not found, an alert is displayed.
   */
  public fetchDoctor() {
    this.doctorService.getDoctorById(this.doctorId).subscribe(
      (data) => {
        this.doctor = data;
      },
      (error) => {
        alert('Doctor not found');
      }
    );
  }

  // 8. Functional Methods to submit and process data.

  /**
   * Updates the experience details of the doctor.
   * Submits the updated experience to the API and navigates to the home page.
   */
  public updateExperience() {
    this.doctorService
      .updateDoctorExperience(this.doctorId, this.updatedExperience)
      .subscribe({
        next: (data) => ((this.doctor = data), console.log('Data: ' + data)),
        error: (err) => console.error('Error message: ' + err),
      });
    this.router.navigate(['/doctors']);
  }

  /**
   * Updates the address details of the doctor.
   * Submits the new address to the API and navigates to the home page.
   */
  public updateAddress() {
    this.doctorService
      .updateDoctorAddress(this.doctorId, this.newAddress)
      .subscribe(
        (updatedDoctor) => {
          this.doctor = updatedDoctor;
        },
        (error) => {
          alert('error updating status');
        }
      );
    this.router.navigate(['/doctors']);
  }
}
