import { ListResponseModel } from './../../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from 'src/app/models/city/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  apiUrl = 'https://webservis.geziyoskii.site/api/';

  constructor(private httpClient: HttpClient) {}

  getAllCity(): Observable<ListResponseModel<City>> {
    let newPath = this.apiUrl + 'Cities/getall';
    return this.httpClient.get<ListResponseModel<City>>(newPath);
  }

  getAllByCountryId(id: number): Observable<ListResponseModel<City>> {
    let newPath = this.apiUrl + 'Cities/getbycountryid?id=' + id;
    return this.httpClient.get<ListResponseModel<City>>(newPath);
  }
}
