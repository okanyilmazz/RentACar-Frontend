import { Brand } from './../../models/brand/brand';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = new BaseUrl().apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllBrand(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + 'Brands/GetAll');
  }
  addBrand(brand: Brand): Observable<NonListResponseModel<Brand>> {
    return this.httpClient.post<NonListResponseModel<Brand>>(
      this.apiUrl + 'Brands/Add',
      brand
    );
  }
  deleteBrand(brand: Brand): Observable<NonListResponseModel<Brand>> {
    return this.httpClient.post<NonListResponseModel<Brand>>(
      this.apiUrl + 'Brands/delete',
      brand
    );
  }
  updateBrand(brand: Brand): Observable<NonListResponseModel<Brand>> {
    return this.httpClient.post<NonListResponseModel<Brand>>(
      this.apiUrl + 'Brands/update',
      brand
    );
  }
}
