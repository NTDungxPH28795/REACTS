// import { Iproducts } from "../pages/types/users";
import { IUser, IAccount } from "../pages/types/users";
import instance from "./instance";

const getAllUser = () => {
    return instance.get('/users')
}

const getOneUser = (id: number) => {
    return instance.get(`/users/${id}`)
}

const addUser = (user: IUser) => {
    return instance.post('/users', user)
}
const delUser = (id: number) => {
    return instance.delete(`/users/${id}`)
}

const updateUser = (user: IUser) => {
    return instance.put(`/users/${user.id}`, user)
}

// export { getAll, getOneProduct, addProduct, delProduct, updateProduct }
export { getAllUser, getOneUser, addUser, delUser, updateUser }
