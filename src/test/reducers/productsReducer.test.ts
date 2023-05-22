import productsReducer, { addNewProduct, cleanUpProductReducer, fetchAllProducts, sortProductByPrice, updateExistingProduct } from "../../redux/reducers/productsReducer"

import store from "../../redux/store"
import { invalidProduct, newProduct, newProduct2, product1, product2, product3, product4, product5, updateProduct } from "../data/products"
import productServer from "../mock/productServer"

beforeAll(() => {
    productServer.listen()
})

afterAll(() => {
    productServer.close()
})

beforeEach(() => {
    store.dispatch(cleanUpProductReducer)
})

describe("Testing productsReducer", () => {
    test("Check initialState", () => {
        const state = productsReducer(undefined, { type: "unknown" })
        expect(state).toEqual({
            products: [],
            loading: false,
            error: ""
        })
    })
    test("Check should fetch all products", async () => {
        await store.dispatch(fetchAllProducts())
        expect(store.getState().productsReducer.products.length).toBe(5)
        expect(store.getState().productsReducer.products).toEqual([product1, product2, product3, product4, product5])
        expect(store.getState().productsReducer.loading).toBeFalsy()
        expect(store.getState().productsReducer.error).toBeFalsy()
    })
    test("Check should add new product", async () => {
        await store.dispatch(addNewProduct(newProduct))
        expect(store.getState().productsReducer.products.length).toBe(6)
        expect(store.getState().productsReducer.products[5].title).toBe("New Product 1")
    })
    test("Check should check if invalid product has been created", async () => {
        await store.dispatch(addNewProduct(invalidProduct))
        expect(store.getState().productsReducer.products.length).toBe(6)
        expect(store.getState().productsReducer.error.length).toBeGreaterThan(0)
        expect(store.getState().productsReducer.error).toBe(JSON.stringify(
            {
                statusCode: 400,
                message: [
                    "Price must be greater than 0",
                    "Images must contain at least 1 image.",
                    "Category does not exist"
                ],
                error: "Bad Request"
            }
        ))
    })
    test("Check should update existing product", async () => {
        await store.dispatch(updateExistingProduct(updateProduct))
        const state = store.getState().productsReducer.products
        // expect(state[0].title).toBe("Updated Product")
    })
    // test("Check should sort products by price in ascending order", ()  => {
    //     store.dispatch(sortProductByPrice("asc"))
    //     expect(store.getState().productsReducer.products).toEqual([product1, product2, product3, product4, product5])
    // })
    // test("Check should sort products by price in descending order", ()  => {
    //     store.dispatch(sortProductByPrice("desc"))
    //     expect(store.getState().productsReducer.products).toEqual([product1, product2, product3, product4, product5])
    // })
})