import { Driver } from './../../models/driver/driver';
import { LocationService } from './../../services/location/location.service';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleDoubleRight,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from 'src/app/models/car/carDetailDto';
import { CarImage } from 'src/app/models/car/carImage';
import { CarImageService } from 'src/app/services/car-image/car-image.service';
import { CarService } from 'src/app/services/car/car.service';
import { CountryService } from 'src/app/services/country/country.service';
import { Country } from 'src/app/models/country/country';
import { DriverService } from 'src/app/services/driver/driver.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  NgbModule,
  NgbDatepickerI18n,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { TrDatepickerI18n } from 'src/app/directives/trDatepickerI18n';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css'],
})
export class DriverDetailsComponent implements OnInit {
  carDetails: CarDetail[];
  carDetail: CarDetail;
  carImages: CarImage[];
  countries: Country[];
  rentDetail: RentalDetail;
  rentalLocationTitle: string;
  returnLocationTitle: string;
  selectedCountryId: number=0;
  driverFirstName: string;
  driverLastName: string;
  driverPhoneNumber: string;
  driverBirthday: string = '';
  driverNationalId: string;
  driverPassportNumber: string;
  driverCountryCode: string;
  carId: number;
  imageUrl = 'https://webservis.geziyoskii.site/';
  rightArrowIcon = faAngleDoubleRight;
  infoIcon = faInfoCircle;
  userIcon = faUser;
  isActive = true;
  isSaveDriverActive = false;
  driverAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router,
    private toastrService: ToastrService,
    private driverService: DriverService,
    private locationService: LocationService,
    private authService: AuthService,
    private carImageService: CarImageService,
    private localStorageService:LocalStorageService
  ) {}

  birthdateMaxDate: NgbDateStruct = {
    year: this.currentDate().year - 18,
    month: this.currentDate().month,
    day: this.currentDate().day,
  };

  ngOnInit(): void {
    this.localStorageService.removeItem('driverDetails');

    this.createDriverAddForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailByCarId(params['carId']);
      this.getImageByCarId(params['carId']);
      this.carId = params['carId'];
      this.rentDetail = this.localStorageService.getItem('newRental');
      this.getRentalLocationDetailsById(this.rentDetail.rentLocationId);
      this.getReturnLocationDetailsById(this.rentDetail.returnLocationId);
    });

    this.getCountry();
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
  getCountry() {
    this.countryService.getAllCountry().subscribe((response) => {
      this.countries = response.data;
      this.countries = this.countries.sort(function (a, b) {
        return parseFloat(b.countryCode) - parseFloat(a.countryCode);
      });
    });
  }
  changeCountry(event: any) {
    this.selectedCountryId = event.target?.value;
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
  goToPaymentDetails() {
    let driverModel = Object.assign({}, this.driverAddForm.value);

    console.dir(driverModel)
    if (this.driverAddForm.valid) {
      this.localStorageService.removeItem('driverDetails');
      this.localStorageService.setItem('driverDetails',driverModel)

      this.router.navigate([
        `reservation/details/car-id/${this.carId}/rent-date/${this.rentDetail.rentDate}/rent-time/${this.rentDetail.rentTime}/return-date/${this.rentDetail.returnDate}/return-time/${this.rentDetail.returnTime}/rental-location/${this.rentDetail.rentLocationId}/return-location/${this.rentDetail.returnLocationId}/driver-details/payment-details`,
      ]);
    } else {
      this.toastrService.error('Gerekli alanları doldurmalısınız.', 'Dikkat');
    }
  }

  createDriverAddForm() {
    this.driverAddForm = this.formBuilder.group({
      userId: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthDate: [this.driverBirthday, Validators.required],
      nationalId: [''],
      passportNumber: [],
      countryCodeId: [this.selectedCountryId],
    });
  }

  add() {
    if (this.driverAddForm.valid) {
      let driverModel = Object.assign({}, this.driverAddForm.value);
      this.driverService.add(driverModel).subscribe((response) => {
        this.toastrService.success('Ürün eklendi', 'Başarılı');
      });
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }


  validateInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.keyCode);
    const pattern = /[a-zA-Z]/;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  limitCharacterCount(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const maxLength = 11; // Maksimum karakter sayısı
    if (inputElement.value.length > maxLength) {
      inputElement.value = inputElement.value.slice(0, maxLength); // Maksimum karakter sayısını aşanları kes
    }
  }

  selectBirthday(event: any) {
    this.driverBirthday = this.dateTransform(event);
  
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

  turkishCitizenChecked(event: any) {
    if (event) {
      this.selectedCountryId = null;
      this.driverPassportNumber = null;
    }
  }

  checkDriverSave() {
    if (this.isSaveDriverActive) {
      let user: User = this.authService.getUserInfo();
      const userId = Number(user.id);
      this.driverAddForm.patchValue({ userId: userId });
    }
    this.goToPaymentDetails();
  }
}
