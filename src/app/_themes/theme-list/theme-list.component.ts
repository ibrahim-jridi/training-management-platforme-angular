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
      {name:'deleteTheme',title:'<i class="fa-solid fa-trash-can" ></i>'},
      {name:'themeDetails',title:'<i class="fa-solid fa-eye" ></i>'}
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

  onCustomAction(event) {
    switch ( event.action) {
      case 'updateTheme':
        this.updateTheme(event.data);
        break;
      case 'deleteTheme':
        this.deleteTheme(event.data);
        break;
      case 'themeDetails':
        this.themeDetails(event.data);
    }
  }

  themeDetails(event){
    for (const theme of this.themes) {
      this.router.navigate(['admin/theme-details', theme.id]);
    }

  }

  updateTheme(event){
    for (const theme of this.themes) {
      this.router.navigate(['admin/update-theme', theme.id]);
    }

  }

  deleteTheme(event){
    for (const theme of this.themes) {
      this.themeService.deleteTheme(theme.id).subscribe( data => {
        console.log(data);
        this.getThemes();
      })
     }

  }

}
