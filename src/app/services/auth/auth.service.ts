import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { LoginModel } from 'src/app/models/loginModel/loginModel';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';
import { RegisterModel } from 'src/app/models/registerModel/registerModel';
import { TokenModel } from 'src/app/models/token/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, last } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UpdatePasswordDto } from 'src/app/models/user/updatePasswordDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private localStorageService: LocalStorageService
  ) {}

  decodedToken: any;
  apiUrl = new BaseUrl().apiUrl;
  user: User;
  register(registerModel: RegisterModel) {
    return this.httpClient.post<NonListResponseModel<TokenModel>>(
      this.apiUrl + 'Auth/Register',
      registerModel
    );
  }

  login(loginModel: LoginModel): Observable<NonListResponseModel<TokenModel>> {
    return this.httpClient.post<NonListResponseModel<TokenModel>>(
      this.apiUrl + 'Auth/login',
      loginModel
    );
  }

  isAuthenticated() {
    if (this.localStorageService.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }


  getUserInfo(): User {
    const tokenDetails = this.jwtHelper.decodeToken(
      this.localStorageService.getItem('token')
    );
    const {
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier':
        userId,
      email: email,
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': name,
      nbf: nbf,
      exp: exp,
      iss: iss,
      aud: aud,
    } = tokenDetails;

    let nameParts = name.split(' ');

    let firstname = nameParts[0]; // İlk kısım adı temsil eder
    let lastname = nameParts.slice(1).join(' ');

    const user: User = {
      id: userId,
      firstName: firstname,
      lastName: lastname,
      email: email
    };

    this.localStorageService.setItem('userFirstName', firstname);
    this.localStorageService.setItem('userLastName', lastname);
    this.localStorageService.setItem('userId', userId);

    return user;
  }

  updatePassword(
    updatePasswordModel: UpdatePasswordDto
  ): Observable<NonListResponseModel<UpdatePasswordDto>> {
    return this.httpClient.post<NonListResponseModel<UpdatePasswordDto>>(
      this.apiUrl + 'Auth/updatepassword',
      updatePasswordModel
    );
  }
}
