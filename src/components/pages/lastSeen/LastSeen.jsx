import '../shopPoducts/products.css'

import { useEffect, useState, } from 'react';
import { useLocation } from 'react-router-dom';

import { productServiceFactory } from '../../../sevices/productService';
import { useAuthContext } from '../../../context/AuthContext';

import { productName, productType } from '../../../config/constants/constants';
import { Loading } from '../../cardComponents/loading/Loading';

import ProductCard from '../../cardComponents/productCard/ProductCard';

const LastSeen = () => {
    const productService = productServiceFactory();
    const { pathname } = useLocation();
    const { userId } = useAuthContext();

    const [lastSeenProducts, setLastSeenProducts] = useState([]);
    const [seenloading, setSeenloading] = useState(true);

    const getLastSeenProducts = async () => {
        const result = await Promise.all([
            productService.getLastSeen(productType.waterpumps, userId),
            productService.getLastSeen(productType.irigationSystems, userId),
            productService.getLastSeen(productType.parts, userId),
            productService.getLastSeen(productType.powerMachines, userId),
            productService.getLastSeen(productType.pipes, userId),
            productService.getLastSeen(productType.tools, userId),
        ]);
        const products = result.reduce((result, array) => result.concat(array), []);
        setLastSeenProducts(products);
        setSeenloading(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        if (userId) {
            getLastSeenProducts();
        }
    }, [pathname]);

    return (
        <div className="page">
            <div className="productTop">
                <h2>{productName.lastSeen}</h2>
            </div>
            <div className="productPage">
                {seenloading && (<Loading />)}
                {!seenloading && lastSeenProducts.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
            </div>
            {!seenloading && lastSeenProducts.length === 0 && (
                <p className="noProduct">There are no Products yet!</p>
            )}
        </div>
    );
};

export default LastSeen;