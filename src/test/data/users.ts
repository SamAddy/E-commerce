import { NewUser, User } from "../../type/User"

const user1: User = {
    id: 1,
    email: "hill@gmail.com",
    name: "hill",
    password: "hill",
    avatar: "",
    role: "admin"
}

const user2: User = {
    id: 2,
    email: "karina@gmail.com",
    name: "karina",
    password: "karina",
    avatar: "",
    role: "customer"
}

const user3: User = {
    id: 3,
    email: "sherif@gmail.com",
    name: "sherif",
    password: "sherif",
    avatar: "",
    role: "admin"
}

const user4: User = {
    id: 4,
    email: "bismark@mail.com",
    name: "bismark",
    password: "bismark",
    avatar: "https://unsplash.com/photos/PyCTsJsdtG0",
    role: "customer"
}

const newUser: NewUser = {
    name: "Benjamin",
    email: "ben@gmail.com",
    password: "testUser",
    avatar: "https://unsplash.com/photos/PyCTsJsdtG0"
}

export const users = [user1, user2, user3, user4]
export { user1, user2, user3, user4, newUser } 