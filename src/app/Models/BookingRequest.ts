// export type Book={
//     startDate: "2024-06-25T15:51:37.733Z",
//     endDate: "2024-06-28T15:51:37.734Z",
//     numberOfGuests: number,
//     amount: number,
//     roomIds: [
//       number
//     ]
//   }



export interface Reservation {
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  clientId: number;
  paymentIntentId: string;
  amount: number;
  roomIds: number[];
  state: number;
}
