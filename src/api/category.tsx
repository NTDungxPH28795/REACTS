import { ICategories } from "../pages/types/categories";
import instance from "./instance";

export const getAllCategories = () => {
    return instance.get('/categories')
}

export const getOneCategories = (id: number | string) => {
    return instance.get(`/categories/${id}`)
}

export const addCategories = (categories: ICategories) => {
    return instance.post('/categories', categories)
}
export const delCategories = (id: number) => {
    return instance.delete(`/categories/${id}`)
}

export const updateCategories = (categories: ICategories) => {
    return instance.put(`/categories/${categories.id}`, categories)
}


