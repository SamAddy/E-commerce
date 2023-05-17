import { Category } from "./Category"

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: Category
    images: string[]
}

export interface ProductState {
    products: Product[],
    loading: boolean,
    error: string
}