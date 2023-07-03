import { CustomerDetail } from '../../models/customer/customerDetail';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customerDetails: CustomerDetail[] = [];
  dataLoaded = false;
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.customerService.getCustomer().subscribe((response) => {
      this.customerDetails = response.data;
      this.dataLoaded = true;
    });
  }
}
