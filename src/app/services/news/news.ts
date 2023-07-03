import { Observable } from 'rxjs';
import { News } from '../../models/news/news';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class SubscribeNewsService {
  apiUrl = 'https://webservis.geziyoskii.site/api/';

  constructor(private httpClient: HttpClient) {}

  add(subscribeNews: News):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'news/add', subscribeNews);
  }
}
