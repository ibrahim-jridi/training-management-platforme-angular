import { FormatterService } from './../../_services/formatter.service';
import { ThemeService } from './../../_services/theme.service';
import { Formatter } from './../../_classes/formatter';
import { Theme } from './../../_classes/theme';
import { FormControl } from '@angular/forms';
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


  Themes = new FormControl();
  themes:Theme[]
  Formatters = new FormControl();
  formatters:Formatter[];
  id: number
  formation: Formation
  constructor(private route: ActivatedRoute, private themeService:ThemeService,
    private formatterService:FormatterService,private formationService: FormationService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.formation = new Formation();
    this.formationService.getFormationById(this.id).subscribe( data => {
      this.formation = data;
    });
    this.getThemes();
    this.getFormatter();
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
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
