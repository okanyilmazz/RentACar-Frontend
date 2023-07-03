import { ListResponseModel } from './../../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from 'src/app/models/color/color';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://webservis.geziyoskii.site/api/Colors/getall';

  constructor(private httpClient: HttpClient) {}

  getColor(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl);
  }
}
