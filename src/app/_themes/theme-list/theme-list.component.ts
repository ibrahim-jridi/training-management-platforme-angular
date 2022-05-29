import { CreateThemeComponent } from './../create-theme/create-theme.component';
import { Theme } from './../../_classes/theme';
import { ThemeService } from './../../_services/theme.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  themes: Theme[];
  displayedColumns:String[]  = ['name','description','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
    // ? smart-table configuration
//   settings = {

//   columns: {
//     name: {
//       title: 'Titre'
//     },
//     description: {
//       title: 'Description'
//     },


//   },
//   actions: {
// 	  add:false,
//     edit: false,
//     delete: false,
//     custom: [
//       { name: 'updateTheme', title: '<i class ="fa-solid fa-pen"></i>' },
//       {name:'deleteTheme',title:'<i class="fa-solid fa-trash-can" ></i>'},
//       {name:'themeDetails',title:'<i class="fa-solid fa-eye" ></i>'}
//     ],
//     position: 'right'
//   }

// };

  constructor(private themeService: ThemeService,
    private router: Router,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
     this.getThemes();
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  openDialog() {
    this.dialog.open(CreateThemeComponent, {
      width:'30%',
	  height:'40%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getThemes();
      }
    })
  }

  public getThemes(){
    this.themeService.getThemesList().subscribe({next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error:(err)=>{alert("Erreur lors de la récupération des thèmes")}
  })
  }
  deleteTheme(id: number){
    this.themeService.deleteTheme(id)
    .subscribe({
      next:(res)=>{
        alert("thème supprimé avec succès");
        this.getThemes();
      },
      error:()=>{
        alert("Erreur lors de la suppression du thème");
      }
    })
  }
  editTheme(row : any){
    this.dialog.open(CreateThemeComponent, {
      width:'30%',
	  height:'40%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'Modifier'){
        this.getThemes();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // onCustomAction(event) {
  //   switch ( event.action) {
  //     case 'updateTheme':
  //       this.updateTheme(event.data);
  //       break;
  //     case 'deleteTheme':
  //       this.deleteTheme(event.data);
  //       break;
  //     case 'themeDetails':
  //       this.themeDetails(event.data);
  //   }
  // }

  // themeDetails(event){
  //   for (const theme of this.themes) {
  //     this.router.navigate(['admin/theme-details', theme.id]);
  //   }

  // }

  updateTheme(event){

      this.router.navigate(['admin/update-theme', event.id]);


  }


  // deleteTheme(event){
  //   for (const theme of this.themes) {
  //     this.themeService.deleteTheme(theme.id).subscribe( data => {
  //       console.log(data);
  //       this.getThemes();
  //     })
  //    }

  // }

}
