import { CarDetail } from './../../models/car/carDetailDto';
import { ToastrService } from 'ngx-toastr';
import { RentalDetailService } from './../../services/rental/rentalDetail.service';

import {
  faPalette,
  faGasPump,
  faCarSide,
} from '@fortawesome/free-solid-svg-icons';

import { Component, Inject, Input, LOCALE_ID, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car/car.service';
import { CarImage } from 'src/app/models/car/carImage';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { Rental } from 'src/app/models/rental/rental';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnChanges {
  imageBaseUrl = 'https://geziyoskii.site/';
  carDetails: CarDetail[];
  carDetail: CarDetail;
  filterCarDetail: CarDetail[] = [];
  testCarDetail: CarDetail;

  unavailableCars: CarDetail[] = [];
  availableCars: CarDetail[] = [];
  car: Car;
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
  rentDay: number;
  dailyPrice: number;
  colorIcon = faPalette;
  fuelIcon = faGasPump;
  href: string = '';
  bodyIcon = faCarSide;
  throttle = 0;
  distance = 2;
  page = 1;

  @Input() rentDate: string | undefined;
  @Input() retDate: string | undefined;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private rentalDetailService: RentalDetailService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    @Inject(LOCALE_ID) private locale: string
  ) { }
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

        this.getUnvaliableAllCar(this.rentalDate, this.returnDate);
      } else {
        this.localStorageService.removeItem('newRental');
        this.localStorageService.removeItem('rentalValue');
        this.getAllCarDetail();
      }
    });
  }
  ngOnChanges() {

    if (this.rentDate !== undefined && this.rentDate !== null && this.retDate !== undefined && this.retDate !== null) {
      this.getUnvaliableAllCar(this.rentDate, this.retDate);
    }
  }

  async getAllCarDetail() {
    try {
      const response = await this.carService.getAllCarDetails().toPromise();
      this.carDetails = response.data;
    } catch (error) {
      console.error('Hata oluştu:', error);
    }
  }

  goToVehicles(carId: number) {
    if (this.href !== '/home' && this.href !== '/') {
      if (!this.localStorageService.getItem('rentalValue')) {
        this.toastr.error(
          'Devam etmek için Tarih/Saat/Konum bilgilerini girmeniz gerekmektedir.',
          'Dikkat!'
        );
      } else {
        const storedRental = this.localStorageService.getItem('rentalValue');
        if (storedRental !== undefined) {
          this.rentDay = this.findDay(
            storedRental.rentDate,
            storedRental.returnDate
          );
          let newRental: Rental = {
            id: 0,
            carId: carId,
            userId: 0,
            rentDate: storedRental.rentDate,
            rentTime: storedRental.rentTime,
            rentLocationId: Number(storedRental.rentLocationId),
            returnDate: storedRental.returnDate,
            returnTime: storedRental.returnTime,
            returnLocationId: Number(storedRental.returnLocationId),
            rentDay: this.rentDay,
            totalPrice: 0
          };
          this.localStorageService.removeItem('rentalValue');
          this.localStorageService.setItem('rentalValue', newRental);

          this.router.navigate([
            `reservation/details/car-id/${carId}/rent-date/${storedRental.rentDate}/rent-time/${storedRental.rentTime}/return-date/${storedRental.returnDate}/return-time/${storedRental.returnTime}/rental-location/${storedRental.rentLocationId}/return-location/${storedRental.returnLocationId}`,
          ]);
        } else {
          this.router.navigate([
            `reservation/details/car-id/${carId}/rent-date/${this.rentalDate}/rent-time/${this.rentalTime}/return-date/${this.returnDate}/return-time/${this.returnTime}/rental-location/${this.selectedRentalLocationId}/return-location/${this.selectedReturnLocationId}`,
          ]);
        }
      }
    } else {
      this.router.navigate([`cars`]);
    }
  }

  testA(rentDate: string, returnDate: string) {
    console.log("RENTDATE= " + rentDate + " ----- " + "RETURN DATE = " + returnDate);
  }
  async getUnvaliableAllCar(rentDate: string, returnDate: string) {
    console.log("this.rentDate " + rentDate)
    console.log("this.returnDate " + returnDate);

    await this.getAllCarDetail();
    const newRentDate = this.stringToDate(rentDate);
    const newReturnDate = this.stringToDate(returnDate);

    this.rentalDetailService.getAllRental().subscribe((response) => {
      this.rents = response.data;
      this.rents.forEach((rent) => {
        const newRentalRentDate = this.stringToDate(rent.rentDate);
        const newRentalReturnDate = this.stringToDate(rent.returnDate);
        if (
          (newRentDate <= newRentalRentDate &&
            newRentalRentDate <= newReturnDate) ||
          (newRentDate <= newRentalReturnDate &&
            newRentalReturnDate <= newReturnDate) ||
          (newRentalRentDate <= newRentDate &&
            newReturnDate <= newRentalReturnDate)
        ) {
          this.getUnvaliableCar(rent.carId);
        }
      });
    });
  }

  async getUnvaliableCar(carId: number) {
    let unavailableCar = this.carDetails.find((c) => c.carId === carId);
    if (unavailableCar) {
      this.unavailableCars.push(unavailableCar);
      this.carDetails = this.carDetails.filter(
        (car) => !this.unavailableCars.includes(car)
      );
    }
    if (this.unavailableCars.length === 0) {
      await this.getAllCarDetail();
    }
  }

  stringToDate(dateStr: string): Date {
    // Tarih formatını 'dd.MM.yyyy' şeklinde belirliyoruz.
    const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = dateStr.match(dateRegex);

    if (!match) {
      console.error("Hatalı tarih formatı. Geçerli format: 'dd.MM.yyyy'");
      // Geçersiz tarih için dönüş yerine başka bir şey döndürebiliriz, örneğin bir default tarih.
      return new Date(); // Bu örnek default tarih olarak şu anki zamanı veriyor.
    }

    const day = Number(match[1]);
    const month = Number(match[2]) - 1; // JavaScript'in tarih objesinde aylar 0'dan başlar (Ocak: 0, Şubat: 1, vs.)
    const year = Number(match[3]);

    // Date türü doğru bir şekilde çevrilemeyebilir (örn. 30 Şubat gibi). Bu yüzden kontrol ediyoruz.
    const newDate = new Date(year, month, day);
    if (isNaN(newDate.getTime())) {
      console.error('Geçersiz tarih.');
      // Geçersiz tarih için dönüş yerine başka bir şey döndürebiliriz, örneğin bir default tarih.
      return new Date(); // Bu örnek default tarih olarak şu anki zamanı veriyor.
    }
    return newDate;
  }

  transformDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy', this.locale);
  }

  totalPrice(dailyPrice: number) {
    return dailyPrice * this.rentDay;
  }

  findDay(rentDateStr: string, returnDateStr: string): number {
    const [rentDay, rentMonth, rentYear] = rentDateStr.split('.').map(Number);
    const [returnDay, returnMonth, returnYear] = returnDateStr
      .split('.')
      .map(Number);

    const rentDate = new Date(rentYear, rentMonth - 1, rentDay); // Months are zero-based, so subtract 1
    const returnDate = new Date(returnYear, returnMonth - 1, returnDay); // Months are zero-based, so subtract 1

    let dayDifference: number = Math.floor(
      (returnDate.getTime() - rentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return dayDifference;
  }

  /* FILTERS METHOD */

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

}
