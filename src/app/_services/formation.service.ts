import { Observable } from 'rxjs';
import { Formation } from './../_classes/formation';
import { environment } from './../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private httpClient: HttpClient) { }

  getFormationsList(): Observable<Formation[]>{
    return this.httpClient.get<Formation[]>(`${environment.formation}`);
  }

  createFormation(formation: Formation): Observable<Object>{
    return this.httpClient.post(`${environment.formation}`, formation);
  }

  getFormationById(id: number): Observable<Formation>{
    return this.httpClient.get<Formation>(`${environment.formation}/${id}`);
  }

  updateFormation(id: number, formation: Formation): Observable<Object>{
    return this.httpClient.put(`${environment.formation}/${id}`, formation);
  }

  deleteFormation(id: number): Observable<Object>{
    return this.httpClient.delete(`${environment.formation}/${id}`);
  }
}