//1. Import
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Environment } from 'ag-grid-community';
import { AppointmentService } from '../../services/appointment.service';
import { LoggerService } from '../../../loggers/logger.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

//2. Component
@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,CommonModule,NgFor,RouterModule],
  templateUrl: './schedule-appointment.component.html',
  styleUrl: './schedule-appointment.component.css'
})

//3. Class
export class ScheduleAppointmentComponent {

  //4. Properties
  appointmentForm!: FormGroup;
  purposeOfVisitOptions!: string[];
  appointmentTypeOptions!: string[];
  scheduledAppointment: any = null;

  //5. Constructor
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private appointmentService: AppointmentService,
    private loggerService : LoggerService  
  ) {}

  //6. On-Init
  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      patientId: ['', [Validators.required, Validators.pattern(/^PAT-\d{4}-\d{4}$/)]], // Valid format: PAT-1234-1234
      doctorId: ['', [Validators.required, Validators.pattern(/^DOC-\d{4}-\d{4}$/)]], // Valid format: DOC-1234-1234
      // doctorReview: [''], //Any main points said by doctor
      appointmentDate: ['', Validators.required], // YYYY-MM-DD format
      appointmentTime: ['', Validators.required], // HH:mm format
      appointmentType: ['', Validators.required], // To be fetched dynamically
      purposeOfVisit: ['', Validators.required], // To be fetched dynamically
    });

    this.getPurposeOfVisit();
    this.getAppointmentTypeOptions();
  }


  //7. Functional Method Calls
  public getPurposeOfVisit(): void {
    try {
      
      this.appointmentService.getPurposeOfVisitValues().subscribe({
        next : (data) => this.purposeOfVisitOptions = data,
        error: (error) => console.error('Error fetching purpouseOfVisit options', error)
      });

    } catch (error) {
      this.loggerService.logError(`Error fetching purpouseOfVisit options : ${error}`);
    }
  }

  public getAppointmentTypeOptions(): void {

    try {
      
      this.appointmentService.getAppointmentTypeValues().subscribe({
        next : (data) => this.appointmentTypeOptions = data,
        error: (error) => console.error('Error fetching appointmentType options', error)
      });

    } catch (error) {
      this.loggerService.logError(`Error fetching appointmentType values : ${error}`);
    }
    
  }

  //8. Functional methods to submit
  public submitAppointment(): void {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;

    // Convert date from YYYY-MM-DD to DD-MM-YYYY
    const formattedDate = this.formatDate(formData.appointmentDate);

    //Appointments form data
      const appointmentData = {
        doctor: {
          doctorId: formData.doctorId,
          doctorName: '', 
          doctorEmail: '',
          associatedClinicId: '',
          associatedClinicName: ''
        },
        patient: {
          patientId: formData.patientId,
          patientName: '', 
          patientEmail: '',
          contactNumber: '',
          age: 0,  
          active: true
        },
        appointmentDate: formattedDate, 
        appointmentTime: formData.appointmentTime,
        appointmentStatus: 'SCHEDULED',
        purposeOfVisit: formData.purposeOfVisit,
        appointmentType: formData.appointmentType
      };

      this.appointmentService.scheduleAppointment(appointmentData).subscribe({
        next: (response) => {
          console.log('Appointment Scheduled:', response);
          this.scheduledAppointment = response.appointment; 
          // console.log(this.scheduledAppointment);
          this.appointmentForm.reset();
        },
        error: (error) => console.error('Error scheduling appointment:', error)
      });
      // console.log('Submitting appointment:', JSON.stringify(appointmentData));

    } else {
      console.log('Invalid Form');
    }
  }
  

  //9.  Helper function to convert YYYY-MM-DD to DD-MM-YYYY
  private formatDate(isoDate: string): string {
    console.log('Appointment Date : '+ isoDate);
    const [year, month, day] = isoDate.split('-');
    console.log('DD : '+ day + ' MM : '+ month + ' YYYY : '+ year);
    return `${day}-${month}-${year}`;
  }
}
