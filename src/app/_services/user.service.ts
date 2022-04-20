import { User } from './../_classes/user';
import { environment } from './../../environments/environment';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
const USERNAME_KEY = 'USERNAME';

@Injectable({
  providedIn: 'root',
})
export class UserService {


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
  getUserById(id: string): Observable<any>{
    return this.httpclient.get<any>(`${environment.API}/${id}`);
  }

  public forUser() {
    return this.httpclient.get(`${environment.API}/forUser`, {
      responseType: 'text',
    });
  }

  public forFormatter(id:any) {
    return this.httpclient.get(`${environment.API}/forFormatter/${id}`);
    // , {
    //   responseType: 'text',
    // });
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
  addUser(user: User): Observable<User> {
    return this.httpclient.post<User>(`${environment.addUser1}`, user);
  }
  findByUserName(username: string): Observable<any> {
    return  this.httpclient.get<any>(`${environment.findFormatter}/${username}`);
  }
  // * save UserName
  saveUserName(username: string) {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, username);
  }
  getUserName(): string {
    return localStorage.getItem(USERNAME_KEY);
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
