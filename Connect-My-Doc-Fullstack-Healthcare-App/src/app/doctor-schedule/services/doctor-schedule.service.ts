import { DoctorSchedule } from './../models/doctor-schedule';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '../../environments/environment.service';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorScheduleService {

  constructor(private http:HttpClient) { }

  public getAuthHeaders(): HttpHeaders{
      const token = localStorage.getItem('jwtToken');
      return new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      })
    }

  private handleError(error: HttpErrorResponse) {
      console.error('An error occurred:', error);
      return throwError(() => new Error(error.message || 'Server error'));
    }


  public getAllSchedules():Observable<any>{
    try{
      const url = `${environment.baseApiUrl}${environment.services['doctorSchedule']}${environment.apiPaths['doctorSchedule']['getAllSchedules']}`;
      console.log("Schedule URL: " + url);
      return this.http.get<DoctorSchedule>(url, {headers:this.getAuthHeaders()}).pipe(catchError(this.handleError));
    }catch (error){
      return throwError(()=> new Error('Error fetching schedules: '+ error));
    }
  }

  public getScheduleById(id:string):Observable<DoctorSchedule>{
    try{
      const url = `${environment.baseApiUrl}${environment.services['doctorSchedule']}${environment.apiPaths['doctorSchedule']['getScheduleById']}${id}`;
      console.log('Get Schedule URL: ' + url);
      return this.http.get<DoctorSchedule>(url, {headers:this.getAuthHeaders()}).pipe(catchError(this.handleError));
    } catch (error){
      return throwError(()=> new Error('Error get doctor for this id: '+ id));
    }
  }

  public addDoctorSchedule(doctorSchedule:DoctorSchedule):Observable<DoctorSchedule>{
    try{
    const url = `${environment.baseApiUrl}${environment.services['doctorSchedule']}${environment.apiPaths['doctorSchedule']['createSchedule']}`;
    console.log("Create Schedule URL: " + url);
    return this.http.post<DoctorSchedule>(url, doctorSchedule, {headers:this.getAuthHeaders()}).pipe(catchError(this.handleError));
  }catch(error){
      return throwError(()=> new Error('Error creating schedule: ' + error))
    }
  }

  public updateDoctorSchedule(id:string, doctorSchedule:DoctorSchedule):Observable<DoctorSchedule>{
    try{
      const url = `${environment.baseApiUrl}${environment.services['doctorSchedule']}${environment.apiPaths['doctorSchedule']['updateDoctorSchedule']}${id}`;
      console.log("Update Doctor URL: " + url);
      return this.http.put<DoctorSchedule>(url, doctorSchedule, {headers:this.getAuthHeaders()}).pipe(catchError(this.handleError));
    }catch (error) {
      return throwError(() => new Error('Error updating doctor schedule: ' + error));
    }
  }

}
