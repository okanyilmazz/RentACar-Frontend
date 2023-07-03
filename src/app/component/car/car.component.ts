import { CarDetail } from './../../models/car/carDetailDto';
import { ToastrService } from 'ngx-toastr';
import { RentalDetailService } from './../../services/rental/rentalDetail.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  faPalette,
  faGasPump,
  faCarSide,
} from '@fortawesome/free-solid-svg-icons';
import { CarImageService } from './../../services/car-image/car-image.service';
import {
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car/car.service';
import { CarImage } from 'src/app/models/car/carImage';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { Rental } from 'src/app/models/rental/rental';
import { faTheRedYeti } from '@fortawesome/free-brands-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnChanges {
  carDetails: CarDetail[];
  carDetail: CarDetail;
  filterCarDetail: CarDetail[] = [];
  testCarDetail: CarDetail;

  unavailableCars: CarDetail[] = [];
  availableCars: CarDetail[] = [];
  cars: Car[];
  carImages: CarImage[];
  rents: Rental[] = [];
  rentalDetails: RentalDetail[] = [];
  rentalDetail: RentalDetail;
  newRental: RentalDetail[];
  rentalDate: string;
  rentalTime: string;
  returnDate: string;
  returnTime: string;
  selectedRentalLocationId: number;
  selectedReturnLocationId: number;
  @Input() isNull: boolean;
  @Input() isExistInfo: boolean;
  @Input() dateDetail: RentalDetail;

  colorIcon = faPalette;
  fuelIcon = faGasPump;
  href: string = '';
  bodyIcon = faCarSide;
  throttle = 0;
  distance = 2;
  page = 1;
  imageBaseUrl = 'https://webservis.geziyoskii.site/';

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private rentalDetailService: RentalDetailService,
    @Inject(LOCALE_ID) private locale: string
  ) {}
  ngOnInit(): void {
    this.href = this.router.url;
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId'] && params['bodyId']) {
        this.getByBrandColorAndBody(
          params['brandId'],
          params['colorId'],
          params['bodyId']
        );
      } else if (params['brandId'] && params['colorId']) {
        this.getColorAndBrandFilter(params['brandId'], params['colorId']);
      } else if (params['brandId'] && params['bodyId']) {
        this.getBrandAndBodyFilter(params['brandId'], params['bodyId']);
      } else if (params['colorId'] && params['bodyId']) {
        this.getBodyAndColorFilter(params['bodyId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarByColor(params['colorId']);
      } else if (params['bodyId']) {
        this.getCarByBody(params['bodyId']);
      } else if (params['carId']) {
        this.getCarDetailByClick(params['carId']);
      } else if (
        params['rentalDate'] &&
        params['rentalTime'] &&
        params['returnDate'] &&
        params['returnTime'] &&
        params['selectedRentalLocationId'] &&
        params['selectedReturnLocationId']
      ) {
        this.rentalDate = params['rentalDate'];
        this.rentalTime = params['rentalTime'];
        this.returnDate = params['returnDate'];
        this.returnTime = params['returnTime'];
        this.selectedRentalLocationId = params['selectedRentalLocationId'];
        this.selectedReturnLocationId = params['selectedReturnLocationId'];

        let newRental: RentalDetail = {
          id: null,
          rentDate: this.rentalDate,
          rentTime: this.rentalTime,
          returnDate: this.returnDate,
          returnTime: this.returnTime,
          brandName: null,
          firstName: null,
          lastName: null,
          rentLocationId: null,
          returnLocationId: null,
          totalPrice: null,
          rentDay: null,
        };

        this.rentalDetail = newRental;
        this.isExistAvailableCar(newRental);
      } else {
        this.getAllCarDetail();
      }
    });
  }
  ngOnChanges() {
    if (this.isExistInfo) {
      if (this.dateDetail !== undefined) {
        this.availableCars.splice(0);
        this.isExistAvailableCar(this.dateDetail);
        this.isNull = true;
      }
    }
  }
  getAllCarDetail() {
    this.carService.getAllCarDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarByBrand(brandId: number) {
    this.carService.getCarDetailByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getCarByColor(colorId: number) {
    this.carService.getCarDetailByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getCarByBody(bodyId: number) {
    this.carService.getCarDetailByBody(bodyId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarDetailByClick(carId: number) {
    this.carService.getCarDetailByClick(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getColorAndBrandFilter(brandId: number, colorId: number) {
    this.carService
      .getCarDetailByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.carDetails = response.data;
      });
  }

  getByBrandColorAndBody(brandId: number, colorId: number, bodyId: number) {
    this.carService
      .getCarDetailByBrandColorAndBody(brandId, colorId, bodyId)
      .subscribe((response) => {
        this.carDetails = response.data;
      });
  }
  getBrandAndBodyFilter(brandId: number, bodyId: number) {
    this.carService
      .getCarDetailByBrandAndColor(brandId, bodyId)
      .subscribe((response) => {
        this.carDetails = response.data;
      });
  }
  getBodyAndColorFilter(bodyId: number, colorId: number) {
    this.carService
      .getCarDetailByBodyAndColor(bodyId, colorId)
      .subscribe((response) => {
        this.carDetails = response.data;
      });
  }

  test(currentCarId: number) {

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

  goToVehicles(carId: number) {
    if (this.href !== '/home') {
      if (this.isNull === false) {
        this.toastr.error(
          'Devam etmek için Tarih/Saat/Konum bilgilerini girmeniz gerekmektedir.',
          'Dikkat!'
        );
      } else {
        if (this.dateDetail !== undefined) {
          let newRental: RentalDetail = {
            id: null,
            rentDate:   this.dateDetail.rentDate,
            rentTime:   this.dateDetail.rentTime,
            returnDate: this.dateDetail.returnDate,
            returnTime: this.dateDetail.returnTime,
            brandName: null,
            firstName: null,
            lastName: null,
            rentLocationId: this.dateDetail.rentLocationId,
            returnLocationId: this.dateDetail.rentLocationId,
            totalPrice: null,
            rentDay: this.findDay(this.dateDetail.rentDate, this.dateDetail.returnDate)
          };

          localStorage.removeItem('newRental');
          localStorage.setItem('newRental', JSON.stringify(newRental));

          this.router.navigate([
            `reservation/details/car-id/${carId}/rent-date/${this.dateDetail.rentDate}/rent-time/${this.dateDetail.rentTime}/return-date/${this.dateDetail.returnDate}/return-time/${this.dateDetail.returnTime}/rental-location/${this.dateDetail.rentLocationId}/return-location/${this.dateDetail.returnLocationId}`,
          ]);
        }
        else{
          this.router.navigate([
            `reservation/details/car-id/${carId}/rent-date/${this.rentalDate}/rent-time/${this.rentalTime}/return-date/${this.returnDate}/return-time/${this.returnTime}/rental-location/${this.selectedRentalLocationId}/return-location/${this.selectedReturnLocationId}`,
          ]);
        }
      }
    } else {
      this.router.navigate([`cars`]);
    }
  }

  isExistAvailableCar(rentalDetail: RentalDetail) {
    console.log("girdi");
    this.getAllCarDetail();
    this.rentalDetailService.getAllRental().subscribe((response) => {
      this.rents = response.data.filter(function (rental) {
        console.log("rental.rentDate = " +rental.rentDate)
        console.log("rentalDetail.rentDate = " +rentalDetail.rentDate)
        return rental.rentDate == rentalDetail.rentDate;

      });
      if (this.rents.length === 0) {
        this.getAllCarDetail();
      }
      this.unavailableCars = [];
      this.rents.forEach((rent) => {
        this.getUnvaliableAllCar(rent.carId);
      });

      // carDetails = this.availableCars;
      // this.carDetails = carDetails;
      // console.log('first CarDetails = ' + carDetails);
      // console.log('first availableCars = ' + this.unavailableCars);
      // console.log('---------------------------------------------');

      // console.log('last CarDetails = ' + carDetails);
      // console.log('last availableCars = ' + this.unavailableCars);
      // this.carDetails = carDetails;
      // this.getAvailableCar(this.carDetails, this.unavailableCars);

      this.getAvailableCar(this.carDetails, this.unavailableCars);
      this.carDetails = this.availableCars;
    });

    // this.availableCars.forEach((element) => {
    //   var index = this.availableCars.indexOf(element);
    //   this.carDetails.splice(index, 1);
    // });
  }

  getAvailableCar(carDetails: CarDetail[], unavailableCars: CarDetail[]) {
    carDetails.forEach((car) => {
      const test = unavailableCars.indexOf(car);
      if (test === -1) {
        this.availableCars.push(car);
      }
    });
  }

  testO(carDetails: CarDetail[], unavailableCars: CarDetail[]) {
    carDetails.forEach((car) => {
      unavailableCars.forEach((unavailableCar) => {
        if (car === unavailableCar) {

          this.availableCars.push(car);
        }
      });
    });
  }

  getUnvaliableAllCar(carId: number) {
    if (this.carDetails !== undefined) {
      this.carDetails.forEach((car) => {
        if (car.carId === carId) {
          this.unavailableCars.push(car);
        }
      });
    }
  }

  tes(carId: number) {
    this.carService.getCarDetailByClick(carId).subscribe((response) => {
      response.data.forEach((element) => {
        this.testCarDetail = element;
        this.filterCarDetail.push(this.testCarDetail);
      });
      this.carDetails = this.filterCarDetail;
    });
  }

  transformDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy', this.locale);
  }


}
