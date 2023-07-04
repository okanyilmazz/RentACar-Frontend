import { LocationService } from './../../services/location/location.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faAngleDoubleRight,
  faCreditCard,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car/carDetailDto';
import { CarImage } from 'src/app/models/car/carImage';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { CarImageService } from 'src/app/services/car-image/car-image.service';
import { CarService } from 'src/app/services/car/car.service';
import { Payment } from 'src/app/models/payment/payment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent implements OnInit {
  carDetails: CarDetail[];
  carDetail: CarDetail;
  carImages: CarImage[];
  carId: number;
  rentDetail: RentalDetail;
  currentYear = new Date().getFullYear();
  rentalLocationTitle: string;
  returnLocationTitle: string;
  cardNumber: number;
  cardName: string;
  cardMonth: number;
  cardYear: number;
  cardSecurityCode: number;
  payment: Payment;
  monthBase:string="Ay";
  yearBase:string="Yıl";
  months = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
  years = new Array();

  imageUrl = 'https://webservis.geziyoskii.site/';
  rightArrowIcon = faAngleDoubleRight;
  cardIcon = faCreditCard;
  infoIcon = faInfoCircle;
  paymentAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private locationService: LocationService,
    private router: Router,
    private carImageService: CarImageService,
    private toastrService: ToastrService
  ) {}

  isActive = true;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = params['carId'];
      this.getCarDetailByCarId(params['carId']);
      this.getImageByCarId(params['carId']);
      this.rentDetail = JSON.parse(localStorage.getItem('newRental'));
      this.getRentalLocationDetailsById(this.rentDetail.rentLocationId);
      this.getReturnLocationDetailsById(this.rentDetail.returnLocationId);
    });
    this.createPaymentAddForm();
    this.LoadData();
  }

  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailByClick(carId).subscribe((response) => {
      this.carDetails = response.data;
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
  checkCouponCode(couponCode: string) {
    if (couponCode === '') {
      this.toastrService.error('Kupon kodu geçersizdir', 'Dikkat');
    }
  }
  isExistAirConditioner(airConditioning: boolean) {
    if (airConditioning === true) {
      return 'Klimalı';
    } else {
      return 'Klimasız';
    }
  }
  totalPrice(dailyPrice: number) {
    return dailyPrice * 3;
  }

  LoadData() {
    for (
      let index = this.currentYear;
      index <= this.currentYear + 10;
      index++
    ) {
      this.years.push(index);
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
  goToOrderConfirmation() {

    let paymentModel = Object.assign({}, this.paymentAddForm.value);
    if(this.paymentAddForm.valid){

      localStorage.removeItem('paymentDetails');
      localStorage.setItem('paymentDetails', JSON.stringify(paymentModel));
  
      this.router.navigate([
        `reservation/details/car-id/${this.carId}/rent-date/${this.rentDetail.rentDate}/rent-time/${this.rentDetail.rentTime}/return-date/${this.rentDetail.returnDate}/return-time/${this.rentDetail.returnTime}/rental-location/${this.rentDetail.rentLocationId}/return-location/${this.rentDetail.returnLocationId}/driver-details/payment-details/order-confirmation`,
      ]);
    }
    else{
      this.toastrService.error('Gerekli alanları doğru bir şekilde doldurmalısınız.', 'Dikkat');
    }
    // let newPayment: Payment = {
    //   id: null,
    //   cardMonth: this.cardMonth,
    //   cardName: this.cardName,
    //   cardNumber: this.cardNumber,
    //   cardSecurityCode: this.cardSecurityCode,
    //   cardYear: this.cardYear,
    // };
    // this.payment = newPayment;

  }



  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cardName: ['', Validators.required],
      expirationYear: ['', Validators.required],
      expirationMonth: ['',Validators.required],
      securityCode: ['',Validators.required]
    });
  }

  changeExpirationYear(event:any){
    this.cardYear  = event.target?.value;
  }
  changeExpirationMonth(event:any){
    this.cardMonth  = event.target?.value;
  }
  cardNumberLimitCharacterCount(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const maxLength = 16; // Maksimum karakter sayısı
    if (inputElement.value.length > maxLength) {
      inputElement.value = inputElement.value.slice(0, maxLength); // Maksimum karakter sayısını aşanları kes
    }
  }
  securityCodeLimitCharacterCount(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const maxLength = 3; // Maksimum karakter sayısı

    if (inputElement.value.length > maxLength) {
      inputElement.value = inputElement.value.slice(0, maxLength); // Maksimum karakter sayısını aşanları kes
    }
  }
}
