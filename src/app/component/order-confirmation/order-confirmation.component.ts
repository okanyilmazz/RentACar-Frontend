import { LocationService } from 'src/app/services/location/location.service';
import { CountyService } from './../../services/county/county.service';
import { County } from './../../models/county/county';
import { CountryService } from './../../services/country/country.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faAngleDoubleRight,
  faCreditCard,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { CarDetail } from 'src/app/models/car/carDetailDto';
import { CarImage } from 'src/app/models/car/carImage';
import { City } from 'src/app/models/city/city';
import { CarImageService } from 'src/app/services/car-image/car-image.service';
import { CarService } from 'src/app/services/car/car.service';
import { CityService } from 'src/app/services/city/city.service';
import { Country } from 'src/app/models/country/country';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DriverService } from 'src/app/services/driver/driver.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetailService } from 'src/app/services/rental/rentalDetail.service';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { PaymentService } from 'src/app/services/payment/payment';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css'],
})
export class OrderConfirmationComponent implements OnInit {
  carDetails: CarDetail[];
  carDetail: CarDetail;
  carImages: CarImage[];
  cities: City[];
  selectedCity: City;
  countries: Country[];
  counties: County[];
  rental: Rental;
  imageUrl = 'https://webservis.geziyoskii.site/';
  rightArrowIcon = faAngleDoubleRight;
  cardIcon = faCreditCard;
  infoIcon = faInfoCircle;
  isCollapsed = true;
  isCitySelected = true;
  isCountySelected = true;
  selectedCountryId: number;
  selectedCityId: number;
  selectedCountieId: number;
  billingAddress: string;
  companyTitle: string;
  taxAdministration: number;
  taxNumber: number;
  carId: number;
  rentalLocationTitle: string;
  returnLocationTitle: string;
  isSuccessRental = true;
  orderAddForm: FormGroup;
  cityBase: string = 'Şehir seç';
  countyBase: string = 'İlçe seç';
  countryBase: string = 'Ülke seç';
  testRental: Rental;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private cityService: CityService,
    private router: Router,
    private toastr: ToastrService,
    private locationService: LocationService,
    private countryService: CountryService,
    private countyService: CountyService,
    private driverService: DriverService,
    private toastrService: ToastrService,
    config: NgbModalConfig,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private rentalService: RentalDetailService,
    private invoiceService: InvoiceService,
    private localStorageService: LocalStorageService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    //this.getCity();
    this.getCountry();
    // this.getCounty();
  }
  isActive = true;
  ngOnInit(): void {
    localStorage.removeItem('orderDetails');
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailByCarId(params['carId']);
      this.getImageByCarId(params['carId']);
      this.carId = params['carId'];
      this.rental = JSON.parse(localStorage.getItem('newRental'));
      this.getRentalLocationDetailsById(this.rental.rentLocationId);
      this.getReturnLocationDetailsById(this.rental.returnLocationId);
      this.createOrderAddForm();
    });
  }

  createOrderAddForm() {
    this.orderAddForm = this.formBuilder.group({
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],
      countieId: ['', Validators.required],
      address: ['', Validators.required],
      companyTitle: [],
      taxAdministration: [],
      taxNumber: [0],
    });
  }

  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailByClick(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.carDetails.forEach((element) => {
        this.carDetail = element;
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
  testA() {
    this.isCollapsed = true;
  }
  testB() {
    this.isCollapsed = false;
  }
  isExistAirConditioner(airConditioning: boolean) {
    if (airConditioning === true) {
      return 'Klimalı';
    } else {
      return 'Klimasız';
    }
  }
  totalPrice(dailyPrice: number) {
    return dailyPrice * this.rental.rentDay;
  }

  getCity() {
    this.cityService.getAllCity().subscribe((response) => {
      this.cities = response.data;
    });
  }
  getCountry() {
    this.countryService.getAllCountry().subscribe((response) => {
      this.countries = response.data;
    });
  }
  getCounty() {
    this.countyService.getAllCounty().subscribe((response) => {
      this.counties = response.data;
    });
  }

  changeCountry(e: any) {
    this.selectedCountryId = e.target.value;
    this.cityService
      .getAllByCountryId(this.selectedCountryId)
      .subscribe((response) => {
        this.cities = response.data;
      });
    if (this.cities !== undefined) {
      this.isCitySelected = false;
    }
  }

  changeCity(e: any) {
    this.selectedCityId = e.target.value;
    this.countyService
      .getAllByCityId(this.selectedCityId)
      .subscribe((response) => {
        this.counties = response.data;
      });
    if (this.counties !== undefined) {
      this.isCountySelected = false;
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

  finishTheOrder(content: any) {
    if (this.orderAddForm.valid) {
      let orderModel = Object.assign({}, this.orderAddForm.value);
      this.invoiceService.add(orderModel).subscribe(
        (response) => {
          if (response.success) {
            this.toastr.success(response.message, 'Rezervasyon tamamlandı!');
          }
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastr.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
      this.localStorageService.removeItem('orderDetails');
      this.localStorageService.setItem('orderDetails', orderModel);

      this.modalService.open(content, { scrollable: true });
      this.addRental();
      this.addDriver();
      this.addPayment();
      this.router.navigate([`home`]);
    } else {
      this.toastrService.error('Gerekli alanları doldurmalısınız.', 'Dikkat');
    }
  }

  addRental() {
    let newRentalDetail = this.localStorageService.getItem('newRental');

    this.rental = {
      id: 0,
      carId: newRentalDetail.carId,
      userId: 0,
      rentDate: newRentalDetail.rentDate,
      rentDay: newRentalDetail.rentDay,
      rentLocationId: newRentalDetail.rentLocationId,
      rentTime: newRentalDetail.rentTime,
      returnDate: newRentalDetail.returnDate,
      returnLocationId: newRentalDetail.returnLocationId,
      returnTime: newRentalDetail.returnTime,
      totalPrice: newRentalDetail.totalPrice,
    };
    this.rentalService.add(this.rental).subscribe(
      (response) => {},
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastr.error(
              responseError.error.Errors[i].ErrorMessage,
              'Rezervasyon Oluşturulamadı.'
            );
          }
        }
      }
    );
  }

  addDriver() {
    let driverDetails = this.localStorageService.getItem('driverDetails');
    const birthDate = this.dateTransform(driverDetails.birthDate);
    driverDetails.birthDate = birthDate;
    if (driverDetails.userId !== null) {
      this.driverService.add(driverDetails).subscribe((response) => {});
    }
  }

  addPayment() {
    let paymentDetails = this.localStorageService.getItem('paymentDetails');

    if (paymentDetails.userId !== null) {
      this.paymentService.add(paymentDetails).subscribe((response) => {});
    }
  }

  dateTransform(event: any) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    let finalDate = day + '.' + month + '.' + year;
    return finalDate;
  }
}
