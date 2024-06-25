import { Offer } from "./Offers"
import { Restaurant } from "./Restaurants"

export type Owner = {
    id: number,
    user: any,
    offers: Offer[],
    restaurants: Restaurant[],
    isDeleted: boolean
}