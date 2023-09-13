import { CarImage } from './carImage';
export interface CarDetail {
  carId: number;
  brandId: number;
  colorId: number;
  fuelId: number;
  bodyId: number;
  modelId: number;
  transmissionId: number;
  colorName: string;
  brandName: string;
  modelName: string;
  fuelType: string;
  bodyType: string;
  transmissionType: string;
  description: string;
  modelYear: number;
  dailyPrice: number;
  numberOfPassengers: string;
  airConditioning: boolean;
  deposit: number;
  kilometerLimit: number;
  availability: boolean;
  creditScore: number;
  carImages: CarImage[];
}
