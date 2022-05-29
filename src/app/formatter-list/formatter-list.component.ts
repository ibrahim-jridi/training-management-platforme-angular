import { CreateFormatterComponent } from './../create-formatter/create-formatter.component';
import { UpdateFormatterComponent } from './../update-formatter/update-formatter.component';
import { UserAuthService } from './../_services/user-auth.service';
import { FormatterService } from './../_services/formatter.service';
import { Formatter } from './../_classes/formatter';
import { Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-formatter-list',
  templateUrl: './formatter-list.component.html',
  styleUrls: ['./formatter-list.component.scss']
})
export class FormatterListComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  displayedColumns:String[]  = ['email','userFirstName','userLastName','userName','phone','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  formatters: Formatter[];

  // ? smart-table configuration
//   settings = {

//   columns: {
//     userName: {
//       title: 'Pseudo',
//       width: '15%'
//     },
//     userFirstName: {
//       title: 'Nom',
//       width: '15%'
//     },
//     userLastName: {
//       title: 'prénom',
//       width: '15%'
//     },
//     email: {
//       title: 'Email',
//       width: '15%'
//     },
// 	phone: {
//       title: 'Téléphone',
//       width: '15%'
//     },

//   },
//   actions: {
// 	  add:false,
//     edit: false,
//     delete: false,
//     custom: [
//       { name: 'updateFormatter', title: '<i class ="fa-solid fa-pen" ></i>' },
//       {name:'deleteFormatter',title:'<i class="fa-solid fa-trash-can"  ></i>'},
//       {name:'formatterDetails',title:'<i class="fa-solid fa-eye" ></i>'}

//     ],
//     position: 'right',
// 	    width: '40%'
//   }

// };

  constructor(private formatterService: FormatterService,
    private router: Router,
    private userAuthService: UserAuthService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getFormatter();

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

//   private getFormatter(){
//     this.formatterService.getFormatterList().subscribe(data => {
//         this.formatters = data;
//     },
//     (error) => {
//       console.log(error);
//     }
//     );
//   }

//   onCustomAction(event) {
//       switch ( event.action) {
//         case 'updateFormatter':
//           this.updateFormatter(event.data);
//           break;
//         case 'deleteFormatter':
//           this.deleteFormatter(event.data);
//           break;
//           case 'formatterDetails':
//           this.formatterDetails(event.data);
//       }
//     }


//  formatterDetails(event){
//    for (const formatter of this.formatters) {
//     this.router.navigate(['admin/formatter-details', formatter.id]);

//    }
//   }

//   updateFormatter(event){
//     for (const formatter of this.formatters) {
//       this.router.navigate(['admin/update-formatter',  formatter.id]);

//     }


//   }

//   deleteFormatter(event){


//       this.formatterService.deleteFormatter(event.data.id).subscribe( data => {
//       console.log(data);
//       this.getFormatter();

//     })



//   }
openDialog() {
  this.dialog.open(CreateFormatterComponent, {
    width:'30%',
    height:'60%',
  }).afterClosed().subscribe(val=>{
    if(val === 'save'){
      this.getFormatter();
    }
  })
}


deleteFormateur(id: number){
  this.formatterService.deleteFormatter(id)
  .subscribe({
    next:(res)=>{
      alert("Formateur supprimé avec succès");
      this.getFormatter();
    },
    error:()=>{
      alert("Erreur lors de la suppression du formateur");
    }
  })
}

public getFormatter(){
  this.formatterService.getFormatterList().subscribe({next:(res)=>{
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  },
  error:(err)=>{alert("Erreur lors de la récupération des formateurs")}
})
}
editFormateur(row : any){
  this.dialog.open(CreateFormatterComponent, {
    width:'30%',
    height:'60%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val === 'Modifier'){
      this.getFormatter();
    }
  });
}
updateFormatter(event){

      this.router.navigate(['admin/update-formatter', event.id]);


  }
/* updateFormatter(row:any){
     for (const formatter of this.formatters) {
      this.router.navigate(['admin/update-formatter',  formatter.id]);

    }


  }*/
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
