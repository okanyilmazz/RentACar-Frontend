import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { Driver } from 'src/app/models/driver/driver';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  apiUrl = new BaseUrl().apiUrl;
  constructor(private httpClient: HttpClient) {}

  getAllDriver(): Observable<ListResponseModel<Driver>> {
    let newPath = this.apiUrl + 'Drivers/getall';
    return this.httpClient.get<ListResponseModel<Driver>>(newPath);
  }
  add(driver: Driver) {
    return this.httpClient.post(this.apiUrl + 'Drivers/add', driver);
  }
}
