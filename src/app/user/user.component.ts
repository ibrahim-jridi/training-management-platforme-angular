import { User } from './../_classes/user';
import { ChatMessageDto } from './../_classes/chat-message-dto';
import { WebSocketServiceService } from './../_services/web-socket-service.service';
import { GuestService } from './../_services/guest.service';
import { CustomValidators } from './../_classes/custom-validators';
import { Formation } from './../_classes/formation';
import { Guest } from './../_classes/guest';
import { FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormationService } from './../_services/formation.service';
import { FormatterService } from './../_services/formatter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from './../_services/user-auth.service';
import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
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
  userName;
  guest: Guest = {} as Guest;
  formations:any = [];
  // public newMessage: string;
  // public channel: string;
  // public receiver: string;
  // NEW_USER_LIFETIME: number = 1000 * 5;
  // @Output()
  //   receiverUpdated = new EventEmitter<string>();
  //    users: Array<Guest> = [];
  //formations: Formation [];
  searchKey:string ="";
  submitted = false;
  message;
  public searchTerm !: string;
  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    public formatterService: FormatterService,
    private formationService: FormationService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private guestService: GuestService,
    public webSocketService: WebSocketServiceService) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
    this.forUser();
    this.isLoggedIn();

    this.getGuestById();
    this.getUserByName();
    this.userName =  localStorage.getItem('userName');
      this.id =  localStorage.getItem('id');
      this.retrieveFormation()
  }
  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(sendForm.value.user, sendForm.value.message);
    this.webSocketService.sendMessage(chatMessageDto);
    sendForm.controls.message.reset();
  }
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
    // const formData = new  FormData();
    this.guest = this.guestService.formData.value;
    // formData.append('formatter', JSON.stringify(this.formatter));
    // formData.append('file',this.userFile);
    this.guestService.updateGuest(this.id, this.guest).subscribe( data =>{

      window.location.reload();

    }
    , error => console.log(error));

  }
//get guest from jwt token
getGuestById() {
  this.guestService.retrieveGuest(this.id).subscribe(
    data => {
      this.guest = data;
    }
  )
}
getUserByName() {
  this.userService.findByUserName(this.userService.getUserName()).subscribe(guest => {
    this.guest = guest;
  })
}
// retrieve guest formation
retrieveFormation() {
  this.guestService.retreiveGuestFormations(this.id).subscribe(
    data => {
      this.formations = data;
    }
  )
}
search(event:any){
  this.searchTerm = (event.target as HTMLInputElement).value;
  console.log(this.searchTerm);
  this.formationService.search.next(this.searchTerm);
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
// delete formation
deleteFormation(id) {
  this.formationService.deleteFormation(id).subscribe(
    data => {
      this.retrieveFormation();
    }
  )
}

  forUser() {
    this.userService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
