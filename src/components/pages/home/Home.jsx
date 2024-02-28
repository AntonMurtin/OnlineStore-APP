import './home.css';

import { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { v4 } from 'uuid'

import { useAuthContext } from '../../../context/AuthContext';
import { productServiceFactory } from '../../../sevices/productService';

import { Loading } from '../../cardComponents/loading/Loading';
import { productName, productType } from '../../../config/constants/constants';
import homeData from '../../../config/data/homeData';

const Carousel = lazy(() => import('../../swiperComponents/carousel/Carousel'));

import Slider from '../../swiperComponents/slider/Slider';

const Home = () => {
    const productService = productServiceFactory();

    const { userId } = useAuthContext();

    const [products, setProducts] = useState([]);
    const [productLoading, setProductLoading] = useState(true);
    const [lastSeenProducts, setLastSeenProducts] = useState([]);
    const [seenloading, setSeenloading] = useState(true);

    const { pathname } = useLocation();

    const getAllProducts = async () => {
        const result = await Promise.all([
            productService.getAll(productType.waterpumps),
            productService.getAll(productType.irigationSystems),
            productService.getAll(productType.parts),
            productService.getAll(productType.powerMachines),
            productService.getAll(productType.pipes),
            productService.getAll(productType.tools),
        ])
        const products = Object.values(result);
        setProducts(products);
        setProductLoading(false);
    };

    const getLastSeenProducts = async () => {
        const result = await Promise.all([
            productService.getLastSeen(productType.waterpumps, userId),
            productService.getLastSeen(productType.irigationSystems, userId),
            productService.getLastSeen(productType.parts, userId),
            productService.getLastSeen(productType.powerMachines, userId),
            productService.getLastSeen(productType.pipes, userId),
            productService.getLastSeen(productType.tools, userId),
        ])

        const products = result.reduce((result, array) => result.concat(array), [])
        setLastSeenProducts(products);
        setSeenloading(false);
    };

    useEffect(() => {

        window.scrollTo(0, 0);
    }, [pathname]);


    useEffect(() => {
        getAllProducts();
    }, [pathname]);

    useEffect(() => {
        if (userId) {
            getLastSeenProducts()
        }
    }, [pathname])

    return (
        <div className="home_page">
            <div className="topContent">
                <h2>Products & Services from Rain Systems</h2>
                <Suspense fallback={<Loading />}>
                    {<Carousel data={homeData} />}
                </Suspense>
            </div>

            {products.length > 0 && products.map(x =>
                <div key={v4()} className='productContent'>
                    <h2>{productName[x[0].type]}</h2>
                    {!productLoading && (
                        <>
                            {<Slider data={x} />}
                            <Link className='goTo' to={`/shop/${x[0].type}`}>See all</Link>
                        </>
                    )}
                </div>)}

            {products.length === 0 && (
                <div className='productNoContent'>
                    <Loading />
                </div>
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
        </div>
    )
}

export default Home;