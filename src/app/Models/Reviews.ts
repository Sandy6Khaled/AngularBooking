export type Review = {
  id: number;
  rate: number;
  comment: string;
  hotelId: number;
  hotel:{
    id: number;
    name: string;
  };
  client: {
    id: number;
    name: string;
  };
};
