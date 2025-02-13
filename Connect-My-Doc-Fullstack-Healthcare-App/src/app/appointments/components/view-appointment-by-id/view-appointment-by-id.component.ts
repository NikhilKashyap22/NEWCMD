import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { IAppointment } from '../../models/appointment.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-appointment-by-id',
  standalone: true, 
  imports: [CommonModule, DatePipe, RouterModule], 
  templateUrl: './view-appointment-by-id.component.html',
  styleUrls: ['./view-appointment-by-id.component.css'],
})
export class ViewAppointmentByIdComponent implements OnInit {
  appointment: IAppointment | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const appointmentId = this.route.snapshot.paramMap.get('appointmentId');
    if (appointmentId) {
      this.getAppointmentById(appointmentId);
    } else {
      this.errorMessage = 'Invalid appointment ID';
    }
  }

  private getAppointmentById(appointmentId: string): void {
    this.appointmentService.getAppointmentById(appointmentId).subscribe({
      next: (data) => {
        this.appointment = data;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching appointment details';
      },
    });
  }
}
