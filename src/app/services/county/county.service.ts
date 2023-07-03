import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { County } from 'src/app/models/county/county';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CountyService {
  apiUrl = 'https://webservis.geziyoskii.site/api/';
  constructor(private httpClient: HttpClient) {}

  getAllCounty(): Observable<ListResponseModel<County>> {
    let newPath = this.apiUrl + 'Counties/getall';
    return this.httpClient.get<ListResponseModel<County>>(newPath);
  }

  getAllByCityId(id: number): Observable<ListResponseModel<County>> {
    let newPath = this.apiUrl + 'Counties/getbycityid?id=' + id;
    return this.httpClient.get<ListResponseModel<County>>(newPath);
  }
}
