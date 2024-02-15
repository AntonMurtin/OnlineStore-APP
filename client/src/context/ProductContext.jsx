import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNotification } from "./NotificationContext";
import { useAuthContext } from "./AuthContext";

import { productServiceFactory } from "../sevices/productService";
import { productType } from "../config/constants/constants";

const ProductContext = createContext();

export const ProductProvider = ({
    children
}) => {
    const navigate = useNavigate();
    const dispatch = useNotification();

    const productService = productServiceFactory();
    const { userId } = useAuthContext();

    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [buysProducts, setBuysProducts] = useState([]);
    const [totalPrice, setTotalprice] = useState(0.0);
    // const [search, setSearch] = useState(null);


    useEffect(() => {
        if (userId) {
            Promise.all([
                productService.getFavorite(productType.waterpumps, userId),
                productService.getFavorite(productType.irigationSystems, userId),
                productService.getFavorite(productType.parts, userId),
                productService.getFavorite(productType.powerMachines, userId),
                productService.getFavorite(productType.pipes, userId),
                productService.getFavorite(productType.tools, userId),
            ]).then(([
                waterpumpsFavorite,
                irigationSystemsFavorite,
                partsFavorite,
                powerMachinesFavorite,
                pipesFavorite,
                toolsFavorite,
            ]) => {
                setFavoriteProducts([
                    ...waterpumpsFavorite,
                    ...irigationSystemsFavorite,
                    ...partsFavorite,
                    ...powerMachinesFavorite,
                    ...pipesFavorite,
                    ...toolsFavorite,
                ]);
            });
        };
    }, [userId]);

    useEffect(() => {
        if (userId) {
            Promise.all([
                productService.getBuy(productType.waterpumps, userId),
                productService.getBuy(productType.irigationSystems, userId),
                productService.getBuy(productType.parts, userId),
                productService.getBuy(productType.powerMachines, userId),
                productService.getBuy(productType.pipes, userId),
                productService.getBuy(productType.tools, userId),
            ]).then(([
                waterpumpsgetBuy,
                irigationSystemsgetBuy,
                partsgetBuy,
                powerMachinesgetBuy,
                pipesgetBuy,
                toolsgetBuy,
            ]) => {
                setBuysProducts([
                    ...waterpumpsgetBuy,
                    ...irigationSystemsgetBuy,
                    ...partsgetBuy,
                    ...powerMachinesgetBuy,
                    ...pipesgetBuy,
                    ...toolsgetBuy,
                ]);
            });
        };
    }, [userId]);

  

    useEffect(() => {
        if (buysProducts.length > 0) {
            let total = 0
            buysProducts.forEach(x => {
                total += Number(x.quantity) * Number(x.price)
            })
            setTotalprice(total)
        }
    }, [buysProducts])

    const onDeleteProduct = async (type, id) => {
        try {
            await productService.del(type, id);
            navigate(`/shop/${type}`);
        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error,
            });
        };
    };

    const onCreateProduct = async (data) => {
        const type = data.type;
        data.quantity = 1;
        try {
            await productService.create(type, data);
            navigate(`/shop/${type}`);
        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error,
            });
        };
    };

    const onEditProduct = async (data) => {
        const type = data.type;
        const id = data._id;
        console.log(data);
        try {
            await productService.edit(type, id, data);
            navigate(`/shop/${type}/${id}`);
        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error,
            });
        };
    };
    const onSearch = (value) => {
        const searchName=value.searchName
      
        navigate(`/search/${searchName}`);
    }

    const onAddFavorite = async (type, id, userId) => {
        try {
            const result = await productService.addFavorite(type, id, { userId });
            setFavoriteProducts(state => [...state, result]);
            dispatch({
                type: 'SUCCESS',
                message: `You successfully add ${result.title} to Favorites.`,
            });
        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error,
            });
        };
    };

    const onRemoveFavorite = async (type, id, userId) => {
        try {
            const result = await productService.removeFavorite(type, id, { userId });
            setFavoriteProducts(state => state.filter(x => x._id !== id));
            dispatch({
                type: 'REMOVE',
                message: `You successfully remove ${result.title}.`,
            });
        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error,
            });
        };
    };


    const onBuyProduct = async (type, id, userId) => {
        try {
            const result = await productService.addBuy(type, id, { userId });
            setBuysProducts(state => [...state, result]);
            dispatch({
                type: 'SUCCESS',
                message: `You successfully add ${result.title} to Yours Buys.`,
            });
        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error,
            });
        };
    };

    const onRemoveBuy = async (type, id, userId) => {
        try {
            const result = await productService.removeBuy(type, id, { userId });
            setBuysProducts(state => state.filter(x => x._id !== id));
            dispatch({
                type: 'REMOVE',
                message: `You successfully remove ${result.title}.`,
            });
        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error,
            });
        };
    };



    const changeQty = (id, value) => {
        const foundProduct = buysProducts.find((item) => item._id === id);
       
        if (value === 'inc') {
            foundProduct.quantity += 1;
            setTotalprice(x => x + foundProduct.price)
       
        } else if (value === 'dec')
            if (foundProduct.quantity - 1 > 0) {
                foundProduct.quantity -= 1;
                setTotalprice(x => x - foundProduct.price)
            }
        setBuysProducts(state => state.map(x => x._id === id ? foundProduct : x))
    }

    const value = {
        // search,
        favoriteProducts,
        buysProducts,
        totalPrice,
        onDeleteProduct,
        onCreateProduct,
        onEditProduct,
        onSearch,
        onAddFavorite,
        onRemoveFavorite,
        onBuyProduct,
        onRemoveBuy,
        changeQty,
        // onAddSeenProduct,
    }
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);

    return context;
};