import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { Invoice } from 'src/app/models/invoice/invoice';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  apiUrl = new BaseUrl().apiUrl;
  constructor(private httpClient: HttpClient) {}
  
  getAllInvoice(): Observable<ListResponseModel<Invoice>> {
    let newPath = this.apiUrl + 'Invoices/getall';
    return this.httpClient.get<ListResponseModel<Invoice>>(newPath);
  }
  
  add(invoice: Invoice):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'Invoices/add', invoice);
  }
}
