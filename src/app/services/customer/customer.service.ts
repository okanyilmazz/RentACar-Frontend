import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailResponseModel } from 'src/app/models/customer/customerDetailResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44318/api/customers/getCustomerDetails';

  constructor(private httpClient: HttpClient) {}

  getCustomer(): Observable<CustomerDetailResponseModel> {
    return this.httpClient.get<CustomerDetailResponseModel>(this.apiUrl);
  }
}
