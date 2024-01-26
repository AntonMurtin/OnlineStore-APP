import { createContext, useContext, useEffect, useState } from "react";
import { productServiceFactory } from "../sevices/productService";
import { useNotification } from "./NotificationContext";
import { useNavigate } from "react-router-dom";


const ProductContext = createContext();


export const ProductProvider = ({
    children
}) => {
    const navigate=useNavigate()
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

    const setValue = {
        waterpomps: setWaterpomps,
        systems: setSystems,
        parts: setParts,
        machines: setMachines,
        pipes: setPipes,
        tools: setTools
    }


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

    const onDeleteProduct = async (type, id) => {
        console.log(setValue[type]);
        try {
            await productsService.del(type, id);
            setValue[type](state => state.filter(x => x._id !== id))
            navigate(`/shop/${type}`)

        } catch (error) {
            console.log(error);
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
        onDeleteProduct
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