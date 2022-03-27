import { environment } from './../../environments/environment';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // * PATH_OF_API = 'http://localhost:9090';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}
//Authentification APIs
  public login(loginData) {
    return this.httpclient.post(`${environment.API}/authenticate`, loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpclient.get(`${environment.API}/forUser`, {
      responseType: 'text',
    });
  }

  public forFormatter() {
    return this.httpclient.get(`${environment.API}/forFormatter`, {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.httpclient.get(`${environment.API}/forAdmin`, {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
// forgot and reset password APIs
 /* TODO : requestReset(body): Observable<any> {
    return this.httpclient.post(this.PATH_OF_API +'/forgot_password', body);
  }

  newPassword(body): Observable<any> {
    return this.httpclient.post(this.PATH_OF_API +'/reset_password', body);
  }

  ValidPasswordToken(body): Observable<any> {
    return this.httpclient.post(this.PATH_OF_API +'/reset_password', body);
  }*/

  // public retrievePassword(email:String) {
  //   const token = this.userAuthService.getToken();
  //   let url = this.PATH_OF_API+'/forgetPassword';
  //   return this.httpclient.post(url,token);
  // }

}
