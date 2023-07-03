import { Observable } from 'rxjs';
import { News } from '../../models/news/news';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/models/responseModel';
import { BaseUrl } from 'src/app/constants/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class SubscribeNewsService {
  apiUrl = new BaseUrl().apiUrl;

  constructor(private httpClient: HttpClient) {}

  add(subscribeNews: News):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'news/add', subscribeNews);
  }
}
