import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {


  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }
  brands: Brand[] = [];
  brandName: string;
  updatedBrand: Brand;
  brandSendForm: FormGroup;
  brandUpdateForm: FormGroup;

  ngOnInit(): void {
    this.createBrandForm();
    this.getAllBrand();
  }

  getAllBrand() {
    this.brandService.getAllBrand().subscribe((response) => {
      this.brands = response.data;
    });
  }

  addBrand() {
    if (this.brandSendForm.valid) {
      let brandModel = Object.assign({}, this.brandSendForm.value);
      this.brandService.addBrand(brandModel).subscribe(
        (response) => {
          if (response.success) {
            this.brandService.getAllBrand().subscribe((response) => {
              this.brands = response.data;
              this.toastrService.success(response.message);
              this.getAllBrand();
              this.modalService.dismissAll();
              this.brandSendForm.reset();
            });
          }
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
    } else {
      this.toastrService.error('Gerekli alanları doldurmalısınız', 'Dikkat!');
    }
  }

  deleteBrand(brand: Brand) {
    this.brandService.deleteBrand(brand).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.getAllBrand();
        this.modalService.dismissAll();
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

  updateBrand(brandId: number) {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.updatedBrand = {
        id: brandId,
        name: brandModel.name,
      };
      this.brandService.updateBrand(this.updatedBrand).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.getAllBrand();
          this.modalService.dismissAll();
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
    } else {
      this.toastrService.error('Gerekli alanları doldurmalısınız', 'Dikkat!');
    }
  }

  openModal(content: any, className: string, brand: Brand) {
    if (brand !== null) {
      this.brandName = brand.name;
    }

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      windowClass: className,
    });
  }
  newOpenModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      windowClass: 'new-brand-modal',
    });
  }

  decline() {
    this.modalService.dismissAll();
  }
  alert() {
    this.toastrService.info('Güncelleme işlemi aktif değildir.');
  }

  createBrandForm() {
    this.brandSendForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.brandUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
}
