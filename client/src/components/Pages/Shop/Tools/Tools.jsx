import '../Product.css';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';


import { productServiceFactory } from '../../../../sevices/productService';
import { useAuthContext } from '../../../../context/AuthContext';

import { productName, productType } from '../../../../config/constants/constants';

const ProductCard = lazy(() => import('../../../CardComponents/ProductCard/ProductCard'));
const Slider = lazy(() => import('../../../SwiperComponents/Slider/Slider'));

const Tools = () => {
    const productService = productServiceFactory();

    const [tools, setTools] = useState([]);
    const { userId } = useAuthContext();
    const [lastSeenProducts, setLastSeenProducts] = useState([]);

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        productService.getAll(productType.tools)
            .then(data => setTools(data))
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
                <h2>{productName.tools}</h2>
            </div>
            <div className="productPage">
                <Suspense fallback={<h1 style={{ textAlign: 'center' }}>Loading...</h1>}>
                    {tools && tools.map(x =>
                        <ProductCard key={x._id} {...x} />
                    )}
                </Suspense>

            </div>
            {/* {tools.length === 0 && (
                <p className="noProduct">There are no Products yet!</p>
            )} */}
            {lastSeenProducts.length > 2 && (
                <>
                    <div className='productTop'>
                        <h2>{productName.lastSeen}</h2>
                        <Suspense fallback={<h1 style={{ textAlign: 'center' }}>Loading...</h1>}>
                            {<Slider data={lastSeenProducts} />}
                        </Suspense>
                        <Link className='goTo' to="/lastSeen">See all</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Tools;