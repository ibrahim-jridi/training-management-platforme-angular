import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from './../../environments/environment';
import { Formation } from './../_classes/formation';
import { Guest } from './../_classes/guest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  public formData:  FormGroup;
  constructor(private http:HttpClient) { }
  retrieveAllGuests() {
    return this.http.get<Guest[]>(`${environment.API_URL}/guests`);

  }

  deleteGuest(id){
    return this.http.delete(`${environment.API_URL}/guests/${id}`);
  }

  retrieveGuest(id){
    return this.http.get<Guest>(`${environment.API_URL}/guests/${id}`);
  }

  updateGuest(id, Guest){
    return this.http.put(
          `${environment.API_URL}/guests/${id}`
                , Guest);
  }
  // * to save in userDao
  createFormatter(Guest: Guest): Observable<Object>{
    return this.http.post(`${environment.API_URL}/guestss`, Guest);
  }
  //to save in guestDao
  createGuest(Guest){
    return this.http.post(
              `${environment.API_URL}/guests`
                , Guest);
  }
  registerInFormation(id, formation){
    return this.http.post(
              `${environment.API_URL}/guests/${id}/formations`
                , formation);
  }
  unregisterFromFormation(GuestId, formationId){
    return this.http.delete(`${environment.API_URL}/guests/${GuestId}/formations/${formationId}`);
  }
  retreiveGuestFormations(id){
    return this.http.get<Formation>(`${environment.API_URL}/guests/${id}/formations`);
  }
  retreiveGuestFormation(GuestId, FormationId){
    return this.http.get<Formation>(`${environment.API_URL}/guests/${GuestId}/formations/${FormationId}`);
  }
}
