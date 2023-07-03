import { CustomerDetail } from './../../models/customer/customerDetail';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44318/api/customers/getCustomerDetails';

  constructor(private httpClient: HttpClient) {}

  getCustomer(): Observable<ListResponseModel<CustomerDetail>> {
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(this.apiUrl);
  }
}
