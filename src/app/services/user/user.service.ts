import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  apiUrl = new BaseUrl().apiUrl;

  
  getUserByMail(email: string): Observable<NonListResponseModel<User>> {
    let newPath = this.apiUrl + 'Users/getbymail?email=' + email;
    return this.httpClient.get<NonListResponseModel<User>>(newPath);
  }

  updateUser(user: User): Observable<ListResponseModel<User>> {
    return this.httpClient.post<ListResponseModel<User>>(
      this.apiUrl + 'Users/userpartialupdate',
      user
    );
  }

  getUserById(userId:number):Observable<NonListResponseModel<User>>{
    let newUrl = this.apiUrl + "Users/getbyid?id=" + userId;
    return this.httpClient.get<NonListResponseModel<User>>(newUrl);
  }
}
