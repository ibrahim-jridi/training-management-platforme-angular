import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './../_services/user-auth.service';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {

  constructor(private userAuthService: UserAuthService,) { }

  ngOnInit(): void {
	  this.isLoggedIn();
  }
 public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }
}
