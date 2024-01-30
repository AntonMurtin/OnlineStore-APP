import { createContext, useContext, useEffect, useState } from "react";

import { useAuthContext } from "./AuthContext";
import { useNotification } from "./NotificationContext";

import { productServiceFactory } from "../sevices/productService";
import { productType } from "../config/constants/constants";


const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
   
    const dispatch = useNotification();
    const productsService = productServiceFactory();

    const { userId } = useAuthContext();

    const [favoriteProducts, setFavoriteProducts] = useState([]);
   
 
    

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
                waterpompsData,
                irigationSystemsData,
                partsData,
                powerMachinesData,
                pipesData,
                toolsData,
            ]) => {
                setFavoriteProducts([
                    ...waterpompsData,
                    ...irigationSystemsData,
                    ...partsData,
                    ...powerMachinesData,
                    ...pipesData,
                    ...toolsData,
                ])
            })
        }
    }, [userId])


    const onAddFavorite = async (producTtype, productId, userId) => {

        try {
            const result = await productsService.addFavorite(producTtype, productId, { userId });
            setFavoriteProducts(state => [...state, result]);
            
           
            dispatch({
                type: 'SUCCESS',
                message: `You successfully add ${result.title} to Favorites.`,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ERROR',
                message: error,
            });
        };
    };

    const onRemoveFavorite = async (producTtype, productId, userId) => {

        try {
            const result = await productsService.removeFavorite(producTtype, productId, { userId });
            setFavoriteProducts(state => state.filter(x => x._id !== productId));
           
            dispatch({
                type: 'REMOVE',
                message: `You successfully remove ${result.title}.`,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ERROR',
                message: error,
            });
        };
    };


    const contextValues = {
        favoriteProducts,
        onAddFavorite,
        onRemoveFavorite
    }

    return (
        <FavoriteContext.Provider value={contextValues}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavoriteContext = () => {
    const context = useContext(FavoriteContext);
    return context;
};
