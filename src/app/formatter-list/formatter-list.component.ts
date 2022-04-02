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
      title: 'Pseudo'
    },
    userFirstName: {
      title: 'Nom'
    },
    userLastName: {
      title: 'prénom'
    },
    email: {
      title: 'Email'
    },
	phone: {
      title: 'Téléphone'
    },

  },
  actions: {
	  add:false,
    edit: false,
    delete: false,
    custom: [
      { name: 'updateFormatter', title: '<i class ="fa-solid fa-pen"></i>' },
      {name:'deleteFormatter',title:'<i class="fa-solid fa-trash-can" ></i>'}
      
    ],
    position: 'right'
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


 formatterDetails(id : number){
   for (const formatter of this.formatters) {
    this.router.navigate(['admin/formatter-details', formatter.id]);

   }
  }

  updateFormatter(id : number){
    for (const formatter of this.formatters) {
      this.router.navigate(['admin/update-formatter',  formatter.id]);

    }


  }

  deleteFormatter(id: number){
	  
	  for (const formatter of this.formatters) {
      this.formatterService.deleteFormatter(formatter.id).subscribe( data => {
      console.log(data);
      this.getFormatter();

    })

    }
    
  }

}
