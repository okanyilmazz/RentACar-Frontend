import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }
  colors: Color[] = [];
  colorName: string;
  updatedColor: Color;
  colorSendForm: FormGroup;
  colorUpdateForm: FormGroup;

  ngOnInit(): void {
    this.createColorForm();
    this.getAllColor();
  }

  getAllColor() {
    this.colorService.getAllColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  addColor() {
    if (this.colorSendForm.valid) {
      let colorModel = Object.assign({}, this.colorSendForm.value);
      console.log(colorModel);
      this.colorService.addColor(colorModel).subscribe(
        (response) => {
          if (response.success) {
            this.colorService.getAllColors().subscribe((response) => {
              this.colors = response.data;
              this.toastrService.success(response.message);
              this.getAllColor();
              this.modalService.dismissAll();
              this.colorSendForm.reset();
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

  deleteColor(color: Color) {
    this.colorService.deleteColor(color).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.getAllColor();
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

  updateColor(colorId: number) {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.updatedColor = {
        id: colorId,
        colorName: colorModel.colorName,
      };
      this.colorService.updateColor(this.updatedColor).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.getAllColor();
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

  openModal(content: any, className: string, color: Color) {
    if (color !== null) {
      this.colorName = color.colorName;
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
      windowClass: 'new-color-modal',
    });
  }

  decline() {
    this.modalService.dismissAll();
  }
  alert() {
    this.toastrService.info('Güncelleme işlemi aktif değildir.');
  }

  createColorForm() {
    this.colorSendForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });

    this.colorUpdateForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }
}
