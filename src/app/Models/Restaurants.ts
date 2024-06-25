import { Hotel } from "./Hotels"
import { Owner } from "./Owners"
export type Restaurant={
    id: number,
    name: string,
    rate: number,
    ambience: number,
    cuisine: number,
    dietaryOptions:number,
    openFor:number,
    hotel: Hotel,
    hotelId: number,
    owner: Owner,
    ownerId: number,
    isDeleted: boolean
}