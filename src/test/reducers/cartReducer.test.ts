import { addProduct, clearCart, removeProduct, updateProductQuantity } from "../../redux/reducers/cartReducer"
import { cartProduct1, cartProduct2, cartProduct3 } from "../data/cart"
import store from "../shared/store"

beforeEach(() => {
    store.dispatch(clearCart())
})

describe("Testing cartReducer", () => {
    test("Should add product to shopping cart", () => {
        store.dispatch(addProduct(cartProduct1))
        store.dispatch(addProduct(cartProduct2))
        expect(store.getState().cartReducer.items).toContain(cartProduct1)
        expect(store.getState().cartReducer.items).toContain(cartProduct2)
    })
    test("Should remove product by its id", () => {
        store.dispatch(removeProduct(cartProduct1.id))
        expect(store.getState().cartReducer.items).not.toContain(cartProduct1)
    })
    test("Should update product quantity", () => {
        const updatedQuantity = 9
        store.dispatch(addProduct(cartProduct3))
        store.dispatch(updateProductQuantity({id: cartProduct3.id, quantity:updatedQuantity}))
        const state = store.getState().cartReducer
        const updateProduct = state.items.find((item) => item.id === cartProduct3.id)
        expect(updateProduct?.quantity).toEqual(updatedQuantity)
    })
})