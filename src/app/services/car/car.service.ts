import { ListResponseModel } from './../../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetail } from 'src/app/models/car/carDetailDto';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44318/api/';


  constructor(private httpClient: HttpClient) {}

  getAllCarDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/GetAllCarDetail';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByBrand(
    brandId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'Cars/getallbybrandid?id=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByColor(
    colorId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'Cars/getallbycolorid?id=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByClick(carId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'Cars/getcardetailbyid?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
