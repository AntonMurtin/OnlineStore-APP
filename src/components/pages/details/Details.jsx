
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { productServiceFactory } from '../../../sevices/productService';
import { useAuthContext } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';

import { productName, productType } from '../../../config/constants/constants';
import { Loading } from '../../cardComponents/loading/Loading';

import DetailsCard from '../../cardComponents/detailsCard/DetailsCard';
import Slider from '../../swiperComponents/slider/Slider';


const Details = () => {
    const { pathname } = useLocation();
    const { type, id } = useParams();

    const productService = productServiceFactory();
    const dispatch = useNotification();

    const { userId } = useAuthContext();

    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [productLoading, setProductLoading] = useState(true);
    const allProducts = products.filter(x => x._id !== id);

    const [lastSeenProducts, setLastSeenProducts] = useState([]);
    const [seenloading, setSeenloading] = useState(false);


    const getProducts = async () => {
        const product = await productService.getById(type, id);
        const products = await productService.getAll(type);
        setProduct(product);
        setProducts(products)
        setProductLoading(false);
    };

    const getLastSeen = async () => {
        const result = await Promise.all([
            productService.getLastSeen(productType.waterpumps, userId),
            productService.getLastSeen(productType.irigationSystems, userId),
            productService.getLastSeen(productType.parts, userId),
            productService.getLastSeen(productType.powerMachines, userId),
            productService.getLastSeen(productType.pipes, userId),
            productService.getLastSeen(productType.tools, userId),
        ]);
        const product = result.reduce((result, array) => result.concat(array), []);
        setLastSeenProducts(product)
        setSeenloading(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        getProducts()
    }, [id]);

    useEffect(()=>{
        if(userId){
            getLastSeen()
        }
    },[id]);
  

    useEffect(() => {
        if (userId) {
            try {
                productService.addLastSeen(type, id, { userId });
            } catch (error) {
                dispatch({
                    type: 'ERROR',
                    message: error,
                });
            }
        };
    }, [id]);

    return (
        <section className='page'>
            {productLoading && (<Loading />)}
            {!productLoading && (
                <DetailsCard key={product._id} {...product} />
            )}

            <div className='productContent'>
                <h2>{productName[type]}</h2>
                {productLoading && (<Loading />)}
                {!productLoading && (
                    <>
                        {<Slider data={allProducts} />}
                        <Link className='goTo' to={`/shop/${product.type}`}>See all</Link>
                    </>
                )}

            </div>
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

export default Details;