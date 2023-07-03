import { Brand } from './../../models/brand/brand';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { BaseUrl } from 'src/app/constants/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = new BaseUrl().apiUrl;

  constructor(private httpClient: HttpClient) {}

  getBrand(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+'Brands/GetAll');
  }
}
