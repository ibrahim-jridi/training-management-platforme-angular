import { Theme } from './../../_classes/theme';
import { ThemeService } from './../../_services/theme.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-update-theme',
  templateUrl: './update-theme.component.html',
  styleUrls: ['./update-theme.component.scss']
})
export class UpdateThemeComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  id: number;
  theme: Theme = new Theme();
  constructor(private themeService: ThemeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.themeService.getThemeById(this.id).subscribe(data => {
      this.theme = data;
    }, error => console.log(error));
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  onSubmit(){
    this.themeService.updateTheme(this.id, this.theme).subscribe( data =>{
      this.goToThemeList();
    }
    , error => console.log(error));
  }

  goToThemeList(){
    this.router.navigate(['admin/theme-list']);
  }
}
