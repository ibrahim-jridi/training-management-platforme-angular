import { Formatter } from './../_classes/formatter';
import { FormatterService } from './../_services/formatter.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-update-formatter',
  templateUrl: './update-formatter.component.html',
  styleUrls: ['./update-formatter.component.scss']
})
export class UpdateFormatterComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;

  id: number;
  formatter: Formatter = new Formatter();
  constructor(private formatterService: FormatterService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.formatterService.getFormatterById(this.id).subscribe(data => {
      this.formatter = data;
    }, error => console.log(error));
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  onSubmit(){
    this.formatterService.updateFormatter(this.id, this.formatter).subscribe( data =>{
      this.goToFormatterList();
    }
    , error => console.log(error));
  }

  goToFormatterList(){
    this.router.navigate(['admin/formatter-list']);
  }

}
