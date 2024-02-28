import './products.css';

import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { productServiceFactory } from '../../../sevices/productService';
import { useAuthContext } from '../../../context/AuthContext';

import { productName, productType } from '../../../config/constants/constants';
import { Loading } from '../../cardComponents/loading/Loading';

import ProductCard from '../../cardComponents/productCard/ProductCard';
import Slider from '../../swiperComponents/slider/Slider';

const Products = () => {
    const productService = productServiceFactory();
    const { userId } = useAuthContext();
    const { type } = useParams();


    const [lastSeenProducts, setLastSeenProducts] = useState([]);
    const [products, setProducts] = useState([]);

    const [productLoading, setProductLoading] = useState(true);
    const [seenloading, setSeenloading] = useState(true);

    const { pathname } = useLocation();

    const getProducts = async () => {
        const result = await productService.getAll(type);
        setProducts(result);
        setProductLoading(false);
    }

    const getLastSeenProducts = async () => {
        const result = await Promise.all([
            productService.getLastSeen(productType.waterpumps, userId),
            productService.getLastSeen(productType.irigationSystems, userId),
            productService.getLastSeen(productType.parts, userId),
            productService.getLastSeen(productType.powerMachines, userId),
            productService.getLastSeen(productType.pipes, userId),
            productService.getLastSeen(productType.tools, userId),
        ])

        const products = result.reduce((result, array) => result.concat(array), []);
        setLastSeenProducts(products);
        setSeenloading(false);
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        getProducts();
    }, [pathname]);

    useEffect(() => {
        if (userId) {
            getLastSeenProducts();
        }
    }, [pathname]);

    return (
        <div className="page">
            <div className="productTop">
                <h2>{productName[type]}</h2>
            </div>
            <div className="productPage">
                {productLoading && (<Loading />)}
                {!productLoading && products.map(x =>
                    <ProductCard key={x._id} {...x} />)}
            </div>
            {!productLoading && products.length === 0 && (
                <p className="noProduct">There are no Products !</p>)}

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

export default Products;