import { ListResponseModel } from './../../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from 'src/app/models/color/color';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = new BaseUrl().apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + 'Colors/GetAll');
  }

  addColor(color: Color): Observable<NonListResponseModel<Color>> {
    return this.httpClient.post<NonListResponseModel<Color>>(
      this.apiUrl + 'Colors/Add',
      color
    );
  }
  deleteColor(color: Color): Observable<NonListResponseModel<Color>> {
    return this.httpClient.post<NonListResponseModel<Color>>(
      this.apiUrl + 'Colors/delete',
      color
    );
  }
  updateColor(color: Color): Observable<NonListResponseModel<Color>> {
    return this.httpClient.post<NonListResponseModel<Color>>(
      this.apiUrl + 'Colors/update',
      color
    );
  }
}
