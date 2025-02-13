import { Component, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../../authentications/services/auth.service";
import { Router, RouterModule } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { LogoutComponent } from "../../../authentications/components/logout/logout.component";


@Component({
  selector: 'app-header',
  standalone: true,
  imports:[RouterModule],
  templateUrl:'./header.component.html',
  styleUrl:'./header.component.css'
})


export class HeaderComponent{
  @Output() toggle = new EventEmitter<void>();

  constructor(private autheService:AuthService, private router:Router, private dialog:MatDialog){}

  public logout(){
    const dialogRef = this.dialog.open(LogoutComponent);

    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.autheService.logout();
        this.router.navigate([''])
      } else{
        this.router.navigate(['/dashboard']);
      }
    })
  }


  public toggleSidebar(){
    this.toggle.emit();
  }

}
