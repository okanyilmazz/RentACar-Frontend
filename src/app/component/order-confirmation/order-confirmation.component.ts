import { LocationService } from 'src/app/services/location/location.service';
import { Invoice } from '../../models/invoice/invoice';
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
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DriverService } from 'src/app/services/driver/driver.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Driver } from 'src/app/models/driver/driver';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetailService } from 'src/app/services/rental/rentalDetail.service';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';

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
  rentDetail: RentalDetail;
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
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private rentalService: RentalDetailService,
    private invoiceService: InvoiceService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    //this.getCity();
    this.getCountry();
    // this.getCounty();
  }
  isActive = true;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailByCarId(params['carId']);
      this.getImageByCarId(params['carId']);
      this.carId = params['carId'];
      this.rentDetail = JSON.parse(localStorage.getItem('newRental'));
      this.getRentalLocationDetailsById(this.rentDetail.rentLocationId);
      this.getReturnLocationDetailsById(this.rentDetail.returnLocationId);
      this.createOrderAddForm();
    });
  }

  createOrderAddForm() {
    this.orderAddForm = this.formBuilder.group({
      countryId: ['', Validators.required],
      countieId: ['', Validators.required],
      cityId: ['', Validators.required],
      address: ['', Validators.required],
      companyTitle: [''],
      taxAdministration: [''],
      taxNumber: [''],
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
    return dailyPrice * this.rentDetail.rentDay;
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
      console.log(
        orderModel.countryId,
        orderModel.countieId,
        orderModel.cityId,
        orderModel.address,
        orderModel.companyTitle,
        orderModel.taxAdministration,
        orderModel.taxNumber 
      );
      this.invoiceService.add(orderModel).subscribe(
        (response) => {
          if (response.success) {
            this.toastr.success(response.message, 'Proje eklendi!');
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
      localStorage.removeItem('orderDetails');
      localStorage.setItem('orderDetails', JSON.stringify(orderModel));

      this.modalService.open(content, { scrollable: true });
      this.addRental();
      this.router.navigate([`home`]);
    } else {
      this.toastrService.error('Gerekli alanları doldurmalısınız.', 'Dikkat');
    }

    // let newOrder: Bill = {
    //   id: null,
    //   billingAddress: this.billingAddress,
    //   companyTitle: this.companyTitle,
    //   taxAdministration: this.taxAdministration,
    //   taxNumber: this.taxNumber,
    // };
  }

  addRental() {
    this.rentDetail = JSON.parse(localStorage.getItem('newRental'));

    let newRental: Rental = {
      id: 0,
      carId: this.carId,
      userId: 2,
      rentLocationId: this.rentDetail.rentLocationId,
      returnLocationId: this.rentDetail.returnLocationId,
      rentDate: this.rentDetail.rentDate,
      rentTime: this.rentDetail.rentTime,
      returnDate: this.rentDetail.returnDate,
      returnTime: this.rentDetail.returnTime,
      rentDay: this.rentDetail.rentDay,
      totalPrice: 500,
    };

    this.rentalService.add(newRental).subscribe(
      (response) => {
        console.log(response);
      },
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
}
