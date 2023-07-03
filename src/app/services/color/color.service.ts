import { ListResponseModel } from './../../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from 'src/app/models/color/color';
import { BaseUrl } from 'src/app/constants/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = new BaseUrl().apiUrl;

  constructor(private httpClient: HttpClient) {}

  getColor(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+'Colors/GetAll');
  }
}
