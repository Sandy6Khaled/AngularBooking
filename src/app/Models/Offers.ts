import { Hotel } from "./Hotels";

export type Offer= {
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  discount: number;
  isDeleted: boolean;
  ownerId: number;
  hotelId: number;
  // hotel:Hotel;
};
export type addedOffer= {

  description: string;
  startDate: string;
  endDate: string;
  discount: number;
  userId: number;
  hotelId: number;
  // hotel:Hotel;
};
