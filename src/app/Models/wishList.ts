
import { Hotel } from '../Models/Hotels';
export type wishList={
  id:number,
  isDeleted: boolean,
  clientId: number,
  hotels: Hotel[];

}

