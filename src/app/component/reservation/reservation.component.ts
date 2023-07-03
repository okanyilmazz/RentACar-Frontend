import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { faCar } from '@fortawesome/free-solid-svg-icons';

import { NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [NgbTimepickerConfig],
})
export class ReservationComponent implements OnInit {
  carIcon = faCar;
  rentalFormCheck: FormGroup;
  rentDate: Date;
  returnDate: Date;
  checkOutStep: number = 0;
  driverId: number;
  paymentId: number;
  time: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };

  constructor(
    config: NgbTimepickerConfig,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    config.spinners = true;
  }
  refresh(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    this.activatedRoute.firstChild.params.subscribe((params) => {

      if (params['driverId']) {
        this.checkOutStep = 2;
      }
      if (params['paymentId']) {
        this.checkOutStep = 3;
      }
      if (params['orderId']) {
        this.checkOutStep = 4;
      }
      if (params['confirmedId']) {
        this.checkOutStep = 5;
      }
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    });


  }
}
