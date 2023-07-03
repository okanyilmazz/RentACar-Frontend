export interface Rental {
  id: number;
  carId: number;
  userId: number;
  rentDate: string;
  rentTime: string;
  rentLocationId: number;
  returnDate: string;
  returnTime: string;
  returnLocationId: number;
  rentDay:number;
  totalPrice: number;
}
