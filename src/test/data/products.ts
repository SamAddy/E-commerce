import { CreateProduct } from "../../type/CreateProduct";
import { Product } from "../../type/Product";
import { ProductUpdate } from "../../type/ProductUpdate";
import { category1, category2, category3 } from "./categories";

const product1: Product = {
    id: 770,
    title: "Product 1",
    price: 50,
    description: "Product 1 description",
    category: category1,
    images: [
        "https://placeimg.com/640/480/any?r=0.9178516507833767"
    ]
}

const product2: Product = {
    id: 771,
    title: "Product 2",
    price: 150,
    description: "Product 2 description",
    category: category2,
    images: [
        "https://placeimg.com/640/480/any?r=0.9178516507833767"
    ]
}

const product3: Product = {
    id: 772,
    title: "Product 3",
    price: 70,
    description: "Quality shoes for vibes",
    category: category3,
    images: [
        "https://placeimg.com/640/480/any?r=0.9178516507833767"
    ]
}

const product4: Product = {
    id: 773,
    title: "Product 4",
    price: 149,
    description: "Product 4 description",
    category: category1,
    images: [
        "https://placeimg.com/640/480/any?r=0.9178516507833767"
    ]
}

const product5: Product = {
    id: 774,
    title: "Product 5",
    price: 149,
    description: "Product 5 description",
    category: category2,
    images: [
        "https://placeimg.com/640/480/any?r=0.9178516507833767"
    ]
}

const product6: Product = {
    id: 775,
    title: "Product 6",
    price: 574,
    description: "Product 6 description",
    category: category3,
    images: [
        "https://placeimg.com/640/480/any?r=0.9178516507833767"
    ]
}

const newProduct: CreateProduct = {
    title: "New Product 1",
    price: 229,
    description: "New Product here",
    images: [""],
    categoryId: 2
}

const newProduct2: CreateProduct = {
    title: "New Product 2",
    price: 9.99,
    description: "New Product two here",
    images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    categoryId: 3
}

const invalidProduct: CreateProduct = {
    title: "Invalid product 1",
    price: 0,
    description: "new product",
    images: [],
    categoryId: 4
}

const updateProduct: ProductUpdate = {
    id: 770,
    update: {
        title: "Updated Product",
        price: 0
    }
}

export const products = [product1, product2, product3, product4, product5, product6]
export { product1, product2, product3, product4, product5, product6, newProduct, newProduct2, invalidProduct, updateProduct }