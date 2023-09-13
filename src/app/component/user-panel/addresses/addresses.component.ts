import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Invoice } from 'src/app/models/invoice/invoice';
import { InvoiceDetailsDto } from 'src/app/models/invoice/invoiceDetailsDto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css'],
})
export class AddressesComponent implements OnInit {
  constructor(
    private invoiceService: InvoiceService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}

  userId: number = 0;
  userInvoicesDetailsDto: InvoiceDetailsDto[] = [];
  invoice: Invoice;

  ngOnInit(): void {
    this.getUserId();
    this.getInvoicesDetailByUserId(this.userId);
  }

  getUserId() {
    let userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.userId = userInfo.id;
    }
  }

  /*Get Invoice Details Dto */
  getInvoicesDetailByUserId(userId: number) {
    this.invoiceService
      .getInvoiceDetailsByUserId(userId)
      .subscribe((response) => {
        this.userInvoicesDetailsDto = response.data;
        if (
          !Array.isArray(this.userInvoicesDetailsDto) ||
          this.userInvoicesDetailsDto.length === 0
        ) {
          this.toastrService.info('Kayıtlı adresiniz bulunmamaktadır.');
        }
      });
  }

  /*Get Invoice */
  async getInvoiceById(id: number) {
    try {
      const response = await this.invoiceService.getInvoiceById(id).toPromise();
      this.invoice = response.data;
    } catch (error) {
      console.error('Hata:', error);
    }
  }

  async deleteInvoice(invoiceDetailsDto: InvoiceDetailsDto) {
    try {
      const response = await this.invoiceService
        .getInvoiceById(invoiceDetailsDto.id)
        .toPromise();
      this.invoice = response.data;
      this.invoiceService.deleteInvoice(this.invoice).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.modalService.dismissAll();
          this.getInvoicesDetailByUserId(this.userId);
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
    } catch (error) {
      console.error('Hata:', error);
    }
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
