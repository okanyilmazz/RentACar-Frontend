import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  LOCALE_ID,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { TrDatepickerI18n } from 'src/app/directives/trDatepickerI18n';


import { LocationDetailDto } from 'src/app/models/location/locationDetailsDto';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-date-menu',
  templateUrl: './date-menu.component.html',
  styleUrls: ['./date-menu.component.css'],
  providers: [
    {
      provide: NgbDatepickerI18n,
      useClass: TrDatepickerI18n
    }
  ]
})
export class DateMenuComponent implements OnInit {
  constructor(
    private locationService: LocationService,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string
  ) {}
  @Output() RentalEvent = new EventEmitter<boolean>();
  @Output() DateEvent = new EventEmitter<boolean>();
  @Output() DateDetailEvent = new EventEmitter<RentalDetail>();
  arrowIcon = faAngleDoubleRight;
  filterRentalText: string;
  filterReturnText: string;
  locations: LocationDetailDto[] = [];
  alocations: LocationDetailDto[] = [];
  location: LocationDetailDto;
  isDifferentLocation = false;
  selectedRentalLocation: LocationDetailDto;
  selectedReturnLocation: LocationDetailDto;
  selectedRentalLocationId: number;
  selectedReturnLocationId: number;
  isRentalText: string;
  isReturnText: string;
  rentalDate: string="";
  rentalTime: string="--:--";
  returnDate: string="";
  returnTime: string="--:--";
  loadTimes: string[] = [];
  testId: number;
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

  ngOnInit(): void {
    this.getLocationDetails();
    this.isRentalText = this.filterRentalText;
    this.isReturnText = this.filterReturnText;
    this.loadTimeList();
    this.activatedRoute.params.subscribe((params) => {
      if (
        params['rentalDate'] &&
        params['rentalTime'] &&
        params['returnDate'] &&
        params['returnTime'] &&
        params['selectedRentalLocationId'] &&
        params['selectedReturnLocationId']
      ) {
        this.getRentalLocationDetailsById(params['selectedRentalLocationId']);
        this.getReturnLocationDetailsById(params['selectedReturnLocationId']);

        let newRental: RentalDetail = {
          id: null,
          rentDate: params['rentalDate'],
          rentTime: params['rentalTime'],
          returnDate: params['returnDate'],
          returnTime: params['returnTime'],
          brandName: null,
          firstName: null,
          lastName: null,
          rentLocationId: params['selectedRentalLocationId'],
          returnLocationId: params['selectedReturnLocationId'],
          rentDay: this.findDay(params['rentalDate'], params['returnDate']),
          totalPrice: null,
        };

        this.checkDate(true);
        localStorage.removeItem('newRental');
        localStorage.setItem('newRental', JSON.stringify(newRental));
        this.createNewRentalModel(newRental);
      } else if (this.rentalDate !== null && this.returnDate !== null) {
      } else {
        this.checkDate(false);
      }
    });
  }

  createNewRentalModel(newRental: RentalDetail) {
    this.rentalDate = newRental.rentDate;
    this.rentalTime = newRental.rentTime;
    this.returnDate = newRental.returnDate;
    this.returnTime = newRental.returnTime;
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
  }

  selectReturnLocation(location: LocationDetailDto) {
    this.selectedReturnLocation = location;
    this.filterReturnText = this.selectedReturnLocation.title;
    this.isReturnText = '';
    this.selectedReturnLocationId = this.selectedReturnLocation.id;
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

  checkDate(isExistDate: boolean) {
    this.RentalEvent.emit(isExistDate);
  }

  checkAllInfo() {
    if (
      this.rentalDate !== undefined &&
      this.returnDate !== undefined &&
      this.rentalTime !== undefined &&
      this.returnTime !== undefined &&
      this.filterRentalText !== undefined &&
      this.filterReturnText !== undefined
    ) {
      this.checkDateDetail();
      this.DateEvent.emit(true);
    }
  }
  checkDateDetail() {

    let filterRental: RentalDetail = {
      id: null,
      rentDate: this.rentalDate,
      rentTime: this.rentalTime,
      returnDate: this.returnDate,
      returnTime: this.returnTime,
      brandName: null,
      firstName: null,
      lastName: null,
      rentLocationId: this.selectedRentalLocationId,
      returnLocationId: this.selectedReturnLocationId,
      rentDay: null,
      totalPrice: null,
    };

    this.DateDetailEvent.emit(filterRental);
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

  private currentDate() {
    var todayDate = new Date();

    return {
      year: todayDate.getFullYear(),
      month: todayDate.getMonth() + 1,
      day: todayDate.getDate(),
    };
  }
}
