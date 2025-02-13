import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ViewAllDoctorsComponent } from "./doctors/components/view-all-doctors/view-all-doctors.component";
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { MainComponent } from "./shared/components/main/main.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { AddDoctorComponent } from './doctors/components/add-doctor/add-doctor.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CreateScheduleComponent } from "./doctor-schedule/components/create-schedule/create-schedule.component";
import { LoginComponent } from "./authentications/components/login/login.component";
import { environment } from './environments/environment';
import * as Sentry from '@sentry/angular';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, SidebarComponent, MainComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'CMD_UI';

  sidebarOpen = true;

  isLoginPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(()=>{this.isLoginPage = this.router.url === '/login' || this.router.url === '/server' || this.router.url === '/register'})

    if (environment.sentryDsn) {
      Sentry.init({ dsn: environment.sentryDsn });
    }
  }

  public toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }
}
