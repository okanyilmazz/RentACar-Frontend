import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment/payment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PaymentService } from 'src/app/services/payment/payment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}
  userId: number = 0;
  userPayments: Payment[] = [];

  ngOnInit(): void {
    this.getUserId();
    this.getPaymentsByUserId(this.userId);
  }

  getUserId() {
    let userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.userId = userInfo.id;
    }
  }
  getPaymentsByUserId(userId: number) {
    this.paymentService.getPaymentsByUserId(userId).subscribe((response) => {
      this.userPayments = response.data;
      if (!Array.isArray(this.userPayments) || this.userPayments.length === 0) {
        this.toastrService.info('Kayıtlı ödeme bilgileriniz bulunmamaktadır.');
      }
    });
  }

  deletePayment(payment: Payment) {
    this.paymentService.deletePayment(payment).subscribe((response) => {
      this.toastrService.success(response.message);
      this.modalService.dismissAll();
      this.getPaymentsByUserId(this.userId);
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
