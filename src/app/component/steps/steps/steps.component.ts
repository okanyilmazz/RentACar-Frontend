import { Payment } from 'src/app/models/payment/payment';
import { CarService } from 'src/app/services/car/car.service';
import { CarDetail } from 'src/app/models/car/carDetailDto';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';
import { Driver } from 'src/app/models/driver/driver';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css'],
})
export class StepsComponent implements OnInit {
  rentDetail: RentalDetail;
  carDetails: CarDetail[] = [];
  driver: Driver;
  payment: Payment;
  rentalLocationTitle: string;
  returnLocationTitle: string;

  carStepClass: string = '';
  driverStepClass: string = '';
  paymentStepClass: string = '';
  orderConfirmationStepClass: string = '';

  carTooltip: boolean = false;
  driverTooltip: boolean = false;
  paymentTooltip: boolean = false;
  orderTooltip: boolean = false;

  driverLeftSeperatorClass: string = '';
  driverRightSeperatorClass: string = '';

  carLeftSeperatorClass: string = '';
  carRightSeperatorClass: string = '';

  paymentLeftSeperatorClass: string = '';
  paymentRightSeperatorClass: string = '';

  orderConfirmationLeftSeperatorClass: string = '';
  orderConfirmationRightSeperatorClass: string = '';
  carId: number;
  driverFirstName: string = '';
  driverLastName: string = '';
  driverAge: number;

  rentCarName: string = '';
  rentBrandName: string = '';
  rentFuelName: string = '';
  rentTransmissionName: string = '';
  dailyPrice: number;
  constructor(
    private router: Router,
    private locationService: LocationService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private localStorageService:LocalStorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.firstChild.params.subscribe((params) => {
      this.getCarDetailByCarId(params['carId']);
    });

    if (
      this.router.url.includes('car-id') &&
      this.router.url.includes('rent-date')
    ) {
      this.carLeftSeperatorClass = 'step-seperator';
      this.carStepClass = 'step';
      this.carRightSeperatorClass = 'step-seperator';

      this.rentDetail =this.localStorageService.getItem('newRental')
      
      this.getRentalLocationDetailsById(this.rentDetail.rentLocationId);
      this.getReturnLocationDetailsById(this.rentDetail.returnLocationId);
    }

    if (this.router.url.includes('driver-details')) {
      this.carTooltip = true;
      this.driverLeftSeperatorClass = 'step-seperator';
      this.driverStepClass = 'step';
      this.driverRightSeperatorClass = 'step-seperator';
    }
    
    if (this.router.url.includes('payment-details')) {
      this.driverTooltip = true;
      this.driver = this.localStorageService.getItem('driverDetails');
      this.paymentLeftSeperatorClass = 'step-seperator';
      this.paymentStepClass = 'step';
      this.paymentRightSeperatorClass = 'step-seperator';
      this.driver = this.localStorageService.getItem('driverDetails');
      this.driverFirstName = this.driver.firstName;
      this.driverLastName = this.driver.lastName;
      this.getDriverAge(this.driver.birthDate);
    }

    if (this.router.url.includes('order-confirmation')) {
      this.paymentTooltip = true;
      this.payment = this.localStorageService.getItem('paymentDetails')
      this.orderConfirmationLeftSeperatorClass = 'step-seperator';
      this.orderConfirmationStepClass = 'step';
      this.orderConfirmationRightSeperatorClass = 'step-seperator';
    }
  }

  getRentalLocationDetailsById(locationId: number): any {
    this.locationService
      .getLocationDetailsById(locationId)
      .subscribe((response) => {
        this.rentalLocationTitle = response.data.title;
      });
  }

  getReturnLocationDetailsById(locationId: number): any {
    this.locationService
      .getLocationDetailsById(locationId)
      .subscribe((response) => {
        this.returnLocationTitle = response.data.title;
      });
  }
  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailById(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.carDetails.forEach((car) => {
        this.rentCarName = car.carName;
        this.rentBrandName = car.brandName;
        this.rentFuelName = car.fuelType;
        this.rentTransmissionName = car.transmissionType;
        this.dailyPrice = car.dailyPrice;
      });
    });
  }
   totalPrice(dailyPrice: number) {
    return dailyPrice * this.rentDetail.rentDay;
  }
  getDriverAge(birthDate: any) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const birthYear = (birthDate as any)['year'];
    const birthMonth = (birthDate as any)['month'] - 1; // JavaScript'te aylar 0-11 arasında indekslenir
    const birthDay = (birthDate as any)['day'];

    this.driverAge = currentYear - birthYear;
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      this.driverAge--;
    }
  }
}

