import { UserAuthService } from './../_services/user-auth.service';
import { FormatterService } from './../_services/formatter.service';
import { Formatter } from './../_classes/formatter';
import { Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-formatter-list',
  templateUrl: './formatter-list.component.html',
  styleUrls: ['./formatter-list.component.scss']
})
export class FormatterListComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;

  formatters: Formatter[];

  // ? smart-table configuration
  settings = {

  columns: {
    userName: {
      title: 'Pseudo',
      width: '15%'
    },
    userFirstName: {
      title: 'Nom',
      width: '15%'
    },
    userLastName: {
      title: 'prénom',
      width: '15%'
    },
    email: {
      title: 'Email',
      width: '15%'
    },
	phone: {
      title: 'Téléphone',
      width: '15%'
    },

  },
  actions: {
	  add:false,
    edit: false,
    delete: false,
    custom: [
      { name: 'updateFormatter', title: '<i class ="fa-solid fa-pen" ></i>' },
      {name:'deleteFormatter',title:'<i class="fa-solid fa-trash-can"  ></i>'},
      {name:'formatterDetails',title:'<i class="fa-solid fa-eye" ></i>'}

    ],
    position: 'right',
	    width: '30%'
  }

};

  constructor(private formatterService: FormatterService,
    private router: Router,
    private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.getFormatter();

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  private getFormatter(){
    this.formatterService.getFormatterList().subscribe(data => {
        this.formatters = data;
    },
    (error) => {
      console.log(error);
    }
    );
  }

  onCustomAction(event) {
      switch ( event.action) {
        case 'updateFormatter':
          this.updateFormatter(event.data);
          break;
        case 'deleteFormatter':
          this.deleteFormatter(event.data);
          break;
          case 'formatterDetails':
          this.formatterDetails(event.data);
      }
    }


 formatterDetails(event){
   for (const formatter of this.formatters) {
    this.router.navigate(['admin/formatter-details', formatter.id]);

   }
  }

  updateFormatter(event){
    for (const formatter of this.formatters) {
      this.router.navigate(['admin/update-formatter',  formatter.id]);

    }


  }

  deleteFormatter(event){

	  for (const formatter of this.formatters) {
      this.formatterService.deleteFormatter(formatter.id).subscribe( data => {
      console.log(data);
      this.getFormatter();

    })

    }

  }

}
