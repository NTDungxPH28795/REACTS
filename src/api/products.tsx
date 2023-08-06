import { Iproducts } from "../pages/types/products";
import instance from "./instance";

export const getAll = () => {
    return instance.get('/products')
}

export const getOneProduct = (id: number | string) => {
    return instance.get(`/products/${id}`)
}

export const addProduct = (product: Iproducts) => {
    return instance.post('/products', product)
}
export const delProduct = (id: number) => {
    return instance.delete(`/products/${id}`)
}

export const updateProduct = (product: Iproducts) => {
    return instance.put(`/products/${product.id}`, product)
}


