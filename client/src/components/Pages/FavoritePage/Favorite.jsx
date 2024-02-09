import '../Shop/Product.css';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { productServiceFactory } from '../../../sevices/productService';
import { useAuthContext } from '../../../context/AuthContext';
import { useProductContext } from '../../../context/ProductContext';

import { productName, productType } from '../../../config/constants/constants';

const  DetailsCard= lazy(() => import('../../CardComponents/DetailsCard/DetailsCard'));
const Slider = lazy(() => import('../../SwiperComponents/Slider/Slider'));


const Favorite = () => {
    const productService = productServiceFactory();

    const { userId } = useAuthContext();
    const { favoriteProducts } = useProductContext();

    const [lastSeenProducts, setLastSeenProducts] = useState([]);

    const { pathname } = useLocation();


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
        <section className='page'>
            <Suspense fallback={<h1 style={{ textAlign: 'center' }}>Loading...</h1>}>
                {favoriteProducts && favoriteProducts.map(x =>
                    <DetailsCard key={x._id} {...x} />
                )}
            </Suspense>
            {favoriteProducts.length === 0 && (
                <p className="noProduct">There are no Favorite yet!</p>
            )}
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
        </section>
    );
};

export default Favorite;