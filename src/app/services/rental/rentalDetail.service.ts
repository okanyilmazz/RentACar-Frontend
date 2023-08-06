import { Rental } from 'src/app/models/rental/rental';
import { RentalDetail } from './../../models/rental/rentalDetail';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalDetailService {
  apiUrl = new BaseUrl().apiUrl;

  constructor(private httpClient: HttpClient) {}

  getRentalDetails(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'rentals/getrentaldetail';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalDetailsByUserId(id: number): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'rentals/getrentaldetailbyuserid?id=' + id;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
  getRentalByUserId(id: number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getbyuserid?id=' + id;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  getAllRental(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getall';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  add(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'Rentals/add',
      rental
    );
  }
}
