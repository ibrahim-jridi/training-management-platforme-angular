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

  formationDetails(id: number){
    this.router.navigate(['admin/formation-details', id]);
  }

  updateFormation(id: number){
    this.router.navigate(['admin/update-formation', id]);
  }

  deleteFormation(id: number){
    this.formationService.deleteFormation(id).subscribe( data => {
      console.log(data);
      this.getFormations();
    })
  }

}
