import { Theme } from './../../_classes/theme';
import { ThemeService } from './../../_services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-theme-details',
  templateUrl: './theme-details.component.html',
  styleUrls: ['./theme-details.component.scss']
})
export class ThemeDetailsComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  id: number
  theme: Theme
  constructor(private route: ActivatedRoute, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.theme = new Theme();
    this.themeService.getThemeById(this.id).subscribe( data => {
      this.theme = data;
    });
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

}
