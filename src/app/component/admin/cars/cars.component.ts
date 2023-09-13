import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BodyType } from 'src/app/models/body-type/body-type';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { CarImage } from 'src/app/models/car/carImage';
import { CarDetail } from 'src/app/models/car/carDetailDto';
import { Color } from 'src/app/models/color/color';
import { Fuel } from 'src/app/models/fuel/fuel';
import { Model } from 'src/app/models/model/model';
import { Transmission } from 'src/app/models/transmission/transmission';
import { BodyTypeService } from 'src/app/services/body-type/body-type.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarImageService } from 'src/app/services/car-image/car-image.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';
import { FuelService } from 'src/app/services/fuel/fuel.service';
import { ModelService } from 'src/app/services/model/model.service';
import { TransmissionService } from 'src/app/services/transmission/transmission.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private modelService: ModelService,
    private bodyService: BodyTypeService,
    private transmissionService: TransmissionService,
    private fuelService: FuelService,
    private carImageService: CarImageService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }
  imageBaseUrl = 'https://geziyoskii.site/';
  dataImageLoaded = false;
  carDetails: CarDetail[] = [];
  carName: string;
  updatedCar: Car;
  isDeleteImageCollapse: boolean = true;
  isAddImageCollapse: boolean = true;
  carColorName: string;

  carBrandId: number;
  carModelId: number;
  carBodyId: number;
  carColorId: number;
  carTransmissionId: number;
  carFuelId: number;
  carNumberOfPassengers: string;
  isAirConditioning: boolean;


  carDescription: string;
  carSendForm: FormGroup;
  carUpdateForm: FormGroup;
  file: any;
  newImages: File[];
  selectedCarImages: CarImage[] = [];
  checkedImagesForDelete: CarImage[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  models: Model[] = [];
  bodies: BodyType[] = [];
  fuels: Fuel[] = [];
  transmissions: Transmission[] = [];
  kilometerLimit: string = "";
  newCarSelectDefaultText: FormControl = new FormControl('Seçiniz');
  ngOnInit(): void {
    this.createCarForm();
    this.getAllCar();
    this.getAllBrands();
    this.getAllModels();
    this.getAllBodies();
    this.getAllColors();
    this.getAllTransmissions();
    this.getAllFuels();
  }

  getAllCar() {
    this.carService.getAllCarDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  addCar() {

    if (this.carSendForm.valid) {
      let carModel = Object.assign({}, this.carSendForm.value);
      this.carService.addCar(carModel).subscribe(
        (response) => {
          this.carService.getAllCarDetails().subscribe(response => {
            this.carDetails = response.data;
            let carId = this.carDetails.pop().carId;
            this.addCarImage(carId);
            this.getAllCar();
            this.modalService.dismissAll();
            this.carSendForm.reset();
          })
          this.toastrService.success(response.message);
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

  deleteCar(carId: number) {
    // this.carService.deleteCar(car).subscribe(
    //   (response) => {
    //     this.toastrService.success(response.message);
    //     this.getAllCar();
    //     this.modalService.dismissAll();
    //   },
    //   (responseError) => {
    //     if (responseError.error.Errors.length > 0) {
    //       for (let i = 0; i < responseError.error.Errors.length; i++) {
    //         this.toastrService.error(
    //           responseError.error.Errors[i].ErrorMessage,
    //           'Doğrulama Hatası'
    //         );
    //       }
    //     }
    //   }
    // );
  }

  testUpdateCar() {

  }
  updateCar() {
    if (this.carSendForm.valid) {

      let carModel = Object.assign({}, this.carSendForm.value);
      this.carService.updateCar(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.getAllCar();
          this.modalService.dismissAll();
          this.carSendForm.reset();
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

  addCarImage(carId: any) {
    // let formData = new FormData();
    // formData.set('CarId', carId);
    // formData.set('Image', this.file);
    // this.carImageService.addCarImage(formData).subscribe(
    //   (response) => { },
    //   (responseError) => {
    //     if (responseError.error.Errors.length > 0) {
    //       for (let i = 0; i < responseError.error.Errors.length; i++) {
    //         this.toastrService.error(
    //           responseError.error.Errors[i].ErrorMessage,
    //           'Doğrulama Hatası'
    //         );
    //       }
    //     }
    //   }
    // );

    this.newImages.forEach((newImage) => {
      let formData = new FormData();
      formData.set('CarId', carId);
      formData.set('Image', newImage);
      this.carImageService.addCarImage(formData).subscribe(
        (response) => {
          this.isAddImageCollapse = true;
          this.modalService.dismissAll();
          this.toastrService.success('Seçili görseller eklendi!', 'Başarılı!');
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
    });
  }

  openModal(content: any, className: string, car: CarDetail) {
    if (car !== null) {
      this.carBrandId = car.brandId;
      this.carModelId = car.modelId;
      this.carColorId = car.colorId;
      this.carBodyId = car.bodyId;
      this.carFuelId = car.fuelId;
      this.isAirConditioning = car.airConditioning;
      this.carNumberOfPassengers = car.numberOfPassengers;
      this.getCarImages(car.carId);
      this.carSendForm.get('id').setValue(car.carId);
      this.carSendForm.get('brandId').setValue(car.brandId);
      this.carSendForm.get('colorId').setValue(car.colorId);
      this.carSendForm.get('modelId').setValue(car.modelId);
      this.carSendForm.get('bodyId').setValue(car.bodyId);
      this.carSendForm.get('fuelId').setValue(car.fuelId);
      this.carSendForm.get("numberOfPassengers").setValue(car.numberOfPassengers);
      this.carSendForm.get('transmissionId').setValue(car.transmissionId);
      this.carSendForm.get('dailyPrice').setValue(car.dailyPrice);
      this.carSendForm.get('modelYear').setValue(car.modelYear);
      this.carSendForm.get('deposit').setValue(car.deposit);
      this.carSendForm.get('kilometerLimit').setValue(car.kilometerLimit);
      this.carSendForm.get('availability').setValue(car.availability);
      this.carSendForm.get('creditScore').setValue(car.creditScore);
      this.carSendForm.get('description').setValue(car.description);
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
      windowClass: 'new-car-modal',
    });
  }

  decline() {
    this.modalService.dismissAll();
  }
  alert() {
    this.toastrService.info('Güncelleme işlemi aktif değildir.');
  }

  createCarForm() {
    this.carSendForm = this.formBuilder.group({
      id: [0, Validators.required],
      brandId: [0, Validators.required],
      colorId: [0, Validators.required],
      fuelId: [0, Validators.required],
      bodyId: [0, Validators.required],
      transmissionId: [0, Validators.required],
      modelId: [0, Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      numberOfPassengers: [0, Validators.required],
      airConditioning: [false, Validators.required],
      deposit: ['', Validators.required],
      kilometerLimit: ['', Validators.required],
      availability: [false, Validators.required],
      creditScore: ['', Validators.required],
    });
  }

  getFile(event: any) {
    this.file = event.target.files[0];
  }

  getMultiFile(event: any) {
    this.newImages = Array.from(event.target.files);
  }

  changeBrandType(event: any) {
    const numericValue = parseInt(event.target.value);
    this.carSendForm.get('brandId').setValue(numericValue);
  }
  changeColor(event: any) {
    const numericValue = parseInt(event.target.value);
    this.carSendForm.get('colorId').setValue(numericValue);
  }
  changeModel(event: any) {
    const numericValue = parseInt(event.target.value);
    this.carSendForm.get('modelId').setValue(numericValue);
  }
  changeBodyType(event: any) {
    const numericValue = parseInt(event.target.value);
    this.carSendForm.get('bodyId').setValue(numericValue);
  }
  changeFuel(event: any) {
    const numericValue = parseInt(event.target.value);
    this.carSendForm.get('fuelId').setValue(numericValue);
  }
  changeTransmissionType(event: any) {
    const numericValue = parseInt(event.target.value);
    this.carSendForm.get('transmissionId').setValue(numericValue);
  }

  changeAirConditioning(event: any) {
    const booleanValue = JSON.parse(event.target.value);
    this.carSendForm.get('airConditioning').setValue(booleanValue);
  }

  changePassengers(event: any) {
    this.carSendForm.get('numberOfPassengers').setValue(event.target.value);
  }

  getAllBrands() {
    this.brandService.getAllBrand().subscribe(response => {
      this.brands = response.data;
    })
  }
  getAllModels() {
    this.modelService.getAllModels().subscribe(response => {
      this.models = response.data;
    })
  }
  getAllBodies() {
    this.bodyService.getAllBodies().subscribe(response => {
      this.bodies = response.data;
    })
  }

  getAllColors() {
    this.colorService.getAllColors().subscribe(response => {
      this.colors = response.data;
    })
  }
  getAllTransmissions() {
    this.transmissionService.getAllTransmissions().subscribe(response => {
      this.transmissions = response.data;
    })
  }
  getAllFuels() {
    this.fuelService.getAllFuels().subscribe(response => {
      this.fuels = response.data
    })
  }


  /* IMAGE  */
  getCarImages(carId: number) {
    this.carImageService
      .getImageByCarId(carId)
      .subscribe((response) => {
        this.selectedCarImages = response.data;
        this.dataImageLoaded = true;
      });
  }
  onChangeCheckImage(carImage: CarImage, isChecked: any) {
    if (isChecked.target.checked) {
      this.checkedImagesForDelete.push(carImage);
    } else {
      let index = this.checkedImagesForDelete.indexOf(carImage);
      this.checkedImagesForDelete.splice(index, 1);
    }
    this.isCheckedImage();
  }

  isCheckedImage() {
    if (this.checkedImagesForDelete.length > 0) {
      this.isDeleteImageCollapse = false;
    } else {
      this.isDeleteImageCollapse = true;
    }
  }
  onChangeCheckNewImage(isChecked: any) {
    if (isChecked.target.checked) {
      this.isAddImageCollapse = false;
    } else {
      this.isAddImageCollapse = true;
    }
  }

  deleteCarImage() {
    this.checkedImagesForDelete.forEach((deletedImage) => {
      this.carImageService
        .deleteCarImage(deletedImage)
        .subscribe((response) => {
          if (response.success) {
            this.toastrService.success(
              deletedImage.id + ' Numaralı seçili görseller silindi!',
              'Başarılı!'
            );
            this.modalService.dismissAll();
            this.checkedImagesForDelete = [];
            this.isCheckedImage();
            // this.openModal(this.modalContent, this.modalProject);
          } else {
            this.toastrService.error(
              deletedImage.id + ' Numaralı seçili görseller silinemedi.',
              'Dikkat!'
            );
          }
        });
    });
  }
}
