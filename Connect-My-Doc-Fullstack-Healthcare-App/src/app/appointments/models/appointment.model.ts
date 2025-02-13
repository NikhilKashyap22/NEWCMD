import { IDoctor } from './doctor.model';
import { IPatient } from './patient.model';

export interface IAppointment {
  appointmentId: string;
  appointmentDate: string;
  appointmentTime: string;
  doctor: IDoctor;
  patient: IPatient;
  doctorReview: string | null;
  purposeOfVisit: string;
  appointmentType: string;
  appointmentStatus: string;
}