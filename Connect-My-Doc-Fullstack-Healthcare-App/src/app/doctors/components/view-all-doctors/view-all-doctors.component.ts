// 1. Imports.
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { NgFor, NgIf } from '@angular/common';
import { Doctor } from '../../models/doctor.model';
import { Router, RouterModule } from '@angular/router';
import { ColDef } from './../../../../../node_modules/ag-grid-community/dist/types/src/entities/colDef.d';
import { AgGridModule } from 'ag-grid-angular';
import { AddDoctorComponent } from "../add-doctor/add-doctor.component";
import { DoctorNameFormatterPipe } from '../../../pipes/doctor-name-formatter.pipe';
import { LoggerService } from '../../../loggers/logger.service';

// 2. Component and Templates.
@Component({
  selector: 'app-view-all-doctors',
  standalone: true,
  imports: [NgFor, AgGridModule, RouterModule, DoctorNameFormatterPipe],
  templateUrl: './view-all-doctors.component.html',
  styleUrl: './view-all-doctors.component.css'
})

// 3. Class.
export class ViewAllDoctorsComponent implements OnInit {

  // 4. Properties.

  /**
   * Stores the list of doctors retrieved from the API.
   */
  doctors: Doctor[] = [];

  /**
   * Controls the visibility of the doctors list.
   */
  showDoctors = false;

  /**
   * Controls the visibility of the form.
   */
  isVisible = false;

  // 5. Constructor.

  /**
   * Creates an instance of ViewAllDoctorsComponent.
   * @param doctorService Service for handling doctor-related operations.
   * @param router Angular Router for navigation.
   * @param loggerService Service for logging errors.
   */
  constructor(
    private doctorService: DoctorService, // DoctorService injection
    private router: Router, // Router injection
    private loggerService: LoggerService
  ) {}

  // 6. On-Init Method.

  /**
   * Lifecycle hook that is called after component initialization.
   * Loads the list of doctors.
   */
  public ngOnInit(): void {
    this.loadDoctors();
  }

  // 7. Functional Methods to get Doctor data.

  /**
   * Fetches all doctors from the API and updates the doctors list.
   * Logs errors if the request fails.
   */
  public loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => (this.doctors = data),
      error: (err) => {
        console.error('Error message: ' + err),
        this.loggerService.logError("Error detected: " + err);
      }
    });
  }

  // 8. Functional Methods to route to respective components.

  /**
   * Navigates to the edit doctor page for the given doctor ID.
   * @param doctorId The ID of the doctor to edit.
   */
  public editDoctor(doctorId: string): void {
    console.log("edit button clicked");
    this.router.navigate(['/edit-doctor', doctorId]);
  }

  /**
   * Navigates to the update address section for the given doctor ID.
   * @param doctorId The ID of the doctor whose address needs to be updated.
   */
  public updateAddress(doctorId: string): void {
    this.router.navigate(['/edit-doctor'], { queryParams: { id: doctorId, section: 'address' } });
  }

  /**
   * Navigates to the view doctor details page for the given doctor ID.
   * @param doctorId The ID of the doctor to view.
   */
  public viewDoctor(doctorId: string): void {
    this.router.navigate(['/view-doctor-by-id'], { queryParams: { id: doctorId, section: 'view-doctor-by-id' } });
  }

  // 9. Functional Methods to submit and process data.

  /**
   * Deletes the doctor with the given ID after confirmation.
   * @param doctorId The ID of the doctor to delete.
   */
  public deleteDoctor(doctorId: string): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(doctorId).subscribe(
        () => {
          alert('Doctor deleted successfully!');
          this.router.navigate(['/doctors']);
        },
        (error) => {
          alert('Error deleting doctor');
        }
      );
    }
  }

  // 10. Events.

  /**
   * Toggles the visibility of the form.
   */
  public toggleForm(): void {
    this.isVisible = !this.isVisible;
  }
}
