import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormatterService } from './../../_services/formatter.service';
import { Formatter } from './../../_classes/formatter';
import { ThemeService } from './../../_services/theme.service';
import { Theme } from './../../_classes/theme';
import { FormationService } from './../../_services/formation.service';
import { Router } from '@angular/router';
import { Formation } from './../../_classes/formation';
import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.scss']
})
export class CreateFormationComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();


  sideBarOpen = true;
  id;
  // //formation: Formation = new Formation();
  Themes :string = "";
  themes:Theme[] = [] ;
  Formatters : string ="";
formatters:Formatter[] = [] ;
  formationForm!: FormGroup;
  actionBtn : String = "Ajouter";
  themeSelectedValue: string ="";
  formateurSelectedValue: string ="";
  public formation!: Formation[];
  allUsers: any;

  constructor(private formationService: FormationService, private themeService:ThemeService,
    private formatterService:FormatterService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public editData: any,private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateFormationComponent>) { }



  ngOnInit(): void {
    this.formationForm = this.formBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
      lien:['',Validators.required],
      prix:['',Validators.required],
      theme:['',Validators.required],
      formatter:['',Validators.required],

      date_final:['',Validators.required],
      date_debut:['',Validators.required],

    });
    if(this.editData){
      this.actionBtn = "Modifier";
      this.formationForm.controls['name'].setValue(this.editData.name);
      this.formationForm.controls['description'].setValue(this.editData.description);
      this.formationForm.controls['lien'].setValue(this.editData.lien);
      this.formationForm.controls['prix'].setValue(this.editData.prix);
      this.formationForm.controls['formatter'].setValue(this.editData.formatter);
      this.formationForm.controls['theme'].setValue(this.editData.theme);

      this.formationForm.controls['date_debut'].setValue(this.editData.date_debut);
      this.formationForm.controls['date_final'].setValue(this.editData.date_final);


    }

     this.getThemes();
     this.getFormatter();
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  //  * get selected formatter id
  selectedFormatter(formatter){
    console.log(formatter.id+" "+formatter.userName);
    const targetIndex = formatter.target;
    const res = targetIndex.options[targetIndex.selectedIndex].dataset.formid;
    console.log(res);
    return Number(res);
    //here u can access client id and client name and you can do any operations required
 }
 //* get selected theme id
 selectedTheme(theme){
  console.log(theme.id+" "+theme.titre);
  const targetIndex = theme.target;
    const res = targetIndex.options[targetIndex.selectedIndex].dataset.themeid;
    console.log(res);
  return Number(res);

//   //here u can access client id and client name and you can do any operations required
}

addFormation() {
  if(!this.editData){
    if(this.formationForm.valid){
      let fortRequest=new Formation();
      fortRequest.date_debut=this.formationForm.get('date_debut')?.value;
      fortRequest.date_final=this.formationForm.get('date_final')?.value;
      fortRequest.name=this.formationForm.get('name')?.value;
      fortRequest.prix=this.formationForm.get('prix')?.value;
      fortRequest.description=this.formationForm.get('description')?.value;
       let them=new Theme();
       them.id=this.formationForm.get('theme')?.value;
       them.name=this.formationForm.get('theme')?.value;
      fortRequest.theme=them;
       let format =new Formatter();
       format.id=this.formationForm.get('formatter')?.value;
       fortRequest.formatter=format;
     console.log('this.formationForm.value  ***'+fortRequest)
      this.formationService.createFormation(fortRequest).subscribe
      ({next:(res)=>{alert("Formation ajouté avec succès");
        this.formationForm.reset();
        this.dialogRef.close('Ajouter');
      },
      error:()=>{
        alert("erreur lors de l'ajout du formation")
      }
      })
    }
  }else{
    this.updateFormation();
  }
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

public updateFormation(){
  this.formationService.updateFormation(this.editData.id,this.formationForm.value).subscribe({
    next:(res)=>{
      alert("Formation mis à jour avec succès");
      this.formationForm.reset();
      this.dialogRef.close('update');
    },
    error:()=>{
      alert("Erreur lors de la mise à jour du formation")
    }
  })
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

  // saveFormation(){
  //   this.formationService.createFormation(this.formation).subscribe( data =>{
  //     console.log(data);

  //     this.goToFormationList();
  //   },
  //   error => console.log(error));
  // }




  // goToFormationList(){
  //   this.router.navigate(['admin/formation-list']);
  // }

  // onSubmit(){
  //   console.log(this.formation);
  //   this.saveFormation();
  // }
   getThemes(){
    this.themeService.getThemesList().subscribe(data => {
      this.themes = data;
    });
  }
   getFormatter(){
    this.formatterService.getFormatterList().subscribe(data => {
      this.formatters = data;
    });
  }

}
