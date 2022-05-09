import { Formation } from './../_classes/formation';
import { FormationService } from './../_services/formation.service';
import { CustomValidators } from './../_classes/custom-validators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

import { HttpClient, HttpEventType } from '@angular/common/http';
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
  userFile;
  public imagePath;
  imgURL;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  progress = 0;
  id:any;
  formatter: Formatter = {} as Formatter;
  formations: Formation [];
  userName;
  public searchTerm !: string;
  searchKey:string ="";
  submitted = false;
  isEnabled=false;
  registerForm: FormGroup;
  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    public formatterService: FormatterService,
    private formationService: FormationService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
    ) {

    }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
      userConfirmPassword: ['', Validators.required],
      adresse: ['', Validators.required],
      phone: ['', Validators.required, Validators.maxLength(8)],
  }, {
      validator: this.MustMatch('password', 'confirmPassword')
  });

  }


  get f() { return this.registerForm.controls; }
  public MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }


    this.isLoggedIn();
    this.formationService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
    this.getFormatterByName()
    this.userName =  localStorage.getItem('userName');
      this.id =  localStorage.getItem('id');

}


  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

  onSubmit(){
    CustomValidators.mustMatch('userPassword', 'userConfirmPassword') // insert here
    this.submitted = true;
    const formData = new  FormData();
    this.formatter = this.formatterService.formData.value;
    formData.append('formatter', JSON.stringify(this.formatter));
    formData.append('file',this.userFile);
    this.formatterService.updateFormatter(this.id, this.formatter).subscribe( data =>{

      window.location.reload();

    }
    , error => console.log(error));

  }



onSelectFile(event) {
  if (event.target.files.length > 0)
  {
    const file = event.target.files[0];
    this.userFile = file;
   // this.f['profile'].setValue(file);

  var mimeType = event.target.files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();

  this.imagePath = file;
  reader.readAsDataURL(file);
  reader.onload = (_event) => {
    this.imgURL = reader.result;
  }
}


  }
  updateFormatter(id) {
    this.formatterService.updateFormatter( id,this.formatter).subscribe(formatter => {
      this.formatter = formatter;
      window.location.reload();
    })
  }
  // get formatter information for jwt token
  getFormatter() {
    this.formatterService.getFormatterById(this.id).subscribe(formatter => {
      this.formatter = formatter;
    })
  }
  //get formatter from jwt token
  getFormatterByName() {
    this.formatterService.findByFormatterName(this.formatterService.getFormatterName()).subscribe(formatter => {
      this.formatter = formatter;
      this.id = formatter.id;
      this.formationService.getFormationsList().subscribe(formation => {
		this.formations = formation;
        this.formations.forEach(element => {
          if (element.id_formatter === formatter.id) {

            return element;
          }

        });


      })

    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.formationService.search.next(this.searchTerm);
  }

//calculate Period of time
timeDiff(){
  var currentDate = new Date();
  this.formatterService.findByFormatterName(this.formatterService.getFormatterName()).subscribe(formatter => {
    this.formatter = formatter;
    this.id = formatter.id;
    this.formationService.getFormationsList().subscribe(formation => {
      this.formations = formation;
      this.formations.forEach(element => {
        if (element.date_debut == currentDate) {

          this.isEnabled = true;
        }

      });


    })

  })
 }
 deleteFormation(id:number){

  this.formationService.deleteFormation(id).subscribe( data => {
    console.log(data);
    window.location.reload();
  })
 }

}






