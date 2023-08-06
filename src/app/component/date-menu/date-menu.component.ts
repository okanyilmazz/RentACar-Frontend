import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { TrDatepickerI18n } from 'src/app/directives/trDatepickerI18n';
import { LocationDetailDto } from 'src/app/models/location/locationDetailsDto';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-date-menu',
  templateUrl: './date-menu.component.html',
  styleUrls: ['./date-menu.component.css'],
  providers: [
    {
      provide: NgbDatepickerI18n,
      useClass: TrDatepickerI18n,
    },
  ],
})
export class DateMenuComponent implements OnInit {
  constructor(
    private locationService: LocationService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private localStorageService:LocalStorageService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.localStorageService.removeItem('rentalValue');
  }

  arrowIcon = faAngleDoubleRight;
  filterRentalText: string;
  filterReturnText: string;
  locations: LocationDetailDto[] = [];
  alocations: LocationDetailDto[] = [];
  location: LocationDetailDto;
  isDifferentLocation = false;
  selectedRentalLocation: LocationDetailDto;
  selectedReturnLocation: LocationDetailDto;
  selectedRentalLocationId: number = 0;
  selectedReturnLocationId: number = 0;
  isRentalText: string;
  isReturnText: string;
  rentalDate: string = '';
  rentalTime: string = '--:--';
  returnDate: string = '';
  returnTime: string = '--:--';
  loadTimes: string[] = [];
  rentalInfo: Rental = {
    id: null,
    carId: null,
    userId: null,
    rentDate: null,
    rentTime: null,
    rentLocationId: null,
    returnDate: null,
    returnTime: null,
    returnLocationId: null,
    rentDay: null,
    totalPrice: null,
  };
  rentMinDate: NgbDateStruct = {
    year: this.currentDate().year,
    month: this.currentDate().month,
    day: this.currentDate().day,
  };
  returnMinDate: NgbDateStruct = {
    year: this.rentMinDate.year,
    month: this.rentMinDate.month,
    day: this.rentMinDate.day + 1,
  };

  dateAddForm: FormGroup;

  ngOnInit(): void {
    this.getLocationDetails();
    this.isRentalText = this.filterRentalText;
    this.isReturnText = this.filterReturnText;
    this.loadTimeList();
    this.activatedRoute.params.subscribe((params) => {
      const {
        rentalDate,
        rentalTime,
        returnDate,
        returnTime,
        selectedRentalLocationId,
        selectedReturnLocationId,
      } = params;
      if (
        rentalDate &&
        rentalTime &&
        returnDate &&
        returnTime &&
        selectedRentalLocationId &&
        selectedReturnLocationId
      ) {
        this.getRentalLocationDetailsById(params['selectedRentalLocationId']);
        this.getReturnLocationDetailsById(params['selectedReturnLocationId']);

        this.rentalInfo = {
          id: null,
          carId: null,
          userId: null,
          rentDate: params['rentalDate'],
          rentTime: params['rentalTime'],
          rentLocationId: params['selectedRentalLocationId'],
          returnDate: params['returnDate'],
          returnTime: params['returnTime'],
          returnLocationId: params['selectedReturnLocationId'],
          rentDay: null,
          totalPrice: null,
        };

        this.selectedRentalLocationId = params['selectedRentalLocationId'];
        this.selectedReturnLocationId = params['selectedReturnLocationId'];
        this.getRentalInfoByParameters(this.rentalInfo);
      } else {
        // this.createDateAddForm();
      }
    });
  }

  getRentalInfoByParameters(rentalInfo: any) {
    this.rentalDate = rentalInfo.rentDate;
    this.rentalTime = rentalInfo.rentTime;
    this.returnDate = rentalInfo.returnDate;
    this.returnTime = rentalInfo.returnTime;
    this.selectedRentalLocationId = rentalInfo.rentLocationId;
    this.selectedReturnLocationId = rentalInfo.returnLocationId;
    this.localStorageService.setItem('rentalValue',rentalInfo);
  }

  getLocationDetails() {
    this.locationService.getLocationDetails().subscribe((response) => {
      this.locations = response.data;
    });
  }

  getRentalLocationDetailsById(locationId: number): any {
    this.locationService
      .getLocationDetailsById(locationId)
      .subscribe((response) => {
        this.filterRentalText = response.data.title;
      });
  }

  getReturnLocationDetailsById(locationId: number): any {
    this.locationService
      .getLocationDetailsById(locationId)
      .subscribe((response) => {
        this.filterReturnText = response.data.title;
      });
  }

  returnValueCheck() {
    this.isReturnText = this.filterReturnText;
  }

  rentalValueCheck() {
    this.isRentalText = this.filterRentalText;
  }

  rentalLocationClickX() {
    this.selectedRentalLocation = undefined;
  }

  returnLocationClickX() {
    this.selectedReturnLocation = undefined;
  }

  selectRentalLocation(location: LocationDetailDto) {
    this.selectedRentalLocation = location;
    this.filterRentalText = this.selectedRentalLocation.title;
    this.isRentalText = '';
    this.selectedRentalLocationId = this.selectedRentalLocation.id;
    this.checkAllInfo();
  }

  selectReturnLocation(location: LocationDetailDto) {
    this.selectedReturnLocation = location;
    this.filterReturnText = this.selectedReturnLocation.title;
    this.isReturnText = '';
    this.selectedReturnLocationId = this.selectedReturnLocation.id;
    this.checkAllInfo();
  }

  findDay(rentalDate: string, returnDate: string): any {
    let rentalDateSplit = rentalDate.split('.');
    let returnDateSplit = returnDate.split('.');

    let returnDay: number = +returnDateSplit[0];
    let rentalDay: number = +rentalDateSplit[0];
    let returnMonth: number = +returnDateSplit[1];
    let rentalMonth: number = +rentalDateSplit[1];
    let returnYear: number = +returnDateSplit[2];
    let rentalYear: number = +returnDateSplit[2];

    let dayDifference: number = returnDay - rentalDay;
    let monthDifference: number = returnMonth - rentalMonth;
    let yearDifference: number = returnYear - rentalYear;
    dayDifference = dayDifference + monthDifference * 30 + yearDifference * 365;
    return dayDifference;
  }

  // checkAllInfo() {
  //   console.log("çalıştı")
  //   let rentalValue = this.dateAddForm.value;
  //   rentalValue.rentLocationId = this.selectedRentalLocationId;
  //   rentalValue.returnLocationId = this.selectedReturnLocationId;

  //   console.log(this.dateAddForm.value);

  //   if (this.dateAddForm.valid) {
  //     console.log("girdi")
  //   }
  //   else{
  //     console.log(this.dateAddForm.value);
  //   }
  // }

  checkAllInfo() {
    this.localStorageService.removeItem('rentalValue');
    if (
      this.rentalDate &&
      this.returnDate &&
      this.rentalTime &&
      this.returnTime &&
      this.filterRentalText &&
      this.filterReturnText
    ) {
      this.rentalInfo = {
        id: null,
        carId: null,
        userId: null,
        rentDate: this.rentalDate,
        rentTime: this.rentalTime,
        rentLocationId: this.selectedRentalLocationId,
        returnDate: this.returnDate,
        returnTime: this.returnTime,
        returnLocationId: this.selectedReturnLocationId,
        rentDay: null,
        totalPrice: null,
      };
      this.localStorageService.setItem('rentalValue',this.rentalInfo);
    }
  }

  onRentDateSelect(event: any) {
    this.returnMinDate.year = event.year;
    this.returnMinDate.month = event.month;
    this.returnMinDate.day = event.day + 1;
    this.returnDate = '';
    this.rentalDate = this.dateTransform(event);
    // this.dateAddForm.patchValue({ returnDate: '' });
    this.checkAllInfo();
  }

  onReturnDateSelect(event: any) {
    this.returnDate = this.dateTransform(event);
    this.checkAllInfo();
  }

  dateTransform(event: any) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    let finalDate = day + '.' + month + '.' + year;
    return finalDate;
  }

  stringToDateTransfrom(date: string): any {
    const dateArray = date.split('.');
    const day = parseInt(dateArray[0], 10);
    const month = parseInt(dateArray[1], 10) - 1;
    const year = parseInt(dateArray[2], 10);

    const dateObject = { year: year, month: month, day: day };
    return dateObject;
  }
  private currentDate() {
    var todayDate = new Date();
    return {
      year: todayDate.getFullYear(),
      month: todayDate.getMonth() + 1,
      day: todayDate.getDate(),
    };
  }

  transformDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy', this.locale);
  }

  loadTimeList() {
    this.loadTimes = [
      '00:00',
      '00:30',
      '01:00',
      '01:30',
      '02:00',
      '02:30',
      '03:00',
      '03:30',
      '04:00',
      '04:30',
      '05:00',
      '05:30',
      '06:00',
      '06:30',
      '07:00',
      '07:30',
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30',
      '22:00',
      '22:30',
      '23:00',
      '23:30',
    ];
  }
}
