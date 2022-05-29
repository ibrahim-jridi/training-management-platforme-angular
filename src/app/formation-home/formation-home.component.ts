import { Formation } from './../_classes/formation';
import { FormationService } from './../_services/formation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formation-home',
  templateUrl: './formation-home.component.html',
  styleUrls: ['./formation-home.component.css']
})
export class FormationHomeComponent implements OnInit {
  //formation: Formation = new Formation();
  formations: Formation[] = [];
  totalLength: any;
  page: number = 1;
  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    this.formationService.getFormations().subscribe({next:(res)=>{this.formations = res;
	console.log(this.formations)}})
    this.totalLength = this.formations.length;
  }

}
