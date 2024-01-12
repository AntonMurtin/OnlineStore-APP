import { requestFactory } from "../lib/requester";


const url = 'http://localhost:3030/products';

export const productServiceFactory = () => {
    const request = requestFactory();

    const getAll = async (type) => {
        const result = await request.get(`${url}/${type}/`);
        const products = Object.values(result);

        return products;
    };

    return{
        getAll,
    }
}