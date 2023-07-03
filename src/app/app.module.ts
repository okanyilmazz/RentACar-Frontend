import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdvertisementComponent } from './component/advertisement/advertisement.component';
import { BrandComponent } from './component/brand/brand.component';
import { CarComponent } from './component/car/car.component';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { CarFilterComponent } from './component/car-filter/car-filter.component';
import { ColorComponent } from './component/color/color.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { CustomerComponent } from './component/customer/customer.component';
import { DateMenuComponent } from './component/date-menu/date-menu.component';
import { DriverDetailsComponent } from './component/driver-details/driver-details.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { InfoRentalComponent } from './component/info-rental/info-rental.component';
import { NaviComponent } from './component/navi/navi.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { OrderConfirmationComponent } from './component/order-confirmation/order-confirmation.component';
import { PaymentDetailsComponent } from './component/payment-details/payment-details.component';
import { ReferenceFieldComponent } from './component/reference-field/reference-field.component';
import { RentalComponent } from './component/rental/rental.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { ReservationDateComponent } from './component/reservation-date/reservation-date.component';
import { SeeMoreComponent } from './component/see-more/see-more.component';
import { SubscribeNewsComponent } from './component/subscribe-news/subscribe-news.component';
import { VehiclesPageComponent } from './component/vehicles-page/vehicles-page.component';
import { WhatWeDoComponent } from './component/what-we-do/what-we-do.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule, NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, JsonPipe } from '@angular/common';
import { TestPageComponent } from './component/test-page/test-page.component';
import { TestPagesNewComponent } from './component/test-page-2/test-pages-new/test-pages-new.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { StepsComponent } from './component/steps/steps/steps.component';
import { BodyComponent } from './component/body/body/body.component';
import { CreditCardFormatPipe } from './pipes/credit-card-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdvertisementComponent,
    BrandComponent,
    CarComponent,
    CarDetailsComponent,
    CarFilterComponent,
    ColorComponent,
    ContactUsComponent,
    CustomerComponent,
    DateMenuComponent,
    FooterComponent,
    DriverDetailsComponent,
    HomePageComponent,
    InfoRentalComponent,
    NaviComponent,
    NavigationComponent,
    OrderConfirmationComponent,
    PaymentDetailsComponent,
    ReferenceFieldComponent,
    RentalComponent,
    ReservationComponent,
    ReservationDateComponent,
    SeeMoreComponent,
    SubscribeNewsComponent,
    VehiclesPageComponent,
    WhatWeDoComponent,
    FilterPipePipe,
    TestPageComponent,
    TestPagesNewComponent,
    StepsComponent,
    BodyComponent,
    CreditCardFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPageScrollCoreModule.forRoot({ duration: 2500 }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbTypeaheadModule,
    JsonPipe,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      timeOut: 1000000,
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
