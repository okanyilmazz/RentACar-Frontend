
import { OrderConfirmationComponent } from './component/order-confirmation/order-confirmation.component';
import { PaymentDetailsComponent } from './component/payment-details/payment-details.component';
import { DriverDetailsComponent } from './component/driver-details/driver-details.component';
import { VehiclesPageComponent } from './component/vehicles-page/vehicles-page.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { LoginGuard } from './guards/login-guard';
import { LoginPageGuard } from './guards/login-page-guard';
import { SettingsComponent } from './component/user-panel/settings/settings.component';
import { RentalsComponent } from './component/user-panel/rentals/rentals.component';
import { DriversComponent } from './component/user-panel/drivers/drivers.component';
import { AddressesComponent } from './component/user-panel/addresses/addresses.component';
import { PaymentsComponent } from './component/user-panel/payments/payments.component';
import { BodiesComponent } from './component/admin/bodies/bodies.component';
import { ColorsComponent } from './component/admin/colors/colors.component';
import { BrandsComponent } from './component/admin/brands/brands.component';
import { CarsComponent } from './component/admin/cars/cars.component';

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
        canActivate: [LoginGuard],
        component: DriverDetailsComponent,
      },
      {
        path: 'details/car-id/:carId/rent-date/:rentalDate/rent-time/:rentalTime/return-date/:returnDate/return-time/:returnTime/rental-location/:selectedRentalLocationId/return-location/:selectedReturnLocationId/driver-details/payment-details',
        canActivate: [LoginGuard],
        component: PaymentDetailsComponent,
      },
      {
        path: 'details/car-id/:carId/rent-date/:rentalDate/rent-time/:rentalTime/return-date/:returnDate/return-time/:returnTime/rental-location/:selectedRentalLocationId/return-location/:selectedReturnLocationId/driver-details/payment-details/order-confirmation',
        canActivate: [LoginGuard],
        component: OrderConfirmationComponent,
      },
    ],
  },
  {
    path: 'login',
    canActivate: [LoginPageGuard],
    component: LoginPageComponent,
  },
  {
    path: 'register',
    canActivate: [LoginPageGuard],
    component: RegisterPageComponent,
  },
  {
    path: 'profile',
    component: SettingsComponent
  },
  {
    path:'profile/rental',
    component:RentalsComponent
  }
  ,
  {
    path:'profile/driver',
    component:DriversComponent
  },
  {
    path:'profile/payment',
    component:PaymentsComponent
  },{
    path:'profile/address',
    component:AddressesComponent
  },
  {
    path: 'admin',
    component: SettingsComponent
  },
  {
    path:'admin/cars',
    component:CarsComponent
  }
  ,
  {
    path:'admin/colors',
    component:ColorsComponent
  }
  ,
  {
    path:'admin/brands',
    component:BrandsComponent
  },
  {
    path:'admin/bodies',
    component:BodiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
