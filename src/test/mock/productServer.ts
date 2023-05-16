import { rest } from "msw"
import { setupServer } from "msw/node"

import  {product1, product2, product3, product4, product5 } from "../data/products"

const productServer = setupServer(
    rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
        return res(
            ctx.json([product1, product2, product3, product4, product5])
        )
    })
)

export default productServer