
import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/car/carDetail';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[] = [];
  dataLoaded = false;
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCarDetail();
  }

  getCarDetail() {
    this.carService.getCarDetail().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
}
