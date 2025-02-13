//1. Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IAppointment } from '../../models/appointment.model';
import { CommonModule } from '@angular/common';

// 2. Component
@Component({
  selector: 'app-edit-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Corrected imports
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})

// 3.Class
export class EditAppointmentComponent implements OnInit {
  
  //4. Properties
  appointmentForm: FormGroup;
  appointmentId!: string; //  Non-null assertion to fix TS error
  appointmentDetails: IAppointment | null = null;
  errorMessage: string = '';

  //5. Constructor
  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private router: Router //  Private is enough
  ) {
    this.appointmentForm = this.fb.group({
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required]
    });
  }
//6.On-Init
  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.paramMap.get('appointmentId') || '';
      
    if (this.appointmentId) {
      this.fetchAppointmentDetails();
    } else {
      this.errorMessage = 'Appointment ID is missing';
    }
    
  }
  
  //7. Functional Methods
  private fetchAppointmentDetails(): void {
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
      next: (appointment) => {
        this.appointmentDetails = appointment;
        this.populateForm(appointment);
      },
      error: (err) => {
        this.errorMessage = 'Error fetching appointment details. Please try again later.';
        console.error('Error fetching appointment details:', err);
      }
    });
  }

  private populateForm(appointment: IAppointment): void {
    this.appointmentForm.patchValue({
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime
    });
  }

  public rescheduleAppointment(): void {
    if (this.appointmentForm.invalid) return;
    
    const formattedDate = this.formatDateToDDMMYYYY(this.appointmentForm.value.appointmentDate);
    const formattedTime = this.formatTimeToHHMM(this.appointmentForm.value.appointmentTime);
    
    const updatedAppointment: IAppointment = {
      ...this.appointmentDetails!,
      appointmentDate: formattedDate, // Sending formatted date
      appointmentTime: formattedTime  // Sending formatted time
    };
    
    this.appointmentService.rescheduleAppointment(this.appointmentId, updatedAppointment).subscribe({
      next: () => this.handleSuccess(),
      error: (error) => this.handleError(error)
    });
  }
  
  
  
  //8. Event Handling methods
  private handleSuccess(): void {
    console.log('Appointment rescheduled successfully');
    this.router.navigate(['/view-all-appointments']); 
  }
  
  private handleError(error: any): void {
    this.errorMessage = 'Error rescheduling appointment. Please try again later.';
    console.error('Error rescheduling appointment:', error);
  }
  
  public cancel(): void {
    this.router.navigate(['/view-all-appointments']);
  }
  
    private formatDateToDDMMYYYY(dateString: string): string {
      const [year, month, day] = dateString.split('-'); // Splitting YYYY-MM-DD
      return `${day}-${month}-${year}`; // Rearranging to DD-MM-YYYY
    }
    
    private formatTimeToHHMM(timeString: string): string {
      return timeString.substring(0, 5); // Extracts HH:mm from HH:mm:ss
    }
    
}
