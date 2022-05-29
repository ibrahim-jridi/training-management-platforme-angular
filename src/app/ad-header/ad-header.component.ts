import { User } from './../_classes/user';
import { UserService } from './../_services/user.service';
import { UserAuthService } from './../_services/user-auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ad-header',
  templateUrl: './ad-header.component.html',
  styleUrls: ['./ad-header.component.scss']
})
export class AdHeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  id;
  user: User = {} as User;
  constructor(private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService) {}

  ngOnInit(): void {
    this.getUserByName();
    this.isLoggedIn();
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
   // get user information for jwt token

  getUserByName() {
    this.userService.findByUserName(this.userService.getUserName()).subscribe(user => {
      this.user = user;
      this.id = user.id;
    })
  }

}
