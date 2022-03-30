import { Formatter } from './../_classes/formatter';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  updateFormatter(id:number, formatters: Formatter): Observable<Object>{
    return this.httpClient.put(`${environment.FAPII}/${id}`, formatters);
  }

  deleteFormatter(id: number): Observable<Object>{
    return this.httpClient.delete(`${environment.FAPII}/${id}`);
  }
}
