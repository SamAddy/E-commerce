import productsReducer, { addNewProduct, fetchAllProducts, updateExistingProduct } from "../../redux/reducers/productsReducer"
import store from "../../redux/store"
import { CreatProduct } from "../../type/CreateProduct"
import { Product } from "../../type/Product"
import { product1, product2, product3, product4, product5 } from "../data/products"
import productServer from "../mock/productServer"

beforeAll(() => {
    productServer.listen()
})

afterAll(() => {
    productServer.close()
})

beforeEach(() => {
    store.dispatch({ type: "RESET"})
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
    test("Check should update existing product", async () => {
        const product = {
            id: 781,
            update: {
                title: "Updated Product",
                price: 5.99,
                description: "Update description",
                category: [
                    {
                        id: 1,
                        name: "Category 1",
                        image: ["https://testimage.com/updated.png"]
                    }
                ],
                images: ["https://testimage.com/updated2.png"]
            }
        }
    })
})