import { FormationService } from './../../_services/formation.service';
import { ActivatedRoute } from '@angular/router';
import { Formation } from './../../_classes/formation';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})
export class FormationDetailsComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  id: number
  formation: Formation
  constructor(private route: ActivatedRoute, private formationService: FormationService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.formation = new Formation();
    this.formationService.getFormationById(this.id).subscribe( data => {
      this.formation = data;
    });
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

}
