import { CustomerDetail } from './../../models/customer/customerDetail';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = new BaseUrl().apiUrl;
  constructor(private httpClient: HttpClient) {}

  getCustomer(): Observable<ListResponseModel<CustomerDetail>> {
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(
      this.apiUrl + 'Customers/GetCustomerDetails'
    );
  }
}
