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
    const navigate = useNavigate()
    const productsService = productServiceFactory();
    const dispatch = useNotification();
    const {userId} =useAuthContext();

    const [waterpomps, setWaterpomps] = useState([]);
    const [irigationSystems, setIrigationSystems] = useState([]);
    const [parts, setParts] = useState([]);
    const [powerMachines, setPowerMachines] = useState([]);
    const [pipes, setPipes] = useState([]);
    const [tools, setTools] = useState([]);
    const [product, setProduct] = useState([]);
    // const [search, setSearch] = useState(null);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
   





    useEffect(() => {
        Promise.all([
            productsService.getAll(productType.waterpomps),
            productsService.getAll(productType.irigationSystems),
            productsService.getAll(productType.parts),
            productsService.getAll(productType.powerMachines),
            productsService.getAll(productType.pipes),
            productsService.getAll(productType.tools),

        ]).then(([
            waterpompsData,
            irigationSystemsData,
            partsData,
            powerMachinesData,
            pipesData,
            toolsData,
        ]) => {
            setWaterpomps(waterpompsData);
            setIrigationSystems(irigationSystemsData);
            setParts(partsData);
            setPowerMachines(powerMachinesData);
            setPipes(pipesData);
            setTools(toolsData);
            setProduct([
                waterpompsData[0],
                irigationSystemsData[0],
                partsData[0],
                powerMachinesData[0],
                pipesData[0],
                toolsData[0],
            ])
        })
    }, []);

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

    const setValue = {
        waterpomps: setWaterpomps,
        irigationSystems: setIrigationSystems,
        parts: setParts,
        powerMachines: setPowerMachines,
        pipes: setPipes,
        tools: setTools
    }

    const onDeleteProduct = async (type, id) => {

        try {
            await productsService.del(type, id);
            setValue[type](state => state.filter(x => x._id !== id))
            navigate(`/shop/${type}`)

        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error.message,
            });
        }
    };

    const onCreateProduct = async (data) => {
        const type = data.type
        try {
            const newProduct = await productsService.create(type, data);
            setValue[type](state => [...state, newProduct]);
            navigate(`/shop/${type}`)

        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error.message,
            });
        };
    };

    const onEditProduct = async (data) => {
        const type = data.type;
        const id = data._id;

        try {
            const result = await productsService.edit(type, id, data);
            setValue[type](state => state.map(x => x._id === data._id ? result : x))
            navigate(`/shop/${type}/${id}`)
        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error.message,
            });
        }
    };

    const onAddFavorite = async (type, id, userId) => {
        try {
            const result = await productsService.addFavorite(type, id, { userId });
            setFavoriteProducts(state => [...state, result]);
            setValue[type](state => state.map(x => x._id === id ? result : x));
            
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

    const onRemoveFavorite = async (type,id, userId) => {
        try {
            const result = await productsService.removeFavorite(type, id, { userId });
            setFavoriteProducts(state => state.filter(x => x._id !== id));
            setValue[type](state => state.map(x => x._id === id ? result : x));
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


    const value = {
        waterpomps,
        irigationSystems,
        parts,
        powerMachines,
        pipes,
        tools,
        product,
        // search,
        favoriteProducts,
        onDeleteProduct,
        onCreateProduct,
        onEditProduct,
        onAddFavorite,
        onRemoveFavorite
    }
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => {
    const context = useContext(ProductContext);

    return context;
}