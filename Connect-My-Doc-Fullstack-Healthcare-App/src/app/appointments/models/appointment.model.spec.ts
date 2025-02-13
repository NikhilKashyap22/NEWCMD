import { IAppointment } from './appointment.model';
import { IDoctor } from './doctor.model';
import { IPatient } from './patient.model';

describe('IAppointment Interface', () => {
  it('should create an appointment object with the correct structure', () => {
    const doctor: IDoctor = {
      doctorId: 'string',
      doctorName: 'Doctor_Name',
      doctorEmail: 'doctor@email.com',
      associatedClinicId: 'CLI-1234-2024',
      associatedClinicName: 'Clinic_Name'
    };

    const patient: IPatient = {
      patientId: 'string',
      patientName: 'Patient_Name',
      patientEmail: 'patient@email.com',
      contactNumber: '1234567890',
      age: 20,
      active: true
    };

    const appointment: IAppointment = {
      appointmentId: 'APT-2813-2025',
      appointmentDate: '2025-02-20',
      appointmentTime: '12:45:00',
      doctor: doctor,
      patient: patient,
      doctorReview: null,
      purposeOfVisit: 'TOOTH_ACHE',
      appointmentType: 'ONLINE',
      appointmentStatus: 'SCHEDULED'
    };

    expect(appointment).toBeTruthy();
    expect(appointment.appointmentId).toBe('APT-2813-2025');
    expect(appointment.appointmentDate).toBe('2025-02-20');
    expect(appointment.appointmentTime).toBe('12:45:00');
    expect(appointment.doctor.doctorName).toBe('Doctor_Name');
    expect(appointment.patient.patientName).toBe('Patient_Name');
  });
});
