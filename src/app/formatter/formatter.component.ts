import { User } from './../_classes/user';
import { WebSocketServiceService } from './../_services/web-socket-service.service';
import { ChatMessageDto } from './../_classes/chat-message-dto';
import { GuestService } from './../_services/guest.service';
import { Guest } from './../_classes/guest';

import { Message } from './../_classes/message';
import { Formation } from './../_classes/formation';
import { FormationService } from './../_services/formation.service';
import { CustomValidators } from './../_classes/custom-validators';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';


import { HttpClient, HttpEventType } from '@angular/common/http';
import { Formatter } from './../_classes/formatter';
import { FormatterService } from './../_services/formatter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from './../_services/user-auth.service';
import { UserService } from './../_services/user.service';
import { Component, HostListener, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MustMatch } from '../_classes/must-much';



@Component({
  selector: 'app-formatter',
  templateUrl: './formatter.component.html',
  styleUrls: ['./formatter.component.css']
})
export class FormatterComponent implements OnInit, OnDestroy {
  message;
  userFile;
  public imagePath;
  imgURL;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  progress = 0;
  id:any;
  Formation:Formation;
  formatter: any;
  formations: Formation [];
  @Input()
  userName;
  public searchTerm !: string;
  searchKey:string ="";
  submitted = false;
  isEnabled=false;
  registerForm: FormGroup;
  //
  public filteredMessages: Array<Message> = [];
  // public newMessage: string;
  // public channel: string;
  // public receiver: string;
  // NEW_USER_LIFETIME: number = 1000 * 5;
  // @Output()
  //   receiverUpdated = new EventEmitter<string>();
  //    users: Array<Formatter> = [];

  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private guestService: GuestService,
    private router: Router,
    public formatterService: FormatterService,
    private formationService: FormationService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    public webSocketService: WebSocketServiceService
    ) {

    }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();

	this.formationService.getFormationsList().subscribe(formation => {
	this.formations = formation;})

    this.isLoggedIn();
    this.formationService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
    this.getFormatterByName()
    this.userName =  localStorage.getItem('userName');
      this.id =  localStorage.getItem('id');

}
ngOnDestroy(): void {
  this.webSocketService.closeWebSocket();
}
sendMessage(sendForm: NgForm) {
  const chatMessageDto = new ChatMessageDto(sendForm.value.user, sendForm.value.message);
  this.webSocketService.sendMessage(chatMessageDto);
  sendForm.controls.message.reset();
}
get f() { return this.registerForm.controls; }


  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

  onSubmit(){
    CustomValidators.mustMatch('userPassword', 'userConfirmPassword') // insert here
    this.submitted = true;
     const formData = new  FormData();
    const formatters = this.formatterService.formData.value;
     //formData.append('formatter', JSON.stringify(formatters));
    // formData.append('file',this.userFile);
    this.formatterService.MisFormatter(this.formatterService.formData.value.id, formData).subscribe( data =>{

      window.location.reload();

    }
    , error => console.log(error));

  }



onSelectFile(event) {
  if (event.target.files.length > 0)
  {
    const file = event.target.files[0];
    this.userFile = file;
   // this.f['profile'].setValue(file);

  var mimeType = event.target.files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();

  this.imagePath = file;
  reader.readAsDataURL(file);
  reader.onload = (_event) => {
    this.imgURL = reader.result;
  }
}


  }
  updateFormatter(id) {
    this.formatterService.updateFormatter( id,this.formatter).subscribe(formatter => {
      this.formatter = formatter;
      window.location.reload();
    })
  }
  // get formatter information for jwt token
  getFormatter() {
    this.formatterService.getFormatterById(this.id).subscribe(formatter => {
      this.formatter = formatter;
    })
  }
  //get formatter from jwt token
  getFormatterByName() {
    this.formatterService.findByFormatterName(this.formatterService.getFormatterName()).subscribe(formatter => {
      this.formatter = formatter;
      this.id = formatter.id;
      this.formationService.getFormationsList().subscribe(formation => {
		this.formations = formation;
        this.formations.forEach(element => {
          if (element.id_formatter === formatter.id) {

            return element;
          }

        });


      })

    })
  }
  // get user from jwt token

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.formationService.search.next(this.searchTerm);
  }

//calculate Period of time
timeDiff(){
  var currentDate = new Date();
  this.formatterService.findByFormatterName(this.formatterService.getFormatterName()).subscribe(formatter => {
    this.formatter = formatter;
    this.id = formatter.id;
    this.formationService.getFormationsList().subscribe(formation => {
      this.formations = formation;
      this.formations.forEach(element => {
        if (element.date_debut == currentDate) {

          this.isEnabled = true;
        }

      });


    })

  })
 }
 deleteFormation(id:number){

  this.formationService.deleteFormation(id).subscribe( data => {
    console.log(data);
    window.location.reload();
  })
 }
 
  NewTab(id:number) {
    //get formation by id
    this.formationService.getFormationById(id).subscribe(formation => {
      this.Formation = formation;
      window.open(
        `${this.Formation.lien}`, "_blank");

    })



  }
}






