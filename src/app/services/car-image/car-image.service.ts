import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CarImage } from 'src/app/models/car/carImage';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = 'https://localhost:44318/api/';
  constructor(private httpClient: HttpClient) {}

  getImageByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'CarImages/getbycarid?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getImageByImageId(imageId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'CarImages/getbyid?id=' + imageId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

}
