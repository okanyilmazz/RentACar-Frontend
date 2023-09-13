export interface Payment{
  id:number;
  userId:number;
  cardNumber:string;
  cardName:string;
  cardMonth:number;
  cardYear:number;
  cardSecurityCode:number;
  usableBalanceLimit:number;
}