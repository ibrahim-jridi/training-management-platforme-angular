import { Formatter } from './../_classes/formatter';
import { FormatterService } from './../_services/formatter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from './../_services/user-auth.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formatter',
  templateUrl: './formatter.component.html',
  styleUrls: ['./formatter.component.css']
})
export class FormatterComponent implements OnInit {
  message;
  id: number;
  formatter: Formatter = new Formatter();
  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private formatterService: FormatterService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.forFormatter();
    this.id = this.route.snapshot.params['id'];

    this.formatterService.getFormatterById(this.id).subscribe(data => {
      this.formatter = data;
    }, error => console.log(error));
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }
  onSubmit(){
    this.formatterService.updateFormatter(this.id, this.formatter).subscribe( data =>{
      
    }
    , error => console.log(error));
  }
  forFormatter() {
    this.userService.forFormatter().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
