import { Router } from '@angular/router';
import { FormationService } from './../../_services/formation.service';
import { Formation } from './../../_classes/formation';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  formations: Formation[];
   // ? smart-table configuration
   settings = {

    columns: {
      name: {
        title: 'Nom'
      },
      description: {
        title: 'Description'
      },
      theme: {
        title: 'Thème'
      },
      lien: {
        title: 'Lien'
      },
      date_final: {
        title: 'Date_final'
      },

    },
    actions: {
      add:false,
      edit: false,
      delete: false,
      custom: [
        { name: 'updateFormation', title: '<i class ="fa-solid fa-pen"></i>' },
        {name:'deleteFormation',title:'<i class="fa-solid fa-trash-can" ></i>'},
        {name:'formationDetails',title:'<i class="fa-solid fa-eye" ></i>'},
      ],
      position: 'right'
    }

  };

  constructor(private formationService: FormationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getFormations();
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  private getFormations(){
    this.formationService.getFormationsList().subscribe(data => {
      this.formations = data;
    });
  }

  onCustomAction(event) {
    switch ( event.action) {
      case 'updateFormation':
        this.updateFormation(event.data);
        break;
     case 'deleteFormation':
        this.deleteFormation(event.data);
    }
  }

  formationDetails(event){
    for (const formation of this.formations) {
      this.router.navigate(['admin/formation-details', formation.id]);
    }

  }

  updateFormation(event){
    for (const formation of this.formations) {
      this.router.navigate(['admin/update-formation', formation.id]);
    }

  }

  deleteFormation(event){
    for (const theme of this.formations) {
      this.formationService.deleteFormation(theme.id).subscribe( data => {
        console.log(data);
        this.getFormations();
      })
    }

  }

}
