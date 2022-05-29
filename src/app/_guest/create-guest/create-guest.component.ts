import { Formation } from './../../_classes/formation';
import { FormationService } from './../../_services/formation.service';
import { Router } from '@angular/router';
import { GuestService } from './../../_services/guest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Guest } from './../../_classes/guest';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-guest',
  templateUrl: './create-guest.component.html',
  styleUrls: ['./create-guest.component.css']
})
export class CreateGuestComponent implements OnInit {
id!:number
  guest: Guest = new Guest();
  formations: Formation[] = [];
  submitted = false;
  actionBtn : String = "Ajouter"
  guestForm!: FormGroup;
    constructor(private guestService: GuestService,
      private router: Router,
      private formationService:FormationService,
      private formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public editData: any,
      private dialogRef: MatDialogRef<CreateGuestComponent>) { }

  ngOnInit(): void {
    this.guestForm = this.formBuilder.group({
      email:['',Validators.required],
      userFirstName:['',Validators.required],
      userLastName:['',Validators.required],
      userName:['',Validators.required],
      userPassword:['',Validators.required],
	  userConfirmPassword:['',Validators.required],
	  phone:['',Validators.required],
    });


    this.formationService.getFormationsList().subscribe({next:(res)=>{this.formations = res}});
  }
  addGuest() {

      if(this.guestForm.valid){
        this.guestService.createGuest(this.guestForm.value).subscribe
        ({next:(res)=>{alert("utilisateur ajouté avec succès");
          this.guestForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("erreur lors de l'ajout du utilisateur")
        }
        })
      }
    
  }
  addParticipant() {
    if(this.guestForm.valid){
      let guest=new Guest();
      guest.email=this.guestForm.get('email')?.value;
      guest.userFirstName=this.guestForm.get('userFirstName')?.value;
      guest.userLastName=this.guestForm.get('userLastName')?.value;
      guest.userName=this.guestForm.get('userName')?.value;
      guest.phone=this.guestForm.get('phone')?.value;
      guest.adresse=this.guestForm.get('adresse')?.value;


      console.log("test : "+ guest.formations);

      let format =new Formation();
      format.id=this.guestForm.get('formation.id')?.value;
      guest.formations.id=format.id;

      console.log("id : "+ guest.formations)
      console.log('this.formationForm.value  ***'+guest)

      this.guestService.registerInFormation(guest.id,guest.formations.id).subscribe
      ({next:(res)=>{alert("Participant ajouté avec succès");
        this.guestForm.reset();
        this.dialogRef.close('Ajouter');
      },
      error:()=>{
        alert("erreur lors de l'ajout du participant")
      }
      })
    }
}
  updateGuest(){
    this.guestService.updateGuest(this.editData.id,this.guestForm.value).subscribe({
      next:(res)=>{
        alert("utilisateur mis à jour avec succès");
        this.guestForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Erreur lors de la mise à jour du utilisateur")
      }
    })
  }

}
