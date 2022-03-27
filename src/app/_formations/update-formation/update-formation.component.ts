import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from './../../_services/formation.service';
import { Formation } from './../../_classes/formation';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.scss']
})
export class UpdateFormationComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  id: number;
  formation: Formation = new Formation();
  constructor(private formationService: FormationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.formationService.getFormationById(this.id).subscribe(data => {
      this.formation = data;
    }, error => console.log(error));
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  onSubmit(){
    this.formationService.updateFormation(this.id, this.formation).subscribe( data =>{
      this.goToFormationList();
    }
    , error => console.log(error));
  }

  goToFormationList(){
    this.router.navigate(['admin/formation-list']);
  }

}
