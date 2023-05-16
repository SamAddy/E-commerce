export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: category
    images: string[]
}

export interface category {
    id: number
    name: string
    image: string
}