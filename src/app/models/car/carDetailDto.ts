import { CarImage } from './carImage';
export interface CarDetail{
  carId: number;
  brandId:number;
  colorId:number;
  fuelId:number;
  bodyId:number;
  colorName:string;
  brandName:string;
  fuelType:string;
  bodyType:string;
  transmissionType:string;
  carName:string;
  modelYear:number;
  dailyPrice:number;
  numberOfPassengers:number;
  airConditioning:boolean;
  deposit:number;
  kilometerLimit:number;
  availability:boolean;
  carImages:CarImage[];
}
