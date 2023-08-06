export interface RentalDetail {
  id: number;
  userId:number;
  brandName: string;
  firstName: string;
  lastName: string;
  rentDate: string;
  rentTime: string;
  returnDate: string;
  returnTime: string;
  returnLocationId:number;
  rentLocationId:number;
  rentDay:number;
  totalPrice:number;
}
