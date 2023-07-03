import { ListResponseModel } from './../../models/listResponseModel';
import {ResponseModel} from 'src/app/models/responseModel'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDetailDto } from 'src/app/models/location/locationDetailsDto';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';
import { BaseUrl } from 'src/app/constants/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  apiUrl = new BaseUrl().apiUrl;
  constructor(private httpClient: HttpClient) {}

  getLocationDetails(): Observable<ListResponseModel<LocationDetailDto>> {
    let newPath = this.apiUrl + 'Locations/getlocationdetails';
    return this.httpClient.get<ListResponseModel<LocationDetailDto>>(newPath);
  }


  getLocationDetailsById(locationId: number): Observable<NonListResponseModel<LocationDetailDto>> {
    let newPath = this.apiUrl + 'Locations/getbyid?id='+locationId;
    return this.httpClient.get<NonListResponseModel<LocationDetailDto>>(newPath);
  }
}
