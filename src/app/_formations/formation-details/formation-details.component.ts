import { GuestService } from './../../_services/guest.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateGuestComponent } from './../../_guest/create-guest/create-guest.component';
import { FormatterService } from './../../_services/formatter.service';
import { ThemeService } from './../../_services/theme.service';
import { Formatter } from './../../_classes/formatter';
import { Theme } from './../../_classes/theme';
import { FormControl } from '@angular/forms';
import { FormationService } from './../../_services/formation.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  successMessage;
  Themes = new FormControl();
  themes:Theme[]
  Formatters = new FormControl();
  formatters:Formatter[];
  id: number
  formation: Formation
  constructor(private route: ActivatedRoute, private themeService:ThemeService,
    private dialog: MatDialog,
    private formatterService:FormatterService,private formationService: FormationService,
    private guestService:GuestService,
    private router: Router) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];

    // this.formation = new Formation();
    // this.formationService.getFormationById(this.id).subscribe( data => {
    //   this.formation = data;
    // });

    this.route.paramMap.subscribe(()=> {
      this.getFormationList();
      this.getThemes();
      this.getFormatter();
  });
  }
  getFormationList(){
    const id: any = this.route.snapshot.paramMap.get('id');
    this.formationService.getFormationById(id).subscribe(
      data => {
            this.formation = data;
      });
  }
  onSave(){
    this.guestService.registerInFormation(this.id,this.formation).subscribe(
      result => {
        this.router.navigateByUrl("/home");
      },
      error => {
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }
  openDialog(id: number) {
    this.dialog.open(CreateGuestComponent, {
      width:'30%',
      height:'50%',
    }),console.log(id)
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
