import { environment } from './../../../environments/environment';

import { User } from './../../_classes/user';
import { CustomValidators } from './../../_classes/custom-validators';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormationService } from './../../_services/formation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from './../../_services/user-auth.service';
import { UserService } from './../../_services/user.service';
import { Formation } from './../../_classes/formation';
import { Formatter } from './../../_classes/formatter';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ad-profile',
  templateUrl: './ad-profile.component.html',
  styleUrls: ['./ad-profile.component.css']
})
export class AdProfileComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarOpen = true;
  message;
  //userFile;
  public imagePath;
  imgURL;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  progress = 0;
  id:any;
  user: User = {} as User;
  formations: Formation [];
  userName;
  public searchTerm !: string;
  searchKey:string ="";
  submitted = false;
  isEnabled=false;

  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private formationService: FormationService,
    private route: ActivatedRoute,
    private httpClient: HttpClient
    ) {

    }

  ngOnInit(): void {

    this.isLoggedIn();
    this.formationService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
    this.getUserByName()

}
sideBarToggler() {
  this.sideBarOpen = !this.sideBarOpen;
}
toggleSidebar() {
  this.toggleSidebarForMe.emit();
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
    this.userService.updateUser(this.id, this.user).subscribe( data =>{
      window.location.reload();

    }
    , error => console.log(error));

  }
  // ! called to uplaod the image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  // TODO: still under work
// ! select file
onSelectFile(event) {
  if (event.target.files.length >0) {
    const file = event.target.files[0];
    this.user.image = file;
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath=file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}

  // ! Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    this.progress = 0;
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    if (this.selectedFile != null) {
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.httpClient.post(`${environment.image}/upload`, uploadImageData, { observe: 'events', reportProgress: true })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress )
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = event.body.toString();
            console.log(this.message);
          }
        });
    }
   // uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post(`${environment.image}/upload`, uploadImageData, { observe: 'response' , reportProgress: true })
      .subscribe((response) => {
        if (response.status === 200 ) {
          this.message = 'Image chargé avec succssé';
        } else {
          this.message = 'Image n"est pas chargé';
        }
      }
      );


  }

    // ! Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get(`${environment.image}/get/` + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  updateUser(id) {
    this.userService.updateUser( id,this.user).subscribe(user => {
      this.user = user;
      window.location.reload();
    })
  }
  // get formatter information for jwt token
  getFormatter() {
    this.userService.getUserById(this.id).subscribe(user => {
      this.user = user;
    })
  }
  //get formatter from jwt token
  getUserByName() {
    this.userService.findByUserName(this.userService.getUserName()).subscribe(user => {
      this.user = user;
      this.id = user.id;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.formationService.search.next(this.searchTerm);
  }

}
