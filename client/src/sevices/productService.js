import { requestFactory } from "../lib/requester";


const url = 'http://localhost:3030/products';

export const productServiceFactory = () => {
    const request = requestFactory();

    const getAll = async (type) => {
        const result = await request.get(`${url}/${type}/`);
        const products = Object.values(result);
        return products;
    };

    const getById = async (type, id) => {
        const product = await request.get(`${url}/${type}/${id}`)
        return product
    };

    const create = async (type,data) => {
        const product = await request.post(`${url}/${type}/create`, data);
        return product;
    };
    
    const del = (type, id) => request.delete(`${url}/${type}/${id}/delete`);
    
    
    
    return {
        getAll,
        getById,
        create,
        del,
    }
}