import '../product.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { productServiceFactory } from '../../../../sevices/productService';
import { useAuthContext } from '../../../../context/AuthContext';

import { productName, productType } from '../../../../config/constants/constants';
import { Loading } from '../../../cardComponents/loading/Loading';

import ProductCard from '../../../cardComponents/productCard/ProductCard';
import Slider from '../../../swiperComponents/slider/Slider';


const Parts = () => {
    const productService = productServiceFactory();
    const { userId } = useAuthContext();

    const [lastSeenProducts, setLastSeenProducts] = useState([]);
    const [parts, setParts] = useState([]);

    const [productLoading, setProductLoading] = useState(true);
    const [seenloading, setSeenloading] = useState(false);

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setProductLoading(true);
        productService.getAll(productType.parts)
            .then(data => setParts(data));
        setProductLoading(false);
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
                <h2>{productName.parts}</h2>
            </div>
            <div className="productPage">
                {productLoading && (<Loading />)}
                {!productLoading && parts.length > 0 && parts.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
            </div>
            {/* {parts.length === 0 && (
                <p className="noProduct">There are no Products yet!</p>
            )} */}
            {lastSeenProducts.length > 2 && (
                <>
                    <div className='productContent'>
                        <h2>{productName.lastSeen}</h2>
                        {seenloading && (<Loading />)}
                        {!seenloading && (
                            <>
                                {<Slider data={lastSeenProducts} />}
                                <Link className='goTo' to="/lastSeen">See all</Link>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Parts;