import { CarResponseModel } from './../../models/car/carResponseModel';
import { CarDetailResponseModel } from './../../models/car/carDetailResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44318/api/cars/getcardetail';

  constructor(private httpClient: HttpClient) {}

  getCarDetail(): Observable<CarDetailResponseModel> {
    return this.httpClient.get<CarDetailResponseModel>(this.apiUrl);
  }
}
