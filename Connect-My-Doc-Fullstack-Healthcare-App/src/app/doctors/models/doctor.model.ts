export interface Doctor {
  doctorId: string; // Matches backend
  firstName: string;
  lastName: string;
  phoneNum: number;
  dateOfBirth: string; // Use string to handle date properly
  email: string;
  experienceInYears: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER'; // Ensure it matches backend Enum
  status: string;
  clinicId: string;
  address: Address;
  specialization: Specialization;
  experiences: Experience[];
  qualifications?: Qualification[];
}

export interface Address {
  houseName: string;
  city: string;
  state: string;
  country:string;
  zipCode: string;
}

export interface Specialization {
  specializationType: string;
  specializationDescription: string;
}

export interface Experience {
  clinicName:string;
  experienceInYears:number;
  role:string;
  experienceType: 'PRESENTLY_WORKING' | 'WORKED_IN_PAST' ;
}

export interface Qualification {
  degree: string;
  university: string;
  yearCompleted: number;
  startYear: string;
  endYear:string;
}

export class DoctorModel{}
