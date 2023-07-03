import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { ListResponseModel } from './../../models/listResponseModel';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetail } from 'src/app/models/car/carDetailDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';
import { BaseUrl } from 'src/app/constants/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = new BaseUrl().apiUrl;


  constructor(private httpClient: HttpClient) {}

  getAllCarDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'Cars/GetAllCarDetail';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByBrand(
    brandId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'Cars/getallbybrandid?id=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByBody(
    bodyId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'Cars/getallbybodyid?id=' + bodyId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByColor(
    colorId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'Cars/getallbycolorid?id=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }


  getCarDetailByClick(carId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'Cars/getcardetailbyid?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailById(carId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'Cars/getcardetailbyid?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"Cars/GetCarDetailByBrandAndColor?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByBrandAndBody(brandId:number,bodyId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"Cars/GetCarDetailByBrandAndBody?brandId="+brandId+"&bodyId="+bodyId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByBodyAndColor(bodyId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"Cars/GetCarDetailByBodyAndColor?bodyId="+bodyId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByBrandColorAndBody(brandId:number,colorId:number,bodyId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"Cars/GetCarDetailByBrandColorAndBody?brandId="+brandId+"&colorId="+colorId+"&bodyId="+bodyId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }


}
