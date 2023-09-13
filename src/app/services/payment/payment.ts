import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { Driver } from 'src/app/models/driver/driver';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';
import { Payment } from 'src/app/models/payment/payment';
import { PaymentPay } from 'src/app/models/payment/paymentPay';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = new BaseUrl().apiUrl;
  constructor(private httpClient: HttpClient) {}

  getAllPayments(): Observable<ListResponseModel<Payment>> {
    let newPath = this.apiUrl + 'Payments/getall';
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }
  getPaymentsByUserId(id: number): Observable<ListResponseModel<Payment>> {
    let newPath = this.apiUrl + 'Payments/getbyuserid?id=' + id;
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }

  deletePayment(payment: Payment): Observable<NonListResponseModel<Payment>> {
    return this.httpClient.post<NonListResponseModel<Payment>>(
      this.apiUrl + 'Payments/delete',
      payment
    );
  }

  updatePayment(payment: Payment): Observable<ListResponseModel<Payment>> {
    return this.httpClient.post<ListResponseModel<Payment>>(
      this.apiUrl + 'Payments/update',
      payment
    );
  }
  add(payment: Payment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'Payments/add',
      payment
    );
  }
  
  pay(
    paymentWithTotalPrice: PaymentPay
  ): Observable<NonListResponseModel<Payment>> {
    return this.httpClient.post<NonListResponseModel<Payment>>(
      this.apiUrl + 'Payments/pay',
      paymentWithTotalPrice
    );
  }
}
