import '../product.css';

import { useEffect, useState, } from 'react';
import { useLocation } from 'react-router-dom';

import { productServiceFactory } from '../../../../sevices/productService';
import { useAuthContext } from '../../../../context/AuthContext';

import { productName, productType } from '../../../../config/constants/constants';
import { Loading } from '../../../cardComponents/loading/Loading';

import ProductCard from '../../../cardComponents/productCard/ProductCard';

const LastSeen = () => {
    const { pathname } = useLocation();
    const productService = productServiceFactory();
    const { userId } = useAuthContext();

    const [lastSeenProducts, setLastSeenProducts] = useState([]);
    const [seenloading, setSeenloading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setSeenloading(true);
        if (userId) {
            Promise.all([
                productService.getLastSeen(productType.waterpumps, userId),
                productService.getLastSeen(productType.irigationSystems, userId),
                productService.getLastSeen(productType.parts, userId),
                productService.getLastSeen(productType.powerMachines, userId),
                productService.getLastSeen(productType.pipes, userId),
                productService.getLastSeen(productType.tools, userId),
            ]).then(([
                waterpumpsgetSeen,
                irigationSystemsgetSeen,
                partsgetSeen,
                powerMachinesgetSeen,
                pipesgetSeen,
                toolsgetSeen,
            ]) => {
                setLastSeenProducts([
                    ...waterpumpsgetSeen,
                    ...irigationSystemsgetSeen,
                    ...partsgetSeen,
                    ...powerMachinesgetSeen,
                    ...pipesgetSeen,
                    ...toolsgetSeen,
                ]);
            });
        };
        setSeenloading(false);
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
            {/* {lastSeenProducts.length === 0 && (
                <p className="noProduct">There are no Products yet!</p>
            )} */}
        </div>
    );
};

export default LastSeen;