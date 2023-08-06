import { CarDetail } from './../../models/car/carDetailDto';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetail } from './../../models/rental/rentalDetail';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
  faAngleDoubleUp,
  faAngleDoubleDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicles-page',
  templateUrl: './vehicles-page.component.html',
  styleUrls: ['./vehicles-page.component.css'],
})
export class VehiclesPageComponent implements OnInit {
  rentalDetails: RentalDetail[] = [];
  rents: Rental[] = [];
  filteredRentalDetails: RentalDetail[] = [];
  public href: string = '';
  currentFilter: string;
  carDetails: CarDetail[] = [];
  isExistInfo: boolean = false;

  isOpenBrand: boolean = false;
  isOpenColor: boolean = false;
  isOpenBody: boolean = false;
  isGetCar: boolean = false;
  isPopular: boolean = false;

  isActiveColor: boolean = false;
  isActiveBrand: boolean = false;
  isActiveBody: boolean = false;
  isActivePopular: boolean = false;

  dateDetail: RentalDetail;
  upArrow = faAngleDoubleUp;
  downArrow = faAngleDoubleDown;

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.updateActiveFilter();
  }
  ngOnInit(): void {}

  brandOpen() {
    this.isOpenBrand = !this.isOpenBrand;
    this.isOpenColor = false;
    this.isOpenBody = false;
  }
  brandOpenSendChild(isOpenBrand: any) {
    this.isOpenBrand = isOpenBrand;
  }

  colorOpen() {
    this.isOpenColor = !this.isOpenColor;
    this.isOpenBrand = false;
    this.isOpenBody = false;
  }
  colorOpenSendChild(isOpenColor: any) {
    this.isOpenColor = isOpenColor;
  }
  bodyOpen() {
    this.isOpenBody = !this.isOpenBody;
    this.isOpenBrand = false;
    this.isOpenColor = false;
  }
  bodyOpenSendChild(isOpenBody: any) {
    this.isOpenBody = isOpenBody;
  }

  transformDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy', this.locale);
  }

  updateActiveFilter() {
    const currentUrl = this.router.url;
    this.isActiveBrand = currentUrl.includes('brand');
    this.isActiveColor = currentUrl.includes('color');
    this.isActiveBody = currentUrl.includes('body');
    this.isActivePopular = currentUrl.includes('popular');
    this.isGetCar = !(
      this.isActiveBrand ||
      this.isActiveColor ||
      this.isActiveBody ||
      this.isActivePopular
    );
  }

  getAllCar(){
    this.router.navigate(['/cars']);
  }
}
