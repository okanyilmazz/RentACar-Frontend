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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user/user';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

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
  cardNumber: any = '0000 - 0000 - 0000 - 0000';
  cardName: string = '';
  cardNameUpper: string = '';
  cardMonth: number;
  cardYear: number;
  cardSecurityCode: any = 0;
  cardBalanceLimit: number;
  payment: Payment;
  monthBase: any = 'Ay';
  yearBase: any = 'Yıl';
  months = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
  years = new Array();
  installment: string = 'none';
  installmentInfo: string = 'block';
  imageUrl = 'https://webservis.geziyoskii.site/';
  rightArrowIcon = faAngleDoubleRight;
  cardIcon = faCreditCard;
  infoIcon = faInfoCircle;
  paymentAddForm: FormGroup;
  paymentOptionsRow: number;
  isConfirmed: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private locationService: LocationService,
    private router: Router,
    private carImageService: CarImageService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  isActive = true;
  ngOnInit(): void {
    this.localStorageService.removeItem('paymentDetails');

    this.activatedRoute.params.subscribe((params) => {
      this.carId = params['carId'];
      this.getCarDetailByCarId(params['carId']);
      this.getImageByCarId(params['carId']);
      this.rentDetail = this.localStorageService.getItem('rentalValue');
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
    return dailyPrice * this.rentDetail.rentDay;
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
  openModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'credit-card-modal',
    });
  }

  goToOrderConfirmation() {
    let totalPrice = this.rentDetail.totalPrice;

    let paymentModel = Object.assign({}, this.paymentAddForm.value);
    paymentModel.cardYear = Number(paymentModel.cardYear);
    paymentModel.cardMonth = Number(paymentModel.cardMonth);
    this.cardBalanceLimit = paymentModel.usableBalanceLimit;

    if (this.paymentAddForm.valid) {
      this.localStorageService.setItem('paymentDetails', paymentModel);
      this.router.navigate([
        `reservation/details/car-id/${this.carId}/rent-date/${this.rentDetail.rentDate}/rent-time/${this.rentDetail.rentTime}/return-date/${this.rentDetail.returnDate}/return-time/${this.rentDetail.returnTime}/rental-location/${this.rentDetail.rentLocationId}/return-location/${this.rentDetail.returnLocationId}/driver-details/payment-details/order-confirmation`,
      ]);
    } else {
      this.toastrService.error(
        'Gerekli alanları doğru bir şekilde doldurmalısınız.',
        'Dikkat'
      );
    }
  }

  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      userId: [],
      cardNumber: ['', Validators.required],
      cardName: ['', Validators.required],
      cardYear: [Number(this.cardYear), Validators.required],
      cardMonth: [Number(this.cardMonth), Validators.required],
      cardSecurityCode: [0, Validators.required],
      usableBalanceLimit: [20000, Validators.required],
    });
  }

  changeExpirationYear(event: any) {
    this.cardYear = Number(event.target?.value);
  }
  changeExpirationMonth(event: any) {
    this.cardMonth = Number(event.target?.value);
  }

  formatCardNumber(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.replace(/\D/g, '');
    const formattedValue = this.formatCardNumberWithDashes(inputValue);
    this.cardNumber = formattedValue;
    if (
      this.cardNumber.length >= 4 &&
      this.cardNumber.substring(0, 4) !== '0000'
    ) {
      this.installment = 'block';
      this.installmentInfo = 'none';
      this.paymentOptionsRow = 8;
    } else {
      this.installment = 'none';
      this.installmentInfo = 'block';
      this.paymentOptionsRow = 5;
    }
  }

  formatCardNumberWithDashes(cardNumber: string): string {
    const groups = cardNumber.match(/(\d{1,4})/g);
    if (groups) {
      return groups.join('-');
    }
    return cardNumber;
  }

  securityCodeLimitCharacterCount(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const maxLength = 3; // Maksimum karakter sayısı

    if (inputElement.value.length > maxLength) {
      inputElement.value = inputElement.value.slice(0, maxLength - 1); // Maksimum karakter sayısını aşanları kes
      this.cardSecurityCode = inputElement.value;
    }
  }

  onValueChange(value: string) {
    this.cardName = value.toUpperCase();
  }

  addCardToUser() {
    let user: User = this.authService.getUserInfo();
    const userId = Number(user.id);
    this.paymentAddForm.patchValue({ userId: userId });
    this.decline();
  }
  decline() {
    this.modalService.dismissAll();
    this.goToOrderConfirmation();
  }
}
