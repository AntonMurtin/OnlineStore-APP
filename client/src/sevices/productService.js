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

    const create = async (type, data) => {
        const product = await request.post(`${url}/${type}/create`, data);
        return product;
    };

    const edit = async (type, id, data) => {
        const result = await request.put(`${url}/${type}/${id}/edit`, data)

        return result;
    };

    const del = (type, id) => request.delete(`${url}/${type}/${id}/delete`);




    const search = async (type, data) => {
        const result = await request.put(`${url}/${type}/search`, data);
        const products = Object.values(result);

        return products;
    }



    const addFavorite = (type, id, userId) => request.put(`${url}/${type}/${id}/favorite`, userId)

    const removeFavorite = (type, id, userId) => request.put(`${url}/${type}/${id}/removeFavorite`, userId)

    const getFavorite = async (type, userId) => {
        const result = await request.get(`${url}/${type}/${userId}/favorite`);
        const products = Object.values(result);

        return products;
    };



    const addBuy = (type, id, data) => request.put(`${url}/${type}/${id}/buyProduct`, data)

    const removeBuy = (type, id, userId) => request.put(`${url}/${type}/${id}/removeBuy`, userId);

    const getBuy = async (type, userId) => {
        const result = await request.get(`${url}/${type}/${userId}/buyProduct`);
        const products = Object.values(result);

        return products;
    };
    const addLastSeen = (type, id, data) => request.put(`${url}/${type}/${id}/addLastSeen`, data)


    const getLastSeen = async (type, userId) => {
        const result = await request.get(`${url}/${type}/${userId}/getLastSeen`);
        const products = Object.values(result);
        return products;
    };


    return {
        getAll,
        getById,
        create,
        edit,
        del,
        search,
        addFavorite,
        getFavorite,
        removeFavorite,
        addBuy,
        getBuy,
        removeBuy,
        addLastSeen,
        getLastSeen,
    }
}