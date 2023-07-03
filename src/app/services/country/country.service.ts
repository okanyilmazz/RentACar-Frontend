import { ListResponseModel } from './../../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from 'src/app/models/country/country';
import { BaseUrl } from 'src/app/constants/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  apiUrl = new BaseUrl().apiUrl;
  constructor(private httpClient:HttpClient) { }

  getAllCountry():Observable<ListResponseModel<Country>>{
    let newPath = this.apiUrl + 'Countries/getall';
    return this.httpClient.get<ListResponseModel<Country>>(newPath);
  }
}
