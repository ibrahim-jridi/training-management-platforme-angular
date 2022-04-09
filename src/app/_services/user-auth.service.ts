import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
  getUserDetails() {
    return JSON.parse(localStorage.getItem('jwtToken')).userName;
    return JSON.parse(localStorage.getItem('jwtToken')).userFirstName;
    return JSON.parse(localStorage.getItem('jwtToken')).userLastName;
    return JSON.parse(localStorage.getItem('jwtToken')).email;
    return JSON.parse(localStorage.getItem('jwtToken')).specialite;
    return JSON.parse(localStorage.getItem('jwtToken')).adresse;
    return JSON.parse(localStorage.getItem('jwtToken')).phone;
    return JSON.parse(localStorage.getItem('jwtToken')).userPassword;
    return JSON.parse(localStorage.getItem('jwtToken')).userConfirmPassword;
}
}
