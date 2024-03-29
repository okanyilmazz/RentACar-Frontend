import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CarImage } from 'src/app/models/car/carImage';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { NonListResponseModel } from 'src/app/models/nonListResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = new BaseUrl().apiUrl;
  constructor(private httpClient: HttpClient) { }

  getImageByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'CarImages/getbycarid?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getImageByImageId(imageId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'CarImages/getbyid?id=' + imageId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  addCarImage(carImage: any): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'CarImages/add',
      carImage
    );
  }

  deleteCarImage(carImage: CarImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'CarImages/delete',
      carImage
    );
  }

}
