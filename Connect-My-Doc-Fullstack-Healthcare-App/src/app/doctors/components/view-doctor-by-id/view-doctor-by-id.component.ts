import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorNameFormatterPipe } from '../../../pipes/doctor-name-formatter.pipe';

@Component({
  selector: 'app-view-doctor-by-id',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor, DoctorNameFormatterPipe, RouterModule],
  templateUrl: './view-doctor-by-id.component.html',
  styleUrl: './view-doctor-by-id.component.css'
})
export class ViewDoctorByIdComponent implements OnInit {

  /**
   * Stores the doctor ID retrieved from query parameters.
   */
  doctorId!: string;

  /**
   * Holds the doctor details fetched from the API.
   */
  doctor!: Doctor;

  /**
   * Indicates whether the data is currently loading.
   */
  isLoading = false;

  /**
   * Creates an instance of ViewDoctorByIdComponent.
   * @param doctorService Service for handling doctor-related API calls.
   * @param route ActivatedRoute to retrieve query parameters.
   */
  constructor(private doctorService: DoctorService, private route: ActivatedRoute) {}

  /**
   * Lifecycle hook that is called after component initialization.
   * Retrieves doctor ID from query parameters and fetches doctor details.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.doctorId = params['id'];
        this.fetchDoctor();
      }
    });
  }

  /**
   * Fetches doctor details from the API using the stored doctor ID.
   * Displays an alert if no valid ID is provided.
   */
  public fetchDoctor(): void {
    if (!this.doctorId) {
      alert('Please enter a valid Doctor ID.');
      return;
    }
    this.doctorService.getDoctorById(this.doctorId).subscribe(
      (data) => {
        this.doctor = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching doctor details:', error);
        this.doctor = undefined!;
        this.isLoading = false;
      }
    );
  }

}
