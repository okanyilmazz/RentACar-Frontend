import { LocationDetailDto } from './../../models/location/locationDetailsDto';
import { LocationService } from './../../services/location/location.service';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TimeList } from 'src/app/models/time/timeList';
import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { TrDatepickerI18n } from 'src/app/directives/trDatepickerI18n';
declare const myTest: any;
@Component({
  selector: 'app-reservation-date',
  templateUrl: './reservation-date.component.html',
  styleUrls: ['./reservation-date.component.css'],
  providers: [
    {
      provide: NgbDatepickerI18n,
      useClass: TrDatepickerI18n
    }
  ]
})
export class ReservationDateComponent implements OnInit {
  constructor(
    private locationService: LocationService,
    private datePipe: DatePipe,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  filterRentalText: string;
  filterReturnText: string;
  locations: LocationDetailDto[];
  isDifferentLocation = false;
  selectedRentalLocation: LocationDetailDto;
  selectedReturnLocation: LocationDetailDto;
  isRentalText: string;
  isReturnText: string;
  rentalDate: string = '';
  rentalTime: string;
  returnDate: string = '';
  returnTime: string;
  loadTimes: string[] = [];
  sonReturnTime: TimeList;
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
  transformDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.YYYY', this.locale);
  }

  ngOnInit(): void {
    this.getLocationDetails();
    this.isRentalText = this.filterRentalText;
    this.isReturnText = this.filterReturnText;
    this.loadTimeList();
  }

  getLocationDetails() {
    this.locationService.getLocationDetails().subscribe((response) => {
      this.locations = response.data;
    });
  }
  selectRentalLocation(location: LocationDetailDto) {
    this.selectedRentalLocation = location;
    this.filterRentalText = this.selectedRentalLocation.title;
    this.isRentalText = '';
  }

  selectReturnLocation(location: LocationDetailDto) {
    this.selectedReturnLocation = location;
    this.filterReturnText = this.selectedReturnLocation.title;
    this.isReturnText = '';
  }
  returnValueCheck() {
    this.isReturnText = this.filterReturnText;
  }
  rentalValueCheck() {
    this.isRentalText = this.filterRentalText;
  }

  onClickSubmit(data: any) {
    console.log('rentaldate : ' + this.rentalDate);
    console.log('returndate : ' + this.returnDate);
    console.log('rentaltime : ' + this.rentalTime);
    console.log('returntime : ' + this.returnTime);
    // this.rentalDate = this.transformDate(this.rentalDate);
    // this.returnDate = this.transformDate(this.returnDate);

    if (this.isDifferentLocation === false) {
      this.selectedReturnLocation = undefined;
    }
    if (this.selectedReturnLocation === undefined) {
      this.router.navigate([
        `cars/rent-date/${this.rentalDate}/rent-time/${this.rentalTime}/return-date/${this.returnDate}/return-time/${this.returnTime}/rental-location/${this.selectedRentalLocation.id}/return-location/${this.selectedRentalLocation.id}`,
      ]);
    } else {
      this.router.navigate([
        `cars/rent-date/${this.rentalDate}/rent-time/${this.rentalTime}/return-date/${this.returnDate}/return-time/${this.returnTime}/rental-location/${this.selectedRentalLocation.id}/return-location/${this.selectedReturnLocation.id}`,
      ]);
    }
  }
  rentalLocationClickX() {
    this.selectedRentalLocation = undefined;
  }
  returnLocationClickX() {
    this.selectedReturnLocation = undefined;
  }
  testi() {
    this.rentalDate = this.rentalDate.replace('.', '/');
    console.log('rentalDate ' + this.rentalDate);
  }
  onRentDateSelect(event: any) {
    this.returnMinDate.year = event.year;
    this.returnMinDate.month = event.month;
    this.returnMinDate.day = event.day + 1;
    this.rentalDate = this.dateTransform(event);
    this.returnDate = '';
  }
  onReturnDateSelect(event: any) {
    this.returnDate = this.dateTransform(event);
  }

  dateTransform(event: any) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    let finalDate = day + '.' + month + '.' + year;
    return finalDate;
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

    // this.Times = [
    //   { hour: 0, minute: 0 },
    //   { hour: 0, minute: 30 },
    //   { hour: 1, minute: 0 },
    //   { hour: 1, minute: 30 },
    //   { hour: 2, minute: 0 },
    //   { hour: 2, minute: 30 },
    //   { hour: 3, minute: 0 },
    // { hour: '03', minute: '30' },
    // { hour: '04', minute: '00' },
    // { hour: '04', minute: '30' },
    // { hour: '05', minute: '00' },
    // { hour: '05', minute: '30' },
    // { hour: '06', minute: '00' },
    // { hour: '06', minute: '30' },
    // { hour: '07', minute: '00' },
    // { hour: '07', minute: '30' },
    // { hour: '08', minute: '00' },
    // { hour: '08', minute: '30' },
    // { hour: '09', minute: '00' },
    // { hour: '09', minute: '30' },
    // { hour: '10', minute: '00' },
    // { hour: '10', minute: '30' },
    // { hour: '11', minute: '00' },
    // { hour: '11', minute: '30' },
    // { hour: '12', minute: '00' },
    // { hour: '12', minute: '30' },
    // { hour: '13', minute: '00' },
    // { hour: '13', minute: '30' },
    // { hour: '14', minute: '00' },
    // { hour: '14', minute: '30' },
    // { hour: '15', minute: '00' },
    // { hour: '15', minute: '30' },
    // { hour: '16', minute: '00' },
    // { hour: '16', minute: '30' },
    // { hour: '17', minute: '00' },
    // { hour: '17', minute: '30' },
    // { hour: '18', minute: '00' },
    // { hour: '18', minute: '30' },
    // { hour: '19', minute: '00' },
    // { hour: '19', minute: '30' },
    // { hour: '20', minute: '00' },
    // { hour: '20', minute: '30' },
    // { hour: '21', minute: '00' },
    // { hour: '21', minute: '30' },
    // { hour: '22', minute: '00' },
    // { hour: '22', minute: '30' },
    // { hour: '23', minute: '00' },
    // { hour: '23', minute: '30' },
    //];
  }

  private currentDate() {
    var todayDate = new Date();

    return {
      year: todayDate.getFullYear(),
      month: todayDate.getMonth() + 1,
      day: todayDate.getDate(),
    };
  }
}
