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

    const productsService = productServiceFactory();
    const { userId } = useAuthContext();

    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [buysProducts, setBuysProducts] = useState([]);
    const [totalPrice, setTotalprice] = useState(0.0);


    useEffect(() => {
        if (userId) {
            Promise.all([
                productsService.getFavorite(productType.waterpomps, userId),
                productsService.getFavorite(productType.irigationSystems, userId),
                productsService.getFavorite(productType.parts, userId),
                productsService.getFavorite(productType.powerMachines, userId),
                productsService.getFavorite(productType.pipes, userId),
                productsService.getFavorite(productType.tools, userId),
            ]).then(([
                waterpompsFavorite,
                irigationSystemsFavorite,
                partsFavorite,
                powerMachinesFavorite,
                pipesFavorite,
                toolsFavorite,
            ]) => {
                setFavoriteProducts([
                    ...waterpompsFavorite,
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
                productsService.getBuy(productType.waterpomps, userId),
                productsService.getBuy(productType.irigationSystems, userId),
                productsService.getBuy(productType.parts, userId),
                productsService.getBuy(productType.powerMachines, userId),
                productsService.getBuy(productType.pipes, userId),
                productsService.getBuy(productType.tools, userId),
            ]).then(([
                waterpompsgetBuy,
                irigationSystemsgetBuy,
                partsgetBuy,
                powerMachinesgetBuy,
                pipesgetBuy,
                toolsgetBuy,
            ]) => {
                setBuysProducts([
                    ...waterpompsgetBuy,
                    ...irigationSystemsgetBuy,
                    ...partsgetBuy,
                    ...powerMachinesgetBuy,
                    ...pipesgetBuy,
                    ...toolsgetBuy,
                ]);
            });
        };
    }, [userId]);
    
    useEffect(()=>{
        if(buysProducts.length>0){
           let total=0
           buysProducts.forEach(x=>{
            total+=Number(x.quantity)*Number(x.price)
           })
            setTotalprice(total)
        }
    },[buysProducts])

    const onDeleteProduct = async (type, id) => {
        try {
            await productsService.del(type, id);
            navigate(`/shop/${type}`);
        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error,
            });
        };
    };

    const onCreateProduct = async (data) => {
        const type = data.type
        try {
            await productsService.create(type, data);
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
        try {
            await productsService.edit(type, id, data);
            navigate(`/shop/${type}/${id}`);
        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error,
            });
        };
    };


    const onAddFavorite = async (type, id, userId) => {
        try {
            const result = await productsService.addFavorite(type, id, { userId });
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
            const result = await productsService.removeFavorite(type, id, { userId });
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
            const result = await productsService.addBuy(type, id, { userId });
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
            const result = await productsService.removeBuy(type, id, { userId });
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
            setTotalprice(x=>x+foundProduct.price)
           
        } else if (value === 'dec')
            if (foundProduct.quantity - 1 > 0){
                foundProduct.quantity -= 1;
                setTotalprice(x=>x-foundProduct.price)
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
        onAddFavorite,
        onRemoveFavorite,
        onBuyProduct,
        onRemoveBuy,
        changeQty
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