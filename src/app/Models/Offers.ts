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
