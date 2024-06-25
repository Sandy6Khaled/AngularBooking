import { image } from './Images';
import { Offer } from './Offers';
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
  wishLists: any[];
  reviews: Review[];
  offers:Offer[];
  rooms: any[];
  complains: any[];
  images: image[];
};
