import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RentalDetailService } from 'src/app/services/rental/rentalDetail.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css'],
})
export class RentalsComponent implements OnInit {
  constructor(
    private rentalService: RentalDetailService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}
  userId: number = 0;
  userRentals: RentalDetail[] = [];

  ngOnInit(): void {
    this.getUserId();
    this.getRentalDetailByUserId(this.userId);
  }

  getRentalDetailByUserId(userId: number) {
    this.rentalService.getRentalDetailsByUserId(userId).subscribe((response) => {
      this.userRentals = response.data;
      if (!Array.isArray(this.userRentals) || this.userRentals.length === 0) {
        this.toastrService.info('Daha önce rezervasyon yapmadınız.');
      }
    });
  }

  getUserId() {
    let userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.userId = userInfo.id;
    }
  }
}
