import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { BodyType } from 'src/app/models/body-type/body-type';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BodyTypeService {
  apiUrl = new BaseUrl().apiUrl;

  constructor(private httpClient: HttpClient) { }

  addBody(body: BodyType): Observable<NonListResponseModel<BodyType>> {
    return this.httpClient.post<NonListResponseModel<BodyType>>(
      this.apiUrl + 'Bodies/Add',
      body
    );
  }
  getAllBodies(): Observable<ListResponseModel<BodyType>> {
    return this.httpClient.get<ListResponseModel<BodyType>>(
      this.apiUrl + 'Bodies/GetAll'
    );
  }
  deleteBody(body: BodyType): Observable<NonListResponseModel<BodyType>> {
    return this.httpClient.post<NonListResponseModel<BodyType>>(
      this.apiUrl + 'Bodies/delete',
      body
    );
  }
  updateBody(body: BodyType): Observable<NonListResponseModel<BodyType>> {
    return this.httpClient.post<NonListResponseModel<BodyType>>(
      this.apiUrl + 'Bodies/update',
      body
    );
  }
}
