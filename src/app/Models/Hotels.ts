import { image } from './Images';
import { Owner } from './Owners';
import { Restaurant } from './Restaurants';
import { Review } from './Reviews';

export type addressModel = {
  city: string;
  street: string;
  postalCode: string;
};

export type Hotel = {
  id: number;
  name: string;
  description: string;
  numberOfStars: number;
  address: addressModel;
  isDeleted: boolean;
  restaurants: Restaurant[];
  ownerId: number;
  owner: Owner;
  wishLists: [];
  reviews: Review[];
  rooms: [];
  complains: [];
  images: image[];
};
