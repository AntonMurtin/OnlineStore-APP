import '../shopPoducts/products.css'

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { productServiceFactory } from '../../../sevices/productService';
import { useAuthContext } from '../../../context/AuthContext';
import { useProductContext } from '../../../context/ProductContext';

import { productName, productType } from '../../../config/constants/constants';
import { Loading } from '../../cardComponents/loading/Loading';

import DetailsCard from '../../cardComponents/detailsCard/DetailsCard';
import Slider from '../../swiperComponents/slider/Slider';


const Favorite = () => {
    const productService = productServiceFactory();

    const { userId } = useAuthContext();
    const { favoriteProducts, favoriteLoading } = useProductContext();

    const [lastSeenProducts, setLastSeenProducts] = useState([]);
    const [seenloading, setSeenloading] = useState(true);

    const { pathname } = useLocation();


    const getLastSeenProducts = async () => {
        const result = await Promise.all([
            productService.getLastSeen(productType.waterpumps, userId),
            productService.getLastSeen(productType.irigationSystems, userId),
            productService.getLastSeen(productType.parts, userId),
            productService.getLastSeen(productType.powerMachines, userId),
            productService.getLastSeen(productType.pipes, userId),
            productService.getLastSeen(productType.tools, userId),
        ]);
        const products = result.reduce((result, array) => result.concat(array), [])
        setLastSeenProducts(products);
        setSeenloading(false);
    };

    useEffect(() => {
        if (userId) {
            getLastSeenProducts();
        }
    }, [pathname]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <section className='page'>
            {favoriteLoading && (<Loading />)}
            {!favoriteLoading && favoriteProducts.length > 0 && favoriteProducts.map(x =>
                <DetailsCard key={x._id} {...x} />
            )}
            {!favoriteLoading && favoriteProducts.length === 0 && (
                <p className="noProduct">There are no Favorite yet!</p>
            )}
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
        </section>
    );
};

export default Favorite;