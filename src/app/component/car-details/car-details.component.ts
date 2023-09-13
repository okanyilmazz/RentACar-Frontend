import { CarImageService } from './../../services/car-image/car-image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from './../../models/car/carDetailDto';
import { CarService } from 'src/app/services/car/car.service';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/car/carImage';
import { DatePipe } from '@angular/common';

import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { CreditScoreService } from 'src/app/services/credit-score/credit-score.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  carDetails: CarDetail[];
  carDetail: CarDetail;
  carImages: CarImage[];
  carId: number;
  rentDay: number;
  rentalDate: string;
  rentalTime: string;
  returnDate: string;
  returnTime: string;
  selectedRentalLocationId: number;
  selectedReturnLocationId: number;
  carCreditScore: number;
  userCreditScore: number;
  userId: number;

  imageUrl = 'https://webservis.geziyoskii.site/';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private carImageService: CarImageService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private creditScoreService: CreditScoreService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (
        params['carId'] &&
        params['rentalDate'] &&
        params['rentalTime'] &&
        params['returnDate'] &&
        params['returnTime'] &&
        params['selectedRentalLocationId'] &&
        params['selectedReturnLocationId']
      ) {
        this.getCarDetailByCarId(params['carId']);
        this.getImageByCarId(params['carId']);
        const rentDetail = this.localStorageService.getItem('rentalValue');
        this.rentDay = rentDetail.rentDay;
      }
    });

    if(this.authService.isAuthenticated())
    {
      this.getUserId();
      this.getUserCreditScore(this.userId);
    }

  }

  transformDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy', this.locale);
  }

  getCarDetailByCarId(carId: number) {
    const storedData = this.localStorageService.getItem('rentalValue');
    this.carService.getCarDetailByClick(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.carDetails.forEach((car) => {
        this.carCreditScore = car.creditScore;
        storedData.carId = Number(carId);
        storedData.totalPrice = this.totalPrice(car.dailyPrice);
        this.localStorageService.removeItem('rentalValue');
        this.localStorageService.setItem('rentalValue', storedData);
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

  isExistAirConditioner(airConditioning: boolean) {
    if (airConditioning === true) {
      return 'Klimalı';
    } else {
      return 'Klimasız';
    }
  }

  goToDriverDetails() {
    let currentUrl = this.router.url;
    if (this.authService.isAuthenticated()) {
      if (this.carCreditScore <= this.userCreditScore) {
        this.router.navigate([
          currentUrl+'/driver-details/'
        ]);
      } else {
        this.toastrService.error(
          'Findeks puanınız bu araç için yeterli değildir. Findeks puanınızı görmek için Profil kısmına gidebilirsiniz.'
        );
      }
    }
    else{
      this.toastrService.warning('Devam etmek için giriş yapmalısınız.');
      this.router.navigate(['/login']);
    }
  }
  getUserId() {
    const user: User = this.authService.getUserInfo();
    this.userId = user.id;
  }
  getUserCreditScore(userId:number){
    this.creditScoreService.getScoreByUserId(userId).subscribe(response=>{
      this.userCreditScore = response.data.score
    })
  }
  totalPrice(dailyPrice: number) {
    return dailyPrice * this.rentDay;
  }
}
