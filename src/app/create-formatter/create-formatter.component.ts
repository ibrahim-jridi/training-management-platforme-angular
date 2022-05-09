import { CustomValidators } from './../_classes/custom-validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formatter } from './../_classes/formatter';
import { FormatterService } from './../_services/formatter.service';
import { Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-formatter',
  templateUrl: './create-formatter.component.html',
  styleUrls: ['./create-formatter.component.scss']
})
export class CreateFormatterComponent implements OnInit {
  registerForm: FormGroup;
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  userFile;
  public imagePath;
  imgURL: any;
  userName:string;
  id;
  formatter: Formatter = new Formatter();
  submitted = false;
    constructor(private formatterService: FormatterService,
      private router: Router,
      private formBuilder: FormBuilder) { }

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
  }
    sideBarToggler() {
      this.sideBarOpen = !this.sideBarOpen;
    }
    toggleSidebar() {
      this.toggleSidebarForMe.emit();
    }
    //  * save in userDao
    saveFormatter(){
      this.formatterService.createFormatter(this.formatter).subscribe( data =>{
        console.log(data);
        this.goToFormatterList();
      },
      error => console.log(error));
    }
    //  * save in formatterDao
    saveFormatterr(){
      //const formData = new FormData();

      //this.formatter = this.formatterService.formData.value;
      //formData.append('formatter', JSON.stringify(this.formatter));
      //formData.append('file', this.userFile);
      this.formatterService.createFormatterr(this.formatter).subscribe( data =>{
        
        console.log(data);
        this.goToFormatterList();
      },
      error => console.log(error));
    }

    goToFormatterList(){
      this.router.navigate(['/admin/formatter-list']);
    }
    // get f() {
    //   return this.createForm.controls;
    // }

    onSubmit(){
      CustomValidators.mustMatch('userPassword', 'userConfirmPassword')
      this.submitted = true;
      console.log(this.formatter);
      if (this.registerForm.invalid) {
        return;
    }else{
      this.saveFormatter();
      this.saveFormatterr();
    }
    }
    onSelectFile(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.userFile = file;
        // this.f['profile'].setValue(file);

        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
          console.log('Only images are supported.');

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

}
