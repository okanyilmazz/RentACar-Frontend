import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { Contact } from 'src/app/models/contact/contact';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiUrl = new BaseUrl().apiUrl;
  constructor(private httpClient: HttpClient) {}

  add(contactMessage: Contact):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'contacts/add', contactMessage);
  }
}
