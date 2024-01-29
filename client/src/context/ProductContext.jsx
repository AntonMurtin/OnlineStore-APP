import { createContext, useContext, useEffect, useState } from "react";
import { productServiceFactory } from "../sevices/productService";
import { useNotification } from "./NotificationContext";
import { useNavigate } from "react-router-dom";


const ProductContext = createContext();


export const ProductProvider = ({
    children
}) => {
    const navigate = useNavigate()
    const productsService = productServiceFactory();
    const dispatch = useNotification();

    const [waterpomps, setWaterpomps] = useState([]);
    const [systems, setSystems] = useState([]);
    const [parts, setParts] = useState([]);
    const [machines, setMachines] = useState([]);
    const [pipes, setPipes] = useState([]);
    const [tools, setTools] = useState([]);
    const [product, setProduct] = useState([]);
    // const [search, setSearch] = useState(null);




    useEffect(() => {
        Promise.all([
            productsService.getAll('waterpomps'),
            productsService.getAll('irigationSystems'),
            productsService.getAll('parts'),
            productsService.getAll('powerMachines'),
            productsService.getAll('pipes'),
            productsService.getAll('tools'),

        ]).then(([
            waterpompsData,
            irigationSystemsData,
            partsData,
            powerMachinesData,
            pipesData,
            toolsData,
        ]) => {
            setWaterpomps(waterpompsData);
            setSystems(irigationSystemsData);
            setParts(partsData);
            setMachines(powerMachinesData);
            setPipes(pipesData);
            setTools(toolsData);
            // setProduct([
            //     waterpompsData[0],
            //     systemsData[0],
            //     partsData[0],
            //     machinesData[0],
            //     pipesData[0],
            //     toolsData[0],
            // ])
        })
    }, []);
    const setValue = {
        waterpomps: setWaterpomps,
        systems: setSystems,
        parts: setParts,
        machines: setMachines,
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

    const oneditProduct = async (data) => {
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
    }


    const value = {
        waterpomps,
        systems,
        parts,
        machines,
        pipes,
        tools,
        product,
        // search,
        onDeleteProduct,
        onCreateProduct,
        oneditProduct,
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