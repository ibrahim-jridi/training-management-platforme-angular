import { Theme } from './../../_classes/theme';
import { ThemeService } from './../../_services/theme.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  themes: Theme[];
    // ? smart-table configuration
  settings = {

  columns: {
    name: {
      title: 'Titre'
    },
    description: {
      title: 'Description'
    },


  },
  actions: {
	  add:false,
    edit: false,
    delete: false,
    custom: [
      { name: 'updateTheme', title: '<i class ="fa-solid fa-pen"></i>' },
      {name:'deleteTheme',title:'<i class="fa-solid fa-trash-can" ></i>'}
    ],
    position: 'right'
  }

};

  constructor(private themeService: ThemeService,
    private router: Router) { }

  ngOnInit(): void {
    this.getThemes();
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  private getThemes(){
    this.themeService.getThemesList().subscribe(data => {
      this.themes = data;
    });
  }

  themeDetails(id: number){
    this.router.navigate(['admin/theme-details', id]);
  }

  updateTheme(id: number){
    this.router.navigate(['admin/update-theme', id]);
  }

  deleteTheme(id: number){
    this.themeService.deleteTheme(id).subscribe( data => {
      console.log(data);
      this.getThemes();
    })
  }

}
