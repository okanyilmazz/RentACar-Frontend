import { RentalDetail } from './../../models/rental/rentalDetail';
import { RentalDetailService } from './../../services/rental/rentalDetail.service';
import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental/rental';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  dataLoaded = false;
  rentalDetails: RentalDetail[] = [];
  constructor(private rentalDetailService: RentalDetailService) {}

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentalDetails() {
    this.rentalDetailService.getRentalDetails().subscribe((response) => {
      this.rentalDetails = response.data;
      this.dataLoaded = true;
    });
  }
}
