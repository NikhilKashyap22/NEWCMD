
//1. Imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { IAppointment } from '../../models/appointment.model';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ViewAppointmentByIdComponent } from '../view-appointment-by-id/view-appointment-by-id.component';
import { Router, RouterModule } from '@angular/router';  // Import Router here
import { AgGridModule } from 'ag-grid-angular';
import { LoggerService } from '../../../loggers/logger.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faPencilAlt, faTrash, faEye, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { query } from '@angular/animations';


//2. Components
@Component({
  selector: 'app-view-all-appointments',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, DatePipe, FormsModule, RouterModule, AgGridModule, FontAwesomeModule],
  templateUrl: './view-all-appointments.component.html',
  styleUrls: ['./view-all-appointments.component.css']
})

//3. Class
export class ViewAllAppointmentsComponent implements OnInit {

  //4. Properties
  appointments: IAppointment[] = [];
  errorMessage: string = '';
  entriesToShow: number = 10;
  selectedAppointmentId: string | null = null;

  faPencil = faPencilAlt;
  faTrash = faTrash;
  faEye = faEye;
  faEllipsis = faEllipsisV;

  //5. Constructor
  constructor(
        //Injections of Services
    private appointmentService: AppointmentService,
    private router: Router,
    private loggerService: LoggerService,
    private dialog: MatDialog,
  ) {}

    //6. On-Init
  ngOnInit(): void {
    //Call necessary functional methods
    this.getAppointments();
  }

  //7. Authetication Methods

//8. User and Session Methods

  //9. Funtional Methods to get data
  public getAppointments(): void {
    try {
      this.appointmentService.getAllAppointments().subscribe({
        next: (data: IAppointment[]) => {
          this.appointments = data.map(appointment => {
            if (typeof appointment.appointmentDate === 'string') {
              appointment.appointmentDate = this.formatDate(appointment.appointmentDate);
            }
            return appointment;
          });
        },
        error: (err: string) => {
          this.errorMessage = 'Error fetching appointments: ' + err;
          this.loggerService.logError(`Error fetching all appointments: ${err}`); // Log error to Sentry
        }
      });
    } catch (err) {
      this.errorMessage = 'Unexpected error occurred while fetching appointments';
      this.loggerService.logError(`Unexpected error occurred while fetching appointments: ${err}`); // Log error to Sentry
    }
  }



  public scheduleAppointment(): void {
    // connect and route to schedule appointment endpoint
    this.router.navigate(['/schedule-appointment']);
  }


  public editAppointment(appointmentId: string): void {
    try {
      // this.router.navigate(['/home/edit-appointment'], { queryParams: { appointmentId } });
      this.router.navigate(['/home/edit-appointment' ,appointmentId]);
      this.selectedAppointmentId = null;
    } catch (err) {
      this.loggerService.logError(`Error navigating to edit appointment with ID: ${appointmentId} - ${err}`);
    }
  }




  public viewAppointment(appointmentId: string): void {
    try {
      this.router.navigate(['/home/view-appointment-by-id', appointmentId]);
      this.selectedAppointmentId = null;
    } catch (err) {
      this.loggerService.logError(`Error navigating to view appointment with ID: ${appointmentId} - ${err}`);
    }
  }


  public cancelAppointment(appointmentId: string): void {
    // Open the confirmation dialog
    //check for already cancelled appointment status---pending
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { appointmentId: appointmentId } // Pass appointment ID
    });

    // Handle the result when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed cancellation');
        this.callCancelApi(appointmentId); // Call the API to cancel
      } else {
        console.log('User canceled the action');
      }
    });
  }

  callCancelApi(appointmentId: string): void {
    this.appointmentService.cancelAppointmentById(appointmentId).subscribe({
      next: (response) => {
        console.log('Appointment canceled successfully', response);
        // this.updateAppointmentList(appointmentId); // Remove from UI
      },
      error: (error) => {
        console.error('Error canceling appointment:', error);
      }
    });
  }


  //12. Helper Methods
  formatDate(appointmentDate: string): string {
    const parts = appointmentDate.split('-'); // Assuming API returns "yyyy-MM-dd"
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to "dd-MM-yyyy"
    }
    return appointmentDate; // Return unchanged if format is unexpected
  }

  // public updateAppointmentList(appointmentId: string): void {
    //   this.appointments = this.appointments.filter(app => app.appointmentId !== appointmentId);
    // }

    public toggleDropdown(appointmentId: string): void {
      this.selectedAppointmentId = this.selectedAppointmentId === appointmentId ? null : appointmentId;
    }
  }
