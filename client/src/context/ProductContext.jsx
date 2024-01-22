import { createContext, useContext, useEffect, useState } from "react";
import { productServiceFactory } from "../sevices/productService";


const ProductContext=createContext();


export const ProductProvider=({
    children
})=>{
const productsService=productServiceFactory()
    
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
            productsService.getAll('systems'),
            productsService.getAll('parts'),
            productsService.getAll('machines'),
            productsService.getAll('pipes'),
            productsService.getAll('tools'),

        ]).then(([
            waterpompsData,
            systemsData,
            partsData,
            machinesData,
            pipesData,
            toolsData,
        ]) => {
            setWaterpomps(waterpompsData);
            setSystems(systemsData);
            setParts(partsData);
            setMachines(machinesData);
            setPipes(pipesData);
            setTools(toolsData);
            setProduct([
                waterpompsData[0],
                systemsData[0],
                partsData[0],
                machinesData[0],
                pipesData[0],
                toolsData[0],
            ])
        })
    }, []);

    const value={
        waterpomps,
        systems,
        parts,
        machines,
        pipes,
        tools,
        product,
        // search,
    }
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext=()=>{
    const context=useContext(ProductContext);

    return context;
}