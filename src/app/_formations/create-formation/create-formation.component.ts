import { FormatterService } from './../../_services/formatter.service';
import { Formatter } from './../../_classes/formatter';
import { ThemeService } from './../../_services/theme.service';
import { Theme } from './../../_classes/theme';
import { FormationService } from './../../_services/formation.service';
import { Router } from '@angular/router';
import { Formation } from './../../_classes/formation';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.scss']
})
export class CreateFormationComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();


  sideBarOpen = true;
  id;
  formation: Formation = new Formation();
  Themes :string = "";
  themes:Theme[] ;
  Formatters : string ="";
  formatters:Formatter[] ;



  constructor(private formationService: FormationService, private themeService:ThemeService,
    private formatterService:FormatterService, private router: Router) { }



  ngOnInit(): void {
    this.getThemes();
    this.getFormatter();
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  //  * get selected formatter id
  selectedFormatter(formatter){
    console.log(formatter.id+" "+formatter.name);
    const targetIndex = formatter.target;
    const res = targetIndex.options[targetIndex.selectedIndex].dataset.formid;
    console.log(res);
    return res;
    //here u can access client id and client name and you can do any operations required
 }
 // * get selected theme id
 selectedTheme(theme){
  console.log(theme.id+" "+theme.name);
  const targetIndex = theme.target;
    const res = targetIndex.options[targetIndex.selectedIndex].dataset.themeid;
    console.log(res);
  return res;

  //here u can access client id and client name and you can do any operations required
}


//idTheme:number=this.selectedTheme(this.themes);

//idFormatter=this.selectedFormatter(this.formatters);
idFormatter;idTheme;


  saveFormation(){
    this.formationService.createFormation(this.formation,this.idFormatter,this.idTheme).subscribe( data =>{
      console.log(data);
      this.goToFormationList();
    },
    error => console.log(error));
  }




  goToFormationList(){
    this.router.navigate(['admin/formation-list']);
  }

  onSubmit(){
    console.log(this.formation);
    this.saveFormation();
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
