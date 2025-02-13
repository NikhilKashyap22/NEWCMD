import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicService } from '../../services/clinic.service';
import { Clinic } from '../../models/clinic.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-clinic',
  standalone: true,  
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css'],
  imports: [CommonModule, ReactiveFormsModule,RouterModule], 
})
export class AddClinicComponent {
  clinicForm: FormGroup;

  constructor(private fb: FormBuilder, private clinicService: ClinicService, private router: Router) {
    this.clinicForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      serviceActive: [true],
      address: this.fb.group({
        housename: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      doctorIds: [[]],
      pictures: this.fb.array([]),
    });
  }

  public onSubmit() {
    if (this.clinicForm.valid) {
      const clinic: Clinic = this.clinicForm.value;
      this.clinicService.addClinic(clinic).subscribe({
        next: () => {
          alert('Clinic Added Successfully!');
          this.router.navigate(['/clinics']);
        },
        error: err => alert('Error: ' + err.message),
      });
    }
    this.router.navigate(['/']);
  }
}
