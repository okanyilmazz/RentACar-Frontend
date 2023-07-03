import { Brand } from './../../models/brand/brand';

import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { BrandService } from 'src/app/services/brand/brand.service';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnChanges {
  brands: Brand[] = [];
  currentBrand: Brand;
  emptyBrand: Brand;
  @Output() BrandEvent = new EventEmitter<boolean>();
  @Input() isOpenBrand: boolean;
  dataLoaded = false;
  downArrow = faAngleDoubleDown;
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrand();
  }
  ngOnChanges() {
  }
  getBrand() {
    this.brandService.getBrand().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentBrand(brand: Brand) {

    this.isOpenBrand = false;
    this.BrandEvent.emit(this.isOpenBrand);
    this.currentBrand = brand;
  }
  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllBrandClass() {
    if (!this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  clearCurrentBrand() {
    this.currentBrand = this.emptyBrand;
  }
}
