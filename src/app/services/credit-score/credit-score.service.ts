import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { CreditScore } from 'src/app/models/credit-score/creditScore';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditScoreService {
  apiUrl = new BaseUrl().apiUrl;
  constructor(private httpClient: HttpClient) {}

  getScoreById(id: number): Observable<NonListResponseModel<CreditScore>> {
    let newPath = this.apiUrl + 'CreditScores/GetById?id=' + id;
    return this.httpClient.get<NonListResponseModel<CreditScore>>(newPath);
  }
  getScoreByUserId(id: number): Observable<NonListResponseModel<CreditScore>> {
    let newPath = this.apiUrl + 'CreditScores/GetByUserId?id=' + id;
    return this.httpClient.get<NonListResponseModel<CreditScore>>(newPath);
  }
  add(creditScore: CreditScore): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'CreditScores/add',
      creditScore
    );
  }

}
