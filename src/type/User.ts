export interface User {
    id: string
    email: string
    password: string
    name: string
    role: "admin" | "customer"
    avatar: string
}