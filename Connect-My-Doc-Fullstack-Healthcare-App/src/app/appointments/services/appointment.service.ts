// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
// import { IAppointment } from '../models/appointment.model'
import { EnvironmentService } from '../../environments/environment.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  // Correct import for map and catchError
import { IAppointment } from '../models/appointment.model'; // Adjust according to your model import
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  public getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('jwtToken');
      console.log("Token: "+token)
      if (!token) {
        alert('JWT Token is missing');
        return new HttpHeaders({
          'Content-Type': 'application/json'
        });
      }
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }


  constructor(private http: HttpClient, private envService:EnvironmentService) {

  }

  public getAllAppointments(): Observable<IAppointment[]> {

    const url = `${environment.baseApiUrlAppointments}${environment.services['appointments']}${environment.apiPaths['appointments']['getAllAppointments']}`;

    console.log(url);
    return this.http.get<IAppointment[]>(url, {headers:this.getAuthHeaders()});
  }

  public scheduleAppointment(appointmentData: any): Observable<any> {
    const url = `${environment.baseApiUrlAppointments}${environment.services['appointments']}${environment.apiPaths['appointments']['createAppointment']}`;
    console.log(url);
    return this.http.post<any>(url, appointmentData);
}


  public getPurposeOfVisitValues(): Observable<string[]> {

    const url = `${environment.baseApiUrlAppointments}${environment.services['appointments']}${environment.apiPaths['appointments']['purposeOfVisit']}`;
    console.log(url);

    return this.http.get<string[]>(url);

  }

  public getAppointmentTypeValues(): Observable<string[]>{

    const url = `${environment.baseApiUrlAppointments}${environment.services['appointments']}${environment.apiPaths['appointments']['appointmentType']}`;
    console.log(url);

    return this.http.get<string[]>(url);

  }


  public cancelAppointmentById(appointmentId: string): Observable<any> {
    return this.http.put(`${environment.baseApiUrlAppointments}${environment.services['appointments']}${environment.apiPaths['appointments']['cancelAppointment'].replace('{appointmentId}', appointmentId)}`,{});
  }

  public getAppointmentById(appointmentId: string): Observable<IAppointment> {
    return this.http.get<{ object: IAppointment }>(`${environment.baseApiUrlAppointments}${environment.services['appointments']}${environment.apiPaths['appointments']['getAppointmentById'].replace('{appointmentId}', appointmentId)}`).pipe(
      map(response => response.object),  // Use map to extract the 'object' part of the response
      catchError((error) => {
        // Error logging logic
        console.error('Error fetching appointment details:', error);
        return throwError(() => new Error('Error fetching appointment details')); // Propagate the error
      })
    );
  }


  public rescheduleAppointment(appointmentId: string, updatedAppointment: IAppointment): Observable<any> {
    const params = new HttpParams()
      .set('newDate', updatedAppointment.appointmentDate)
      .set('newTime', updatedAppointment.appointmentTime);

    return this.http.put(
      `${environment.baseApiUrlAppointments}${environment.services['appointments']}${environment.apiPaths['appointments']['rescheduleAppointment'].replace('{appointmentId}', appointmentId)}`,
      {}, // Empty body since we're using query params
      { params } // Attach query parameters
    );
  }


}
