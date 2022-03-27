import { Formatter } from './../_classes/formatter';
import { FormatterService } from './../_services/formatter.service';
import { UserService } from './../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-formatter-details',
  templateUrl: './formatter-details.component.html',
  styleUrls: ['./formatter-details.component.scss']
})
export class FormatterDetailsComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;

  id: number
  formatter: Formatter
  constructor(private route: ActivatedRoute, private formatterService: FormatterService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.formatter = new Formatter();
    this.formatterService.getFormatterById(this.id).subscribe( data => {
      this.formatter = data;
    });
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

}
