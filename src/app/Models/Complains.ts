export type Complain = {
  description: string;
  hotelId: number;
  ownerId: number;
  clientId: number;
  date: string | null;
};
export type getComplain = {
  id: number;
  discription: string;
  isSolved: boolean;
  isDeleted: boolean;
  date: string;
  hotelId: number;
  hotel: null;
  owner: null;
  ownerId: null;
  client: null;
  clientId: number;
};
