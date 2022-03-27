import { UserService } from './../_services/user.service';
import { Router } from '@angular/router';
import { UserAuthService } from './../_services/user-auth.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;

  constructor(private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService) { }

  ngOnInit(): void {
  }





  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

}
