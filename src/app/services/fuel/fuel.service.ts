import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { BodyType } from 'src/app/models/body-type/body-type';
import { Fuel } from 'src/app/models/fuel/fuel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';


@Injectable({
  providedIn: 'root',
})
export class FuelService {
  apiUrl = new BaseUrl().apiUrl;

  constructor(private httpClient: HttpClient) { }

  addFuel(fuel: Fuel): Observable<NonListResponseModel<Fuel>> {
    return this.httpClient.post<NonListResponseModel<Fuel>>(
      this.apiUrl + 'Fuels/Add',
      fuel
    );
  }
  getAllFuels(): Observable<ListResponseModel<Fuel>> {
    return this.httpClient.get<ListResponseModel<Fuel>>(
      this.apiUrl + 'Fuels/GetAll'
    );
  }
  deleteFuel(fuel: Fuel): Observable<NonListResponseModel<Fuel>> {
    return this.httpClient.post<NonListResponseModel<Fuel>>(
      this.apiUrl + 'Fuels/delete',
      fuel
    );
  }
  updateFuel(fuel: Fuel): Observable<NonListResponseModel<Fuel>> {
    return this.httpClient.post<NonListResponseModel<Fuel>>(
      this.apiUrl + 'Fuels/update',
      fuel
    );
  }
}
