import { rest } from "msw"
import { setupServer } from "msw/node"

import { product1, product2, product3, product4, product5, products } from "../data/products"
import { CreateProduct } from "../../type/CreateProduct"
import categories from "../data/categories"
import { Product } from "../../type/Product"
import { ProductUpdate } from "../../type/ProductUpdate"
import { Update } from "@reduxjs/toolkit"

let productServerId = 800
let updateRequestId = 770
let deleteId = 774
const productServer = setupServer(
    rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
        return res(
            ctx.json([product1, product2, product3, product4, product5])
        )
    }),
    rest.post("https://api.escuelajs.co/api/v1/products/", async (req, res, ctx) => {
        const newProduct = await req.json() as CreateProduct
        const category = categories.find(c => c.id === newProduct.categoryId)
        const error: string[] = []
        let product: Product | null = null
        if (!(newProduct.price > 0)) {
            error.push("Price must be greater than 0")
        }
        if (!Array.isArray(newProduct.images)) {
            error.push("Images must be an array")
        }
        else if (newProduct.images.length < 1) {
            error.push("Images must contain at least 1 image.")
        }
        else if (newProduct.images.some(item => typeof item !== "string")) {
            error.push("Images must be an array of string.")
        }
        if (!category) {
            error.push("Category does not exist")
        }
        else {
            product = {
                title: newProduct.title,
                price: newProduct.price,
                category: category,
                description: newProduct.description,
                images: newProduct.images,
                id: productServerId++
            }
        }
        if (error.length > 0) {
            return res(
                ctx.status(400),
                ctx.json({
                    statusCode: 400,
                    message: error,
                    error: "Bad Request"
                })
            )
        }
        return res(
            ctx.status(201),
            ctx.json(product)
        )
    }),
    rest.put(`https://api.escuelajs.co/api/v1/products/${updateRequestId}`, async (req, res, ctx) => {
        const updateRequest = await req.json() as ProductUpdate
        const error: string[] = []
        const index = products.findIndex(p => p.id == updateRequest.id)
        if (updateRequest.update.price && updateRequest.update.price <= 0) {
            error.push("Price needs to be greater than 0")
        }
        if (index === -1) {
            error.push("Product was not found.")
        }
        else {
            products[index] = Object.assign({}, products[index], updateRequest.update)
        }
        if (error.length > 0) {
            return res(
                ctx.status(204),
                ctx.json({
                    statusCode: 204,
                    message: error,
                    error: "No content"
                })
            )
        }
        else {
            return res(
                ctx.status(200),
                ctx.json(products)
            )
        }
    }), 
    rest.delete(`https://api.escuelajs.co/api/v1/products/${deleteId}`, async (res, req, ctx) => {
    })
)

export default productServer