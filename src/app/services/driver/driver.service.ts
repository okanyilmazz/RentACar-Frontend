import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { Driver } from 'src/app/models/driver/driver';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

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

  getDriverByUserId(id: number): Observable<ListResponseModel<Driver>> {
    let newPath = this.apiUrl + 'Drivers/getbyuserid?id=' + id;
    return this.httpClient.get<ListResponseModel<Driver>>(newPath);
  }
  add(driver: Driver): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'Drivers/add',
      driver
    );
  }

  deleteDriver(driver: Driver): Observable<NonListResponseModel<Driver>> {
    return this.httpClient.post<NonListResponseModel<Driver>>(
      this.apiUrl + 'Drivers/delete',
      driver
    );
  }

  updateDriver(driver: Driver): Observable<ListResponseModel<Driver>> {
    return this.httpClient.post<ListResponseModel<Driver>>(
      this.apiUrl + 'Drivers/update',
      driver
    );
  }
}
