import { CarDetail } from './../../models/car/carDetailDto';
import { CarService } from 'src/app/services/car/car.service';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetail } from './../../models/rental/rentalDetail';
import {
  Component,
  ElementRef,
  Inject,
  LOCALE_ID,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalDetailService } from 'src/app/services/rental/rentalDetail.service';
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
  isNull: boolean = false;
  isExistInfo: boolean = false;
  isOpenBrand: boolean = false;
  isOpenColor: boolean = false;
  isActiveColor: boolean = false;
  isActiveBrand: boolean = false;
  isActiveBody: boolean = false;
  isActivePopular: boolean = false;
  isOpenBody: boolean = false;
  isGetCar: boolean = false;
  isPopular: boolean = false;
  dateDetail: RentalDetail;
  upArrow = faAngleDoubleUp;
  downArrow = faAngleDoubleDown;
  constructor(
    private carService: CarService,
    private datePipe: DatePipe,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.href = this.router.url;

    if (this.href.includes('brand')) {
      this.isActiveBrand = true;
      this.isActiveColor = false;
      this.isActiveBody = false;
      this.isActivePopular = false;
      this.isGetCar = false;
    } else if (this.href.includes('color')) {
      this.isActiveBrand = false;
      this.isActiveColor = true;
      this.isActiveBody = false;
      this.isActivePopular = false;
      this.isGetCar = false;
    } else if (this.href.includes('body')) {
      this.isActiveBrand = false;
      this.isActiveColor = false;
      this.isActiveBody = true;
      this.isActivePopular = false;
      this.isGetCar = false;
    } else {
      this.isActiveBrand = false;
      this.isActiveColor = false;
      this.isActiveBody = false;
      this.isActivePopular = false;
      this.isGetCar = true;
    }
  }
  ngOnInit(): void {}
  checkDate(isExistDate: boolean) {
    this.isNull = isExistDate;
  }

  checkAllInfo(isExistDate: boolean) {
    this.isExistInfo = isExistDate;

    if (this.isExistInfo) {
      this.router.navigate([`cars`]);
    }
  }

  checkDateDetail(isExistData: RentalDetail) {
    // isExistData.rentDate = this.transformDate(isExistData.rentDate);
    // isExistData.returnDate = this.transformDate(isExistData.returnDate);
    this.dateDetail = isExistData;
    console.log(this.dateDetail);
  }

  transformDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy', this.locale);
  }
  brandOpen() {
    this.isOpenBrand = !this.isOpenBrand;
  }
  brandOpenSendChild(isOpenBrand: any) {
    this.isOpenBrand = isOpenBrand;
  }

  colorOpen() {
    this.isOpenColor = !this.isOpenColor;
  }
  colorOpenSendChild(isOpenColor: any) {
    this.isOpenColor = isOpenColor;
  }
  bodyOpen() {
    this.isOpenBody = !this.isOpenBody;
  }
  bodyOpenSendChild(isOpenBody: any) {
    this.isOpenBody = isOpenBody;
  }

  getAllCar() {
    this.router.navigate(['/cars']);
  }
}
