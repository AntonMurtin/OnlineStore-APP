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
    const { userId } = useAuthContext();

    const [waterpomps, setWaterpomps] = useState([]);
    const [irigationSystems, setIrigationSystems] = useState([]);
    const [parts, setParts] = useState([]);
    const [powerMachines, setPowerMachines] = useState([]);
    const [pipes, setPipes] = useState([]);
    const [tools, setTools] = useState([]);
    const [product, setProduct] = useState([]);
    // const [search, setSearch] = useState(null);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [buysProducts, setBuysProducts] = useState([]);


    const setValue = {
        waterpomps: setWaterpomps,
        irigationSystems: setIrigationSystems,
        parts: setParts,
        powerMachines: setPowerMachines,
        pipes: setPipes,
        tools: setTools
    }




    useEffect(() => {
        Promise.all([
            productsService.getAll(productType.waterpomps),
            productsService.getAll(productType.irigationSystems),
            productsService.getAll(productType.parts),
            productsService.getAll(productType.powerMachines),
            productsService.getAll(productType.pipes),
            productsService.getAll(productType.tools),

        ]).then(([
            waterpompsProducts,
            irigationSystemsProducts,
            partsProducts,
            powerMachinesProducts,
            pipesProducts,
            toolsProducts,
        ]) => {
            setWaterpomps(waterpompsProducts);
            setIrigationSystems(irigationSystemsProducts);
            setParts(partsProducts);
            setPowerMachines(powerMachinesProducts);
            setPipes(pipesProducts);
            setTools(toolsProducts);
            setProduct([
                waterpompsProducts[0],
                irigationSystemsProducts[0],
                partsProducts[0],
                powerMachinesProducts[0],
                pipesProducts[0],
                toolsProducts[0],
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
                ])
            })
        }
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
                ])
            })
        }
    }, [userId]);

    const onDeleteProduct = async (type, id) => {
        try {
            await productsService.del(type, id);
            setValue[type](state => state.filter(x => x._id !== id))
            navigate(`/shop/${type}`)
        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error,
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
                message: error,
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
                message: error,
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
            setValue[type](state => state.map(x => x._id === id ? result : x));
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
            setValue[type](state => state.map(x => x._id === id ? result : x));
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
            setValue[type](state => state.map(x => x._id === id ? result : x));
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
        buysProducts,
        onDeleteProduct,
        onCreateProduct,
        onEditProduct,
        onAddFavorite,
        onRemoveFavorite,
        onBuyProduct,
        onRemoveBuy
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