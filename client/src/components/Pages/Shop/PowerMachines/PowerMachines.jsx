import '../product.css';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { productServiceFactory } from '../../../../sevices/productService';
import { useAuthContext } from '../../../../context/AuthContext';

import { productName, productType } from '../../../../config/constants/constants';
import { Loading } from '../../../cardComponents/loading/Loading';

const ProductCard = lazy(() => import('../../../cardComponents/productCard/ProductCard'));
const Slider = lazy(() => import('../../../swiperComponents/slider/Slider'));

const PowerMachines = () => {
    const productService = productServiceFactory();
    const { userId } = useAuthContext();

    const [lastSeenProducts, setLastSeenProducts] = useState([]);
    const [powerMachines, setPowerMachines] = useState([]);


    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        productService.getAll(productType.powerMachines)
            .then(data => setPowerMachines(data))
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
                <h2>{productName.powerMachines}</h2>
            </div>
            <div className="productPage">
                <Suspense fallback={<Loading />}>
                    {powerMachines && powerMachines.map(x =>
                        <ProductCard key={x._id} {...x} />
                    )}
                </Suspense>

            </div>
            {/* {powerMachines.length === 0 && (
                <p className="noProduct">There are no Products yet!</p>
            )} */}
            {lastSeenProducts.length > 2 && (
                <>
                    <div className='productTop'>
                        <h2>{productName.lastSeen}</h2>
                        <Suspense fallback={<Loading />}>
                            {<Slider data={lastSeenProducts} />}
                        <Link className='goTo' to="/lastSeen">See all</Link>
                        </Suspense>
                    </div>
                </>
            )}
        </div>
    );
};

export default PowerMachines;