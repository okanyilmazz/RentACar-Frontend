import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Driver } from 'src/app/models/driver/driver';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DriverService } from 'src/app/services/driver/driver.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit {
  constructor(
    private driverService: DriverService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}
  userId: number = 0;
  userDrivers: Driver[] = [];
  driverFirstName: string;
  driverLastName: string;

  driverUpdateForm: FormGroup;
  ngOnInit(): void {
    this.getUserId();
    this.getDriversByUserId(this.userId);
  }

  getUserId() {
    let userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.userId = userInfo.id;
    }
  }
  getDriversByUserId(userId: number) {
    this.driverService.getDriverByUserId(userId).subscribe((response) => {
      this.userDrivers = response.data;
      if (!Array.isArray(this.userDrivers) || this.userDrivers.length === 0) {
        this.toastrService.warning('Boş');
      }
    });
  }


  deleteDriver(driver: Driver) {
    this.driverService.deleteDriver(driver).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.modalService.dismissAll();
        this.getDriversByUserId(this.userId);
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Doğrulama Hatası'
            );
          }
        }
      }
    );
  }

  openModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      windowClass: 'question-modal',
    });
  }

  decline() {
    this.modalService.dismissAll();
  }
  alert(){
    this.toastrService.info("Güncelleme işlemi aktif değildir.")
   }
}
