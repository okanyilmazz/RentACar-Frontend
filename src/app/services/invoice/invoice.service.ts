import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { Invoice } from 'src/app/models/invoice/invoice';
import { InvoiceDetailsDto } from 'src/app/models/invoice/invoiceDetailsDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';
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
  
  getInvoiceDetailsByUserId(id: number): Observable<ListResponseModel<InvoiceDetailsDto>> {
    let newPath = this.apiUrl + 'Invoices/getdetailbyuserid?id=' + id;
    return this.httpClient.get<ListResponseModel<InvoiceDetailsDto>>(newPath);
  }
  getInvoiceById(id: number): Observable<NonListResponseModel<Invoice>> {
    let newPath = this.apiUrl + 'Invoices/getbyid?id=' + id;
    return this.httpClient.get<NonListResponseModel<Invoice>>(newPath);
  }

  add(invoice: Invoice):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'Invoices/add', invoice);
  }
  
  deleteInvoice(invoice: Invoice):Observable<NonListResponseModel<Invoice>> {
    return this.httpClient.post<NonListResponseModel<Invoice>>(
      this.apiUrl + 'Invoices/delete',
      invoice
    );
  }

  updateInvoice(invoice: Invoice): Observable<ListResponseModel<Invoice>> {
    return this.httpClient.post<ListResponseModel<Invoice>>(
      this.apiUrl + 'Invoices/update',
      invoice
    );
  }


}
