import { Product } from "./Product"

export interface ProductUpdate {
    id: number
    update: Omit<Product, "id">
}
