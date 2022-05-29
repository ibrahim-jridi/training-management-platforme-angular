import { CreateGuestComponent } from './../_guest/create-guest/create-guest.component';
import { GuestService } from './../_services/guest.service';
import { FormationService } from './../_services/formation.service';
import { Formation } from './../_classes/formation';
import { UserService } from './../_services/user.service';
import { Router } from '@angular/router';
import { UserAuthService } from './../_services/user-auth.service';
import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  formations: Formation[];
  id;
  formation={};
  successMessage;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  constructor(private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private formationService: FormationService,
    private guestService: GuestService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getFormations();
   // this.isLoggedIn();
    this.id =  localStorage.getItem('id');
  }
  private getFormations(){
    this.formationService.getFormations().subscribe(data => {
      this.formations = data;
    });
  }
  // public isLoggedIn() {
  //   return this.userAuthService.isLoggedIn();
  // }

  // public logout() {
  //   this.userAuthService.clear();
  //   this.router.navigate(['/login']);
  // }
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
  openDialog() {
    this.dialog.open(CreateGuestComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getFormations();
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }


}
