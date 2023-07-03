import { HttpClient } from '@angular/common/http';
import { CarImageService } from './../../services/car-image/car-image.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from './../../models/car/carDetailDto';
import { CarService } from 'src/app/services/car/car.service';
import { Component, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/car/carImage';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  carDetails: CarDetail[];
  carImages: CarImage[];
imageUrl="https://localhost:44318/"
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailByCarId(params['carId']);
      this.getImageByCarId(params['carId']);
    });
  }
  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailByClick(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getImageByCarId(carId: number) {
    this.carImageService.getImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  getImageByImageId(imageId: number) {
    this.carImageService.getImageByImageId(imageId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  getAllImage(imagePath:string){
    console.log(this.imageUrl+imagePath);
    return this.imageUrl+imagePath;
  }
}
