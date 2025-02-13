export interface Address {
    housename: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }
  
  export interface Picture {
    url: string;
    description: string;
  }
  
  export interface Clinic {
    id: number;
    phoneNumber: string;
    email: string;
    name: string;
    startTime: Date;
    endTime: Date;
    serviceActive: boolean;
    createdBy?: number;
    createdDate?: Date;
    lastModifiedBy?: number;
    lastModifiedDate?: Date;
    address?: Address;
    doctorIds?: string[];
    pictures?: Picture[];
  }
  
  export interface ClinicSummary {
    id: number;
    phoneNumber: string;
    email: string;
    name: string;
    startTime: Date;
    endTime: Date;
    isServiceActive: boolean;
  }
  