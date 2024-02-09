import { useEffect, useState, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import { productServiceFactory } from '../../../../sevices/productService';
import { useAuthContext } from '../../../../context/AuthContext';

import { productName, productType } from '../../../../config/constants/constants';

const ProductCard = lazy(() => import('../../../CardComponents/ProductCard/ProductCard'));

const LastSeen = () => {
    const { pathname } = useLocation();
    const productService = productServiceFactory();
    const { userId } = useAuthContext();

    const [lastSeenProducts, setLastSeenProducts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
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
    }, [pathname]);
    return (
        <div className="page">
            <div className="productTop">
                <h2>{productName.lastSeen}</h2>
            </div>
            <div className="productPage">
                <Suspense fallback={<h1 style={{ textAlign: 'center' }}>Loading...</h1>}>
                    {lastSeenProducts && lastSeenProducts.map(x =>
                        <ProductCard key={x._id} {...x} />
                    )}
                </Suspense>
            </div>
            {/* {lastSeenProducts.length === 0 && (
                <p className="noProduct">There are no Products yet!</p>
            )} */}

        </div>

    );
};

export default LastSeen;