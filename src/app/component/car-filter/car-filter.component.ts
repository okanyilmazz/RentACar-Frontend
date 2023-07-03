import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ColorService } from './../../services/color/color.service';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { Color } from 'src/app/models/color/color';
import { BodyType } from 'src/app/models/body-type/body-type';
import { BrandService } from 'src/app/services/brand/brand.service';
import { ToastrService } from 'ngx-toastr';
import { BodyTypeService } from 'src/app/services/body-type/body-type.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css'],
})
export class CarFilterComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand;
  emptyBrand: Brand;
  colors: Color[];
  emptyColor: Color;
  currentColor: Color;
  bodies: BodyType[];
  emptyBody: BodyType;
  currentBody: BodyType;
  dataLoaded = false;
  isExistCarsUrl: boolean = false;
  selectedColorId: string = 'default';
  selectedBrandId: string = 'default';
  selectedBodyId: string = 'default';

  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private bodyTypeService: BodyTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {

    if( this.router.url.includes('/cars')){
      this.isExistCarsUrl=true
    }else{
      this.isExistCarsUrl=false
    }
    this.getBrand();
    this.getColor();
    this.getBody();
  }

  getBrand() {
    this.brandService.getBrand().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColor() {
    this.colorService.getColor().subscribe((response) => {
      this.colors = response.data;

    });
  }
  getBody() {
    this.bodyTypeService.getBody().subscribe((response) => {
      this.bodies = response.data;
    });
  }

  onSelectedColor(colorId: string): void {
    this.selectedColorId = colorId;
  }

  onSelectedBrand(brandId: string): void {
    this.selectedBrandId = brandId;
  }

  onSelectedBody(bodyId: string): void {
    this.selectedBodyId = bodyId;
  }

  checkFilter() {
    if (this.selectedColorId != 'default') {
      if (this.isExistCarsUrl) {
        this.router.navigate(['/cars/color/' + this.selectedColorId]);
      } else {
        this.router.navigate(['/home/cars/color/' + this.selectedColorId]);
      }
    }
    if (this.selectedBrandId != 'default') {
      if (this.isExistCarsUrl) {
        this.router.navigate(['/cars/brand/' + this.selectedBrandId]);
      } else {
        this.router.navigate(['/home/cars/brand/' + this.selectedBrandId]);
      }
    }
    if (this.selectedBodyId != 'default') {
      if (this.isExistCarsUrl) {
        this.router.navigate(['/cars/body/' + this.selectedBodyId]);
      } else {
        this.router.navigate(['/home/cars/body/' + this.selectedBodyId]);
      }
    }
    if (
      this.selectedBrandId != 'default' &&
      this.selectedColorId != 'default'
    ) {
      if (this.isExistCarsUrl) {
        this.router.navigate([
          'cars/brand/' +
            this.selectedBrandId +
            '/color/' +
            this.selectedColorId,
        ]);
      } else {
        this.router.navigate([
          'home/cars/brand/' +
            this.selectedBrandId +
            '/color/' +
            this.selectedColorId,
        ]);
      }
    }
    if (this.selectedBodyId != 'default' && this.selectedBrandId != 'default') {
      if (this.isExistCarsUrl) {
        this.router.navigate([
          'cars/brand/' + this.selectedBrandId + '/body/' + this.selectedBodyId,
        ]);
      } else {
        this.router.navigate([
          'home/cars/brand/' +
            this.selectedBrandId +
            '/body/' +
            this.selectedBodyId,
        ]);
      }
    }
    if (this.selectedBodyId != 'default' && this.selectedColorId != 'default') {
      if (this.isExistCarsUrl) {
        this.router.navigate([
          'cars/color/' + this.selectedColorId + '/body/' + this.selectedBodyId,
        ]);
      } else {
        this.router.navigate([
          'home/cars/color/' +
            this.selectedColorId +
            '/body/' +
            this.selectedBodyId,
        ]);
      }
    }
    if (
      this.selectedBrandId != 'default' &&
      this.selectedColorId != 'default' &&
      this.selectedBodyId != 'default'
    ) {
      if (this.isExistCarsUrl) {
        this.router.navigate([
          'cars/brand/' +
            this.selectedBrandId +
            '/color/' +
            this.selectedColorId +
            '/body/' +
            this.selectedBodyId,
        ]);
      } else {
        this.router.navigate([
          'home/cars/brand/' +
            this.selectedBrandId +
            '/color/' +
            this.selectedColorId +
            '/body/' +
            this.selectedBodyId,
        ]);
      }

      this.router.navigate([
        'home/cars/brand/' +
          this.selectedBrandId +
          '/color/' +
          this.selectedColorId +
          '/body/' +
          this.selectedBodyId,
      ]);
    } else if (
      this.selectedBrandId == 'default' &&
      this.selectedColorId == 'default' &&
      this.selectedBodyId == 'default'
    ) {
      if(this.isExistCarsUrl){
        this.router.navigate(['/cars']);
      }
      else{
        this.router.navigate(['/home']);
      }

    }
  }

  clearSelectedFilters() {
    this.selectedBrandId = 'default';
    this.selectedColorId = 'default';
    this.selectedBodyId = 'default';
  }
}
