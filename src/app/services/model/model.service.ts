import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Model } from 'src/app/models/model/model';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  apiUrl = new BaseUrl().apiUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  add(model: Model): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'Models/add', model);
  }

  getAllModels(): Observable<ListResponseModel<Model>> {
    let newPath = this.apiUrl + 'Models/GetAll';
    return this.httpClient.get<ListResponseModel<Model>>(newPath);
  }


}
