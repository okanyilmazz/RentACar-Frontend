import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BodyType } from 'src/app/models/body-type/body-type';
import { BodyTypeService } from 'src/app/services/body-type/body-type.service';

@Component({
  selector: 'app-bodies',
  templateUrl: './bodies.component.html',
  styleUrls: ['./bodies.component.css'],
})
export class BodiesComponent implements OnInit {
  constructor(
    private bodyService: BodyTypeService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }
  serId: number = 0;
  bodies: BodyType[] = [];
  bodyName: string;
  updatedBody: BodyType;
  bodySendForm: FormGroup;
  bodyUpdateForm: FormGroup;

  ngOnInit(): void {
    this.createBodyForm();
    this.getAllBody();
  }

  getAllBody() {
    this.bodyService.getAllBodies().subscribe((response) => {
      this.bodies = response.data;
    });
  }

  addBody() {
    if (this.bodySendForm.valid) {
      let bodyModel = Object.assign({}, this.bodySendForm.value);
      this.bodyService.addBody(bodyModel).subscribe(
        (response) => {
          if (response.success) {
            this.bodyService.getAllBodies().subscribe((response) => {
              this.bodies = response.data;
              this.toastrService.success(response.message);
              this.getAllBody();
              this.modalService.dismissAll();
              this.bodySendForm.reset();
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

  deleteBody(body: BodyType) {
    this.bodyService.deleteBody(body).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.getAllBody();
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

  updateBody(bodyId: number) {
    if (this.bodyUpdateForm.valid) {
      let bodyModel = Object.assign({}, this.bodyUpdateForm.value);
      this.updatedBody = {
        id: bodyId,
        type: bodyModel.type,
      };
      this.bodyService.updateBody(this.updatedBody).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.getAllBody();
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

  openModal(content: any, className: string, body: BodyType) {
    if (body !== null) {
      this.bodyName = body.type;
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
      windowClass: 'new-body-modal',
    });
  }

  decline() {
    this.modalService.dismissAll();
  }
  alert() {
    this.toastrService.info('Güncelleme işlemi aktif değildir.');
  }

  createBodyForm() {
    this.bodySendForm = this.formBuilder.group({
      type: ['', Validators.required],
    });

    this.bodyUpdateForm = this.formBuilder.group({
      type: ['', Validators.required],
    });
  }
}
