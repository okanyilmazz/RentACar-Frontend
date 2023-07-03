import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyType } from 'src/app/models/body-type/body-type';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BodyTypeService {

  apiUrl = 'https://webservis.geziyoskii.site/api/bodies/getall';

  constructor(private httpClient: HttpClient) {}

  getBody(): Observable<ListResponseModel<BodyType>> {
    return this.httpClient.get<ListResponseModel<BodyType>>(this.apiUrl);
  }
}
