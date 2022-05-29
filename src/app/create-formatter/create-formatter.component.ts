import { CustomValidators } from './../_classes/custom-validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formatter } from './../_classes/formatter';
import { FormatterService } from './../_services/formatter.service';
import { Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MustMatch } from '../_classes/must-much';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-formatter',
  templateUrl: './create-formatter.component.html',
  styleUrls: ['./create-formatter.component.scss']
})
export class CreateFormatterComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  userFile;
  public imagePath;
  imgURL: any;
  userName:string;
  id;
  formatter: Formatter = new Formatter();
  submitted = false;
  actionBtn : String = "Ajouter"
  formateurForm!: FormGroup;
    constructor(private formatterService: FormatterService,
      private router: Router,
      private formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public editData: any,
      private dialogRef: MatDialogRef<CreateFormatterComponent>) { }

    ngOnInit(): void {

      /* this.registerForm = this.formBuilder.group({
        userName: ['', Validators.required],
        userFirstName: ['', Validators.required],
        userLastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userPassword: ['', [Validators.required, Validators.minLength(6)]],
        userConfirmPassword: ['', Validators.required],
        adresse: ['', Validators.required],
        phone: ['', Validators.required, Validators.maxLength(8)],
    } ); */
    this.formateurForm = this.formBuilder.group({
      email:['',Validators.required],
      userFirstName:['',Validators.required],
      userLastName:['',Validators.required],
      userName:['',Validators.required],
      userPassword:['',Validators.required],
	  userConfirmPassword:['',Validators.required],
	  phone:['',Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Modifier";
      this.formateurForm.controls['email'].setValue(this.editData.email);
      this.formateurForm.controls['userFirstName'].setValue(this.editData.userFirstName);
      this.formateurForm.controls['userLastName'].setValue(this.editData.userLastName);
      this.formateurForm.controls['userName'].setValue(this.editData.userName);
      this.formateurForm.controls['userPassword'].setValue(this.editData.userPassword);
	  //this.formateurForm.controls['specialite'].setValue(this.editData.specialite);
	  this.formateurForm.controls['userConfirmPassword'].setValue(this.editData.userConfirmPassword);
	  this.formateurForm.controls['phone'].setValue(this.editData.phone);
    }

    }


    //get f() { return this.registerForm.controls; }

    sideBarToggler() {
      this.sideBarOpen = !this.sideBarOpen;
    }
    toggleSidebar() {
      this.toggleSidebarForMe.emit();
    }
    // //  * save in userDao
    // saveFormatter(){
    //   this.formatterService.createFormatter(this.formatter).subscribe( data =>{
    //     console.log(data);
    //     this.goToFormatterList();
    //   },
    //   error => console.log(error));
    // }
    // //  * save in formatterDao
    // saveFormatterr(){
    //   //const formData = new FormData();

    //   //this.formatter = this.formatterService.formData.value;
    //   //formData.append('formatter', JSON.stringify(this.formatter));
    //   //formData.append('file', this.userFile);
    //   this.formatterService.createFormatterr(this.formatter).subscribe( data =>{

    //     console.log(data);
    //     this.goToFormatterList();
    //   },
    //   error => console.log(error));
    // }

    // goToFormatterList(){
    //   this.router.navigate(['/admin/formatter-list']);
    // }
    // // get f() {
    // //   return this.createForm.controls;
    // // }

    // onSubmit(){
    //   CustomValidators.mustMatch('userPassword', 'userConfirmPassword')
    //   this.submitted = true;
    //   console.log(this.formatter);

    //   this.saveFormatter();
    //   this.saveFormatterr();

    // }

    addFormatter() {
      if(!this.editData){
        if(this.formateurForm.valid){
          this.formatterService.createFormatter(this.formateurForm.value).subscribe
          ({next:(res)=>{alert("Formateur ajouté avec succès");
            this.formateurForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("erreur lors de l'ajout du formateur")
          }
          })
        }
      }else{
        this.updateFormateur();
      }

    }
	addFormatterr() {
      if(!this.editData){
        if(this.formateurForm.valid){
          this.formatterService.createFormatterr(this.formateurForm.value).subscribe
          ({next:(res)=>{
            this.formateurForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            console.log("erreur on ajoutant le formateur")
          }
          })
        }
      }else{
        this.updateFormateur();
      }

    }

    updateFormateur(){
      this.formatterService.updateFormatter(this.editData.id,this.formateurForm.value).subscribe({
        next:(res)=>{
          alert("Formateur mis à jour avec succès");
          this.formateurForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Erreur lors de la mise à jour du formateur")
        }
      })

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
