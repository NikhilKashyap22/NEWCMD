export interface DoctorSchedule {
  doctorId:string;
  name:string;
  weekDay:'MONDAY'|'TUESDAY'|'WEDNESDAY'|'THURSDAY'|'FRIDAY'|'SATURDAY'|'SUNDAY';
  startTime:string;
  endTime:string;
  availabilityMode:'ONLINE'|'OFFLINE';
  clinicId:string;
}
