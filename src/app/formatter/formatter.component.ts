import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

import { HttpClient, HttpEventType } from '@angular/common/http';
import { Formatter } from './../_classes/formatter';
import { FormatterService } from './../_services/formatter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from './../_services/user-auth.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formatter',
  templateUrl: './formatter.component.html',
  styleUrls: ['./formatter.component.css']
})
export class FormatterComponent implements OnInit {
  message;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  progress = 0;
  

  id:number;
    userFirstName : string;
    userLastName : string;
    userName : string;
    email : string;
    address : string;
    phone : string;
  formatter: Formatter = new Formatter();
  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private formatterService: FormatterService,
    private route: ActivatedRoute,
    private httpClient: HttpClient
    ) { }

  ngOnInit(): void {
    // this.forFormatter();
    this.getImage();
    this.id = this.route.snapshot.params['id'];


    // this.formatterService.getFormatterById(this.id).subscribe(data => {
    //   this.formatter = data;
    // }, error => console.log(error));
    this.formatterService.getFormatterById(this.id).subscribe((formatter:Formatter) => {
      this.formatter = formatter

      this.userFirstName = formatter.userFirstName;
      this.userLastName = formatter.userLastName;
      this.userName = formatter.userName;
      this.email = formatter.email;
      this.address = formatter.adresse;
      this.phone = formatter.phone;
  }, (error : ErrorEvent) => {
      console.log(error)
  })
  }


  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }
  onSubmit(){
    this.formatterService.updateFormatter(this.id, this.formatter).subscribe( data =>{

    }
    , error => console.log(error));
  }


  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    this.progress = 0;
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    if (this.selectedFile != null) {
      uploadImageData.append('myFile', this.selectedFile, this.selectedFile.name);
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

    //Gets called when the user clicks on retieve image button to get the image from back end
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
  // forFormatter() {
  //   this.userService.forFormatter().subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.message = response;
  //     },
  //     (error)=>{
  //       console.log(error);
  //     }
  //   );
  // }
}



