import { Theme } from './../_classes/theme';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private httpClient: HttpClient) { }

  getThemesList(): Observable<Theme[]>{
    return this.httpClient.get<Theme[]>(`${environment.TAPI}`);
  }

  createTheme(theme: Theme): Observable<Object>{
    return this.httpClient.post(`${environment.TAPI}`, theme);
  }

  getThemeById(id: number): Observable<Theme>{
    return this.httpClient.get<Theme>(`${environment.TAPI}/${id}`);
  }

  updateTheme(id: number, theme: Theme): Observable<Object>{
    return this.httpClient.put(`${environment.TAPI}/${id}`, theme);
  }

  deleteTheme(id: number): Observable<Object>{
    return this.httpClient.delete(`${environment.TAPI}/${id}`);
  }
}
