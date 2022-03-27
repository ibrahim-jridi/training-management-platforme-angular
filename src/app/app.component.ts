import { UserAuthService } from './_services/user-auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login-jwt';
  sideBarOpen = true;
  // private userAuthService: UserAuthService;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  // public isLoggedIn() {
  //   return this.userAuthService.isLoggedIn();
  // }
}
