import { GetAllSchedulesComponent } from './doctor-schedule/components/get-all-schedules/get-all-schedules.component';
import { Routes } from '@angular/router';

//Appointments --> Ashish
import { CancelAppointmentComponent } from './appointments/components/cancel-appointment/cancel-appointment.component';
import { EditAppointmentComponent } from './appointments/components/edit-appointment/edit-appointment.component';
import { ScheduleAppointmentComponent } from './appointments/components/schedule-appointment/schedule-appointment.component';
import { ViewAllAppointmentsComponent } from './appointments/components/view-all-appointments/view-all-appointments.component';
import { ViewAppointmentByIdComponent } from './appointments/components/view-appointment-by-id/view-appointment-by-id.component';

//Clinics --> Anurag
import { AddClinicComponent } from './clinics/components/add-clinic/add-clinic.component';
import { EditClinicComponent } from './clinics/components/edit-clinic/edit-clinic.component';
import { ViewAllClinicsComponent } from './clinics/components/view-all-clinics/view-all-clinics.component';
import { ViewClinicByIdComponent } from './clinics/components/view-clinic-by-id/view-clinic-by-id.component';

//doctors --> Nikhil
import { AddDoctorComponent } from './doctors/components/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './doctors/components/edit-doctor/edit-doctor.component';
import { ViewAllDoctorsComponent } from './doctors/components/view-all-doctors/view-all-doctors.component';
import { ViewDoctorByIdComponent } from './doctors/components/view-doctor-by-id/view-doctor-by-id.component';
import { DoctorHomeComponent } from './doctors/doctor-home/doctor-home.component';

//Authentication routing
import { LoginComponent } from './authentications/components/login/login.component';
import { LogoutComponent } from './authentications/components/logout/logout.component';
import { RegisterComponent } from './authentications/components/register/register.component';
import { MainComponent } from './shared/components/main/main.component';
import { CreateScheduleComponent } from './doctor-schedule/components/create-schedule/create-schedule.component';
import { GetScheduleByIdComponent } from './doctor-schedule/components/get-schedule-by-id/get-schedule-by-id.component';
import { UpdateDoctorScheduleComponent } from './doctor-schedule/components/update-doctor-schedule/update-doctor-schedule.component';
import { DoctorScheduleHomeComponent } from './doctor-schedule/doctor-schedule-home/doctor-schedule-home.component';
import { AuthGuard } from './authentications/guards/auth.guard';
import { PatientsComponent } from './patients/patients.component';
import { ServerDownComponent } from './authentications/components/server-down/server-down.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';


const routerConfig: Routes = [
  //Default Routing
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,title:'CMD - Medical & Hospital Application', canActivate: [AuthGuard]},
  {path:'doctor-schedules',component:DoctorScheduleHomeComponent,title:'Doctor schedule',canActivate: [AuthGuard]},

  //Appointment routing paths
  {path:'cancel', component:CancelAppointmentComponent,canActivate: [AuthGuard]},
  {path:'edit-appointment', component:EditAppointmentComponent,canActivate: [AuthGuard]},
  {path:'schedule-appointment', component:ScheduleAppointmentComponent,canActivate: [AuthGuard]},
  {path:'appointments', component:ViewAllAppointmentsComponent,canActivate: [AuthGuard]},
  {path:'view-appointment-by-id', component:ViewAppointmentByIdComponent,canActivate: [AuthGuard]},

  //Clinics routing paths
  {path:'add-clinic',component:AddClinicComponent,canActivate: [AuthGuard]},
  {path:'edit-clinic',component:EditClinicComponent,canActivate: [AuthGuard]},
  {path:'view-all-clinics',component:ViewAllClinicsComponent,canActivate: [AuthGuard]},
  {path:'view-clinic-by-id',component:ViewClinicByIdComponent,canActivate: [AuthGuard]},

  //Doctors routing paths
  {path:'add-doctor',component:AddDoctorComponent,canActivate: [AuthGuard]},
  {path:'edit-doctor',component:EditDoctorComponent,canActivate: [AuthGuard]},
  {path:'doctors',component:ViewAllDoctorsComponent,canActivate: [AuthGuard]},
  {path:'view-doctor-by-id',component:ViewDoctorByIdComponent,canActivate: [AuthGuard]},

  //Doctor Schedule Routes
  {path:'create-schedule',component:CreateScheduleComponent,canActivate: [AuthGuard]},
  {path:'get-all-schedules',component:GetAllSchedulesComponent,canActivate: [AuthGuard]},
  {path:'get-schedule-by-id',component:GetScheduleByIdComponent,canActivate: [AuthGuard]},
  {path:'update-doctor-schedule',component:UpdateDoctorScheduleComponent,canActivate: [AuthGuard]},

  //Authentication
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent},
  {path:'server',component:ServerDownComponent},
  {path:'register',component:RegisterComponent},

  //Patients
 {path:'patients',component:PatientsComponent},
 {path:'departments',component:PatientsComponent},
 {path:'services',component:PatientsComponent},
 {path:'assets',component:PatientsComponent},


 {path:'sidebar',component:SidebarComponent}
];

export default routerConfig;
