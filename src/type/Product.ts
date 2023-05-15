export interface Product {
    id: number
    tittle: string
    description: string
    category: category
    images: []
}

export interface category {
    id: number
    name: string
    image: string
}