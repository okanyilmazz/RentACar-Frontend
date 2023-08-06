import { CarImageService } from './../../services/car-image/car-image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from './../../models/car/carDetailDto';
import { CarService } from 'src/app/services/car/car.service';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Output,
} from '@angular/core';
import { CarImage } from 'src/app/models/car/carImage';
import { DatePipe } from '@angular/common';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  carDetails: CarDetail[];
  carDetail: CarDetail;
  rentDetail: RentalDetail;
  carImages: CarImage[];
  carId: number;
  rentDay: number;
  rentalDate: string;
  rentalTime: string;
  returnDate: string;
  returnTime: string;
  selectedRentalLocationId: number;
  selectedReturnLocationId: number;

  imageUrl = 'https://webservis.geziyoskii.site/';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private carImageService: CarImageService,
    private localStorageService:LocalStorageService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (
        params['carId'] &&
        params['rentalDate'] &&
        params['rentalTime'] &&
        params['returnDate'] &&
        params['returnTime'] &&
        params['selectedRentalLocationId'] &&
        params['selectedReturnLocationId']
      ) {
        this.getCarDetailByCarId(params['carId']);
        this.getImageByCarId(params['carId']);
        this.rentDetail = this.localStorageService.getItem('newRental');

        this.rentDay = this.rentDetail.rentDay;
      }
    });
  }

  findDay(rentalDate: string, returnDate: string): any {
    let rentalDateSplit = rentalDate.split('.');
    let returnDateSplit = returnDate.split('.');

    let returnDay: number = +returnDateSplit[0];
    let rentalDay: number = +rentalDateSplit[0];
    let returnMonth: number = +returnDateSplit[1];
    let rentalMonth: number = +rentalDateSplit[1];

    let dayDifference: number = returnDay - rentalDay;
    let monthDifference: number = returnMonth - rentalMonth;
    dayDifference = dayDifference + monthDifference * 30;
    return dayDifference;
  }

  transformDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy', this.locale);
  }
  getCarDetailByCarId(carId: number) {
    const storedData = this.localStorageService.getItem('newRental');
    const rentalData = JSON.parse(storedData);
    let updatedData = JSON.stringify(rentalData);
    this.carService.getCarDetailByClick(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.carDetails.forEach((car) => {
        rentalData.totalPrice = this.totalPrice(car.dailyPrice);
        rentalData.carId=carId;
        updatedData = JSON.stringify(rentalData);
        this.localStorageService.removeItem('newRental');
        this.localStorageService.setItem('newRental', updatedData);
      });
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
  getImagePath(imagePath: string) {
    return this.imageUrl + imagePath;
  }

  isExistAirConditioner(airConditioning: boolean) {
    if (airConditioning === true) {
      return 'Klimalı';
    } else {
      return 'Klimasız';
    }
  }

  goToDriverDetails() {
    this.router.navigate([
      `reservation/details/car-id/${this.carId}/rent-date/${this.rentalDate}/rent-time/${this.rentalTime}/return-date/${this.returnDate}/return-time/${this.returnTime}/rental-location/${this.selectedRentalLocationId}/return-location/${this.selectedRentalLocationId}/driver-details`,
    ]);
  }
  totalPrice(dailyPrice: number) {
    return dailyPrice * this.rentDay;
  }
}
