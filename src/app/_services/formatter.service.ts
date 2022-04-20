import { Formatter } from './../_classes/formatter';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const USERNAME_KEY = 'USERNAME';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  // private baseURL = "http://localhost:8080/api/v1/employees";

  constructor(private httpClient: HttpClient) { }

  getFormatterList(): Observable<Formatter[]>{
    return this.httpClient.get<Formatter[]>(`${environment.FAPI}`);
  }

  // * to save in userDao
  createFormatter(formatters: Formatter): Observable<Object>{
    return this.httpClient.post(`${environment.FAPI}`, formatters);
  }
  // * to save in formatterDao
  createFormatterr(formatters: Formatter): Observable<Object>{
    return this.httpClient.post(`${environment.FAPII}`, formatters);
  }

  getFormatterById(id: number): Observable<Formatter>{
    return this.httpClient.get<Formatter>(`${environment.FAPII}/${id}`);
  }

  updateFormatter(id:number, formatters: Formatter): Observable<Formatter>{
    return this.httpClient.put<Formatter>(`${environment.FAPII}/${id}`, formatters);
  }

  deleteFormatter(id: number): Observable<Object>{
    return this.httpClient.delete(`${environment.FAPII}/${id}`);
  }
  findByFormatterName(username: string): Observable<any> {
    return  this.httpClient.get<any>(`${environment.findFormatter}/${username}`);
  }
  // * save UserName
  saveFormatterName(username: string) {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, username);
  }
  getFormatterName(): string {
    return localStorage.getItem(USERNAME_KEY);
  }
}
