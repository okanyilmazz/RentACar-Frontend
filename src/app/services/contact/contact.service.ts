import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact/contact';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // apiUrl = 'https://localhost:44318/api/';
  apiUrl = 'https://webservis.geziyoskii.site/api/';
  constructor(private httpClient: HttpClient) {}

  add(contactMessage: Contact):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'contacts/add', contactMessage);
  }
}
