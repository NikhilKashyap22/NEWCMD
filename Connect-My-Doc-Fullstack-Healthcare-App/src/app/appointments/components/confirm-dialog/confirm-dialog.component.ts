// 1. Imports
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

//2. Component
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'] 
})

//3.Class
export class ConfirmDialogComponent {
  
  //4. Constructor
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointmentId: string }
  ) {}

  //5.Event Handling Methods
  onCancel(): void {
    this.dialogRef.close(false); // User clicked "No"
  }

  onConfirm(): void {
    this.dialogRef.close(true); // User clicked "Yes"
  }
}
