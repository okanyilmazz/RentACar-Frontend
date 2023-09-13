import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { BodyType } from 'src/app/models/body-type/body-type';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';
import { Transmission } from 'src/app/models/transmission/transmission';

@Injectable({
  providedIn: 'root',
})
export class TransmissionService {
  apiUrl = new BaseUrl().apiUrl;

  constructor(private httpClient: HttpClient) { }

  addTransmission(transmission: Transmission): Observable<NonListResponseModel<Transmission>> {
    return this.httpClient.post<NonListResponseModel<Transmission>>(
      this.apiUrl + 'Transmissions/Add',
      transmission
    );
  }
  getAllTransmissions(): Observable<ListResponseModel<Transmission>> {
    return this.httpClient.get<ListResponseModel<Transmission>>(
      this.apiUrl + 'Transmissions/GetAll'
    );
  }
  deleteTransmission(transmission: Transmission): Observable<NonListResponseModel<Transmission>> {
    return this.httpClient.post<NonListResponseModel<Transmission>>(
      this.apiUrl + 'Transmissions/delete',
      transmission
    );
  }
  updateTransmission(transmission: Transmission): Observable<NonListResponseModel<Transmission>> {
    return this.httpClient.post<NonListResponseModel<Transmission>>(
      this.apiUrl + 'Transmissions/update',
      transmission
    );
  }
}
