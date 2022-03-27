import { Theme } from './../../_classes/theme';
import { ThemeService } from './../../_services/theme.service';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.scss']
})
export class CreateThemeComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  theme: Theme = new Theme();
  constructor(private themeService: ThemeService,
    private router: Router) { }

  ngOnInit(): void {
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  saveTheme(){
    this.themeService.createTheme(this.theme).subscribe( data =>{
      console.log(data);
      this.goToThemeList();
    },
    error => console.log(error));
  }

  goToThemeList(){
    this.router.navigate(['admin/theme-list']);
  }

  onSubmit(){
    console.log(this.theme);
    this.saveTheme();
  }
}
