import { TestPageComponent } from './component/test-page/test-page.component';
import { OrderConfirmationComponent } from './component/order-confirmation/order-confirmation.component';
import { PaymentDetailsComponent } from './component/payment-details/payment-details.component';
import { DriverDetailsComponent } from './component/driver-details/driver-details.component';
import { VehiclesPageComponent } from './component/vehicles-page/vehicles-page.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './component/car-details/car-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'home/cars/brand/:brandId', component: HomePageComponent },
  { path: 'home/cars/color/:colorId', component: HomePageComponent },
  { path: 'home/cars/body/:bodyId', component: HomePageComponent },
  {
    path: 'home/cars/brand/:brandId/color/:colorId',
    component: HomePageComponent,
  },
  {
    path: 'home/cars/brand/:brandId/body/:bodyId',
    component: HomePageComponent,
  },
  {
    path: 'home/cars/color/:colorId/body/:bodyId',
    component: HomePageComponent,
  },
  {
    path: 'home/cars/brand/:brandId/color/:colorId/body/:bodyId',
    component: HomePageComponent,
  },

  { path: 'cars', component: VehiclesPageComponent },
  { path: 'cars/brand/:brandId', component: VehiclesPageComponent },
  { path: 'cars/color/:colorId', component: VehiclesPageComponent },
  { path: 'cars/body/:bodyId', component: VehiclesPageComponent },
  {
    path: 'cars/brand/:brandId/color/:colorId',
    component: VehiclesPageComponent,
  },
  {
    path: 'cars/brand/:brandId/body/:bodyId',
    component: VehiclesPageComponent,
  },
  {
    path: 'cars/color/:colorId/body/:bodyId',
    component: VehiclesPageComponent,
  },
  {
    path: 'cars/brand/:brandId/color/:colorId/body/:bodyId',
    component: VehiclesPageComponent,
  },
  {
    path: 'cars/reservation/:carId/details/:carId',
    component: ReservationComponent,
  },
  { path: 'cars/details/:carId', component: CarDetailsComponent },
  {
    path: 'cars/rent-date/:rentalDate/rent-time/:rentalTime/return-date/:returnDate/return-time/:returnTime/rental-location/:selectedRentalLocationId/return-location/:selectedReturnLocationId',
    component: VehiclesPageComponent,
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    children: [
      {
        path: 'details/car-id/:carId/rent-date/:rentalDate/rent-time/:rentalTime/return-date/:returnDate/return-time/:returnTime/rental-location/:selectedRentalLocationId/return-location/:selectedReturnLocationId',
        component: CarDetailsComponent,
      },
      {
        path: 'details/car-id/:carId/rent-date/:rentalDate/rent-time/:rentalTime/return-date/:returnDate/return-time/:returnTime/rental-location/:selectedRentalLocationId/return-location/:selectedReturnLocationId/driver-details',
        component: DriverDetailsComponent,
      },
      {
        path: 'details/car-id/:carId/rent-date/:rentalDate/rent-time/:rentalTime/return-date/:returnDate/return-time/:returnTime/rental-location/:selectedRentalLocationId/return-location/:selectedReturnLocationId/driver-details/payment-details',
        component: PaymentDetailsComponent,
      },
      {
        path: 'details/car-id/:carId/rent-date/:rentalDate/rent-time/:rentalTime/return-date/:returnDate/return-time/:returnTime/rental-location/:selectedRentalLocationId/return-location/:selectedReturnLocationId/driver-details/payment-details/order-confirmation',
        component: OrderConfirmationComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
