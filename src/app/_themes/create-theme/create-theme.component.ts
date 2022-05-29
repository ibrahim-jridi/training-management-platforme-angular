import { Theme } from './../../_classes/theme';
import { ThemeService } from './../../_services/theme.service';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.scss']
})
export class CreateThemeComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  theme: Theme = new Theme();
  actionBtn : String = "Ajouter"
  themeForm!: FormGroup;

  constructor(private themeService: ThemeService,
    private router: Router,
    private formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public editData: any,
      private dialogRef: MatDialogRef<CreateThemeComponent>) { }

  ngOnInit(): void {
    this.themeForm = this.formBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],

    });

    if(this.editData){
      this.actionBtn = "Modifier";
      this.themeForm.controls['name'].setValue(this.editData.name);
      this.themeForm.controls['description'].setValue(this.editData.description);


    }
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  addTheme() {
      if(!this.editData){
        if(this.themeForm.valid){
          this.themeService.createTheme(this.themeForm.value).subscribe
          ({next:(res)=>{alert("Thème ajouté avec succès");
            this.themeForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("erreur lors de l'ajout du formateur")
          }
          })
        }
      }else{
        this.updateTheme();
      }
      /* setTimeout(() => {
        window.location.reload();
      }, 1000); */
    }

    updateTheme(){
      this.themeService.updateTheme(this.editData.id,this.themeForm.value).subscribe({
        next:(res)=>{
          alert("thème mis à jour avec succès");
          this.themeForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Erreur lors de la mise à jour du formateur")
        }
      })
      /* setTimeout(() => {
        window.location.reload();
      }, 1000); */
    }

  // saveTheme(){
  //   this.themeService.createTheme(this.theme).subscribe( data =>{
  //     console.log(data);
  //     this.goToThemeList();
  //   },
  //   error => console.log(error));
  // }

  // goToThemeList(){
  //   this.router.navigate(['admin/theme-list']);
  // }

  // onSubmit(){
  //   console.log(this.theme);
  //   this.saveTheme();
  // }
}
