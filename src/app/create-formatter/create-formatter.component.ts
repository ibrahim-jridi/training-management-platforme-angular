import { Formatter } from './../_classes/formatter';
import { FormatterService } from './../_services/formatter.service';
import { Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-formatter',
  templateUrl: './create-formatter.component.html',
  styleUrls: ['./create-formatter.component.scss']
})
export class CreateFormatterComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;

    formatter: Formatter = new Formatter();
    constructor(private formatterService: FormatterService,
      private router: Router) { }

    ngOnInit(): void {
    }
    sideBarToggler() {
      this.sideBarOpen = !this.sideBarOpen;
    }
    toggleSidebar() {
      this.toggleSidebarForMe.emit();
    }

    saveFormatter(){
      this.formatterService.createFormatter(this.formatter).subscribe( data =>{
        console.log(data);
        this.goToFormatterList();
      },
      error => console.log(error));
    }
    saveFormatterr(){
      this.formatterService.createFormatterr(this.formatter).subscribe( data =>{
        console.log(data);
        this.goToFormatterList();
      },
      error => console.log(error));
    }

    goToFormatterList(){
      this.router.navigate(['/admin/formatter-list']);
    }

    onSubmit(){
      console.log(this.formatter);
      this.saveFormatter();
      this.saveFormatterr();
    }

}
