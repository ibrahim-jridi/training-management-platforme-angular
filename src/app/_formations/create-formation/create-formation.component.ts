import { ThemeService } from './../../_services/theme.service';
import { Theme } from './../../_classes/theme';
import { FormationService } from './../../_services/formation.service';
import { Router } from '@angular/router';
import { Formation } from './../../_classes/formation';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.scss']
})
export class CreateFormationComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  
  sideBarOpen = true;
  formation: Formation = new Formation();
  Themes = new FormControl();
  themes:Theme[]
  constructor(private formationService: FormationService, private themeService:ThemeService,
    private router: Router) { }

  ngOnInit(): void {
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  saveFormation(){
    this.formationService.createFormation(this.formation).subscribe( data =>{
      console.log(data);
      this.goToFormationList();
    },
    error => console.log(error));
  }

  goToFormationList(){
    this.router.navigate(['admin/formation-list']);
  }

  onSubmit(){
    console.log(this.formation);
    this.saveFormation();
  }
   getThemes(){
    this.themeService.getThemesList().subscribe(data => {
      this.themes = data;
    });
  }

}
