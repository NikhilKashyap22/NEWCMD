

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClinicSummary } from '../models/clinic.model';
import { Clinic } from '../models/clinic.model';


@Injectable({
  providedIn: 'root'
})
export class ClinicService {

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
  private apiUrl = environment.baseApiUrlClinic;

  constructor(private http: HttpClient) {}

  //  1. Get All Clinics (Uses ClinicSummary Model)
  getClinics(): Observable<ClinicSummary[]> {
    return this.http.get<ClinicSummary[]>(`${this.apiUrl}/get-all-service`, {headers:this.getAuthHeaders()});
  }

  //  2. Create a Clinic (Uses Clinic Model)
  addClinic(clinic: Clinic): Observable<Clinic> {
    return this.http.post<Clinic>(`${this.apiUrl}/create-service`, clinic,{headers:this.getAuthHeaders()});
  }

  // 3. Delete Clinic
  deleteClinic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`,{headers:this.getAuthHeaders()});
  }

   // 4 Function: Get Clinic by ID (Will be used inside Edit Component)
  fetchClinicById(id: number): Observable<Clinic> {
    return this.http.get<Clinic>(`${this.apiUrl}/service/${id}`,{headers:this.getAuthHeaders()});
  }

  //   Update Clinic (New Method)
  updateClinic(id: number, clinicData: Clinic): Observable<Clinic> {
    return this.http.put<Clinic>(`${this.apiUrl}/update/${id}`, clinicData,{headers:this.getAuthHeaders()});
  }
}











// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// interface Clinic{
//   id?:number;
//   phoneNumber:string;
//   email:string;
//   name:string;
//   startTime:string;
//   endTime:string;
//   ServiceActive:boolean;

// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ClinicService {
//   id:string='';
//   private baseUrl='http://localhost:8085/api/Clinic/get-all-service';
//   private getClinicByIdUrl='http://localhost:8085/api/Clinic/service/id';
//   private ='';
//   private baseUrl2='';


//   constructor(private http:HttpClient){ }

//   getAllClinics():Observable<Clinic[]>{
//     console.log('Fetching clinics from:', this.baseUrl);
//     return this.http.get<Clinic[]>(this.baseUrl);
//   }


// }

