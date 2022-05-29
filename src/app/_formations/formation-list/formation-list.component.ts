import { ThemeService } from './../../_services/theme.service';
import { FormatterService } from './../../_services/formatter.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Theme } from './../../_classes/theme';
import { Formatter } from './../../_classes/formatter';
import { CreateFormationComponent } from './../create-formation/create-formation.component';
import { Router } from '@angular/router';
import { FormationService } from './../../_services/formation.service';
import { Formation } from './../../_classes/formation';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent implements OnInit {


  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  formations: Formation[];
  formatter: Formatter[];
  theme: Theme[] ;
  displayedColumns  = ['name','description','prix','lien','date de debut','date de fin','theme','formateur','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   // ? smart-table configuration
  //  settings = {

  //   columns: {
  //     name: {
  //       title: 'Nom',
  //       width: '15%'
  //     },
  //     description: {
  //       title: 'Description',
  //       width: '15%'
  //     },
  //     theme: {
  //       title: 'Thème',
  //       width: '15%'
  //     },
  //     lien: {
  //       title: 'Lien',
  //       width: '15%'
  //     },
  //     formatter: {
  //       title: 'Formateur',
  //       width: '15%'
  //     },

  //   },
  //   actions: {
  //     add:false,
  //     edit: false,
  //     delete: false,
  //     custom: [
  //       { name: 'updateFormation', title: '<i class ="fa-solid fa-pen"></i>' },
  //       {name:'deleteFormation',title:'<i class="fa-solid fa-trash-can" ></i>'},
  //       {name:'formationDetails',title:'<i class="fa-solid fa-eye" ></i>'}
  //     ],
  //     position: 'right',
  //     width:'25%'
  //   }

  // };

  constructor(private formationService: FormationService,
    private router: Router,private dialog: MatDialog,
    private formatterService:FormatterService,
    private themeService:ThemeService) { }

  ngOnInit(): void {
    this.getFormations();
    this.formatterService.getFormatterList().subscribe( data => { this.formatter = data;});
    this.themeService.getThemesList().subscribe(  data => { this.theme = data; });

  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  private getFormations(){
    this.formationService.getFormationsList().subscribe(data => {
      this.formations = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // onCustomAction(event) {
  //   switch ( event.action) {
  //     case 'updateFormation':
  //       this.updateFormation(event.data);
  //       break;
  //     case 'deleteFormation':
  //       this.deleteFormation(event.data);
  //       break;
  //     case 'formationDetails':
  //       this.formationDetails(event.data);
  //   }
  // }
  openDialog() {
    this.dialog.open(CreateFormationComponent, {
      width:'30%',
      height:'60%'
    }).afterClosed().subscribe(val=>{
      if(val === 'Ajouter'){
        this.getFormations();
      }
    })
  }
  // formationDetails(event){
  //   for (const formation of this.formations) {
  //     this.router.navigate(['admin/formation-details', formation.id]);
  //   }

  // }

  // updateFormation(event){
  //   for (const formation of this.formations) {
  //     this.router.navigate(['admin/update-formation', formation.id]);
  //   }

  // }

  // deleteFormation(event){
  //   for (const formation of this.formations) {
  //     this.formationService.deleteFormation(formation.id).subscribe( data => {
  //       console.log(data);
  //       this.getFormations();
  //     })
  //   }

  // }
  // formationDetails(id:number){

  //     this.router.navigate(['admin/formation-details', id]);


  // }

  // updateFormation(id:number){

  //     this.router.navigate(['admin/update-formation', id]);


  // }
  updateFormation(row : any){
    this.dialog.open(CreateFormationComponent, {
      width:'30%',
      height:'60%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'Modifier'){
        this.getFormations();
      }
    });
  }
  


  deleteFormation(id:number){


      this.formationService.deleteFormation(id)
      .subscribe({
        next:(res)=>{
          alert("formation supprimé avec succès");
          this.getFormations();
        },
        error:()=>{
          alert("Erreur lors de la suppression du formation");
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



}
