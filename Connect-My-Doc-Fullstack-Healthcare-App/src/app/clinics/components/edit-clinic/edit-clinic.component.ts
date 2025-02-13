import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicService } from '../../services/clinic.service';
import { Clinic } from '../../models/clinic.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-clinic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-clinic.component.html',
  styleUrls: ['./edit-clinic.component.css']
})
export class EditClinicComponent implements OnInit {
  clinicForm!: FormGroup;
  clinicId!: number;
  

  private route = inject(ActivatedRoute);
  private clinicService = inject(ClinicService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.clinicId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadClinicData(); // Function ko call kar rahe hain
  }

  initForm(): void {
    this.clinicForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      isServiceActive: [false],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      status: [false],
      address: this.fb.group({
        housename: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      })
    });
  }

  // Function to Get Clinic Data by ID
  loadClinicData(): void {
    this.clinicService.fetchClinicById(this.clinicId).subscribe(
      (data) => {
        this.clinicForm.patchValue(data);
      },
      (error) => console.error('Error fetching clinic data', error)
    );
  }

  onSubmit(): void {
    if (this.clinicForm.invalid) return;

    const updatedClinic: Clinic = this.clinicForm.value;

    this.clinicService.updateClinic(this.clinicId, updatedClinic).subscribe(
      () => {
       // alert('Clinic updated successfully');
        this.router.navigate(['/clinics']);
      },
      (error) => console.error('Error updating clinic', error)
    );
  }
}
