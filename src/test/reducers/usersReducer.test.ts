import usersReducer, { cleanUpUsersReducer, fetchAllUsers, login, registerUser } from "../../redux/reducers/usersReducer"
import { newUser } from "../data/users"
import userServer from "../mock/userServer"
import store from "../shared/store"

beforeAll(() => {
    userServer.listen()
})

afterAll(() => {
    userServer.close()
})
beforeEach(() => {
    store.dispatch(cleanUpUsersReducer)
})

describe("Testing userReducer", () => {
    test("Check initial state", () => {
        const state = usersReducer(undefined, { type: "unknown" })
        expect(state).toEqual({
            users: [], 
            loading: false, 
            error: ""
        })
    })
    test("Check should fetch all users", async () => {
        await store.dispatch(fetchAllUsers())
        expect(store.getState().usersReducer.users.length).toBe(4)
        expect(store.getState().usersReducer.error).toBe("")
        expect(store.getState().usersReducer.loading).toBe(false)
    })
    test("Should fetch all users in pending state", () => {
        const state = usersReducer(undefined, fetchAllUsers.pending)
        expect(state.loading).toBe(true)
    })
    test("Should fetch all users in rejected state", () => {
        const state = usersReducer(undefined, fetchAllUsers.rejected)
        expect(state.error).toEqual("Error fetching users. Please try again.")
        expect(state.loading).toBe(false)
    })
    test("Should check login user in fullfilled state", async () => {
        const email = "admin@mail.com"
        const password = "admin123"
        await store.dispatch(login({ email, password }))
        expect(store.getState().usersReducer.currentUser?.name).toBe('Admin')
    })
})