import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressDetails, Details, PersonDetails } from '../models/persondetails.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private https:HttpClient) { }

  apiBaseUrl=environment.apiBaseUrl;
  getAllDetails() :Observable<Details[]> {
    return this.https.get<Details[]>(this.apiBaseUrl+'api/details/personDetails');
  }
  getAddressDetailsById(id:number) :Observable<AddressDetails> {
    return this.https.get<AddressDetails>(this.apiBaseUrl+'api/details/getDetailByID/'+id);
  }
  updateDetails(id:number,personDetails:PersonDetails):Observable<PersonDetails>{
    return this.https.post<PersonDetails>(this.apiBaseUrl+'api/details/updateDetail/'+id,personDetails)
  }
}
