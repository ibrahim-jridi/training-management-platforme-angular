import { FormatterService } from './../_services/formatter.service';
import { Formatter } from './../_classes/formatter';
import { User } from './../_classes/user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = {} as User;
  formatter: Formatter = {} as Formatter;
  userName: string;
  userPassword: string;
  constructor(
    private userService: UserService,
    private formatterService: FormatterService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        this.userService.saveUserName(response.user.userName);
        const role = response.user.role[0].roleName;
        if (role === 'Admin') {

          this.userService.getUserName();
          console.log(this.userName);
          // this.userService.addUser(this.user).subscribe(user => {
          //   this.user = user;
          //   this.userService.saveUserName(user.userName);
          //   this.router.navigate([`/admin`]);
          // });

          this.router.navigate(['/admin']);

          // this.router.navigate(['/admin/:id']);
        } else if(role === 'Formatter') {
          // console.log(this.userName);
          // this.userService.findByUserName(this.userService.getUserName()).subscribe(formatter => {
          //   this.formatter = formatter;
          //   this.userService.saveUserName(formatter.userName);
          //   window.location.replace("/")
          // })
          // this.formatterService.findByFormatterName(this.formatterService.getFormatterName()).subscribe(formatter => {
          //   this.formatter = formatter;
          //   this.formatterService.saveFormatterName(formatter.userName);
          //   window.location.replace("/")
          // })
          this.router.navigate(['/formatter']);
        } else if (role === 'User') {
          console.log(this.userName);
          this.userService.findByUserName(this.userService.getUserName()).subscribe(user => {
            this.user = user;
            this.userService.saveUserName(user.userName);
            window.location.replace("/")
          })
          this.router.navigate(['/user/:id']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
