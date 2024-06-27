export type Reservation = {
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  clientId: number;
  paymentIntentId: string|null;
  amount: number;
  roomId: number;
  state: number;
};

// export interface Reservation {
//   startDate: string;
//   endDate: string;
//   numberOfGuests: number;
//   clientId: number;
//   paymentIntentId: string;
//   amount: number;
//   roomIds: number[];
//   state: number;
// }
