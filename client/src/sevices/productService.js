import { useNotification } from "../context/NotificationContext";
import { requestFactory } from "../lib/requester";


const url = 'http://localhost:3030/products';

export const productServiceFactory = () => {
    const request = requestFactory();
    const dispatch = useNotification()
    const getAll = async (type) => {
        try {
            const result = await request.get(`${url}/${type}/`);
            const products = Object.values(result);

            return products;
        } catch (error) {
            dispatch({
                type:'ERROR',
                message: 'Server is not Working'
               })
        }
    };

    const getById = async (type, id) => {
        try {
            const product = await request.get(`${url}/${type}/${id}`)
            return product
        } catch (error) {
           dispatch({
            type:'ERROR',
            message: 'Server is not Working'
           })
        }
    }
    return {
        getAll,
        getById,
    }
}