import '../Shop/product.css';
import { useEffect, useState} from 'react';
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
    const [lastSeenProducts, setLastSeenProducts] = useState([]);

    const [productLoading, setProductLoading] = useState(true);
    const [seenloading, setSeenloading] = useState(false);

    const allProducts = products.filter(x => x._id !== id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setProductLoading(true);
        Promise.all([
            productService.getById(type, id),
            productService.getAll(type),
        ]).then(([
            productData,
            productsData,
        ]) => {
            setProduct(productData)
            setProducts(productsData)
        })
        setProductLoading(false);
    }, [id]);

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
    }, [id]);

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
            {!productLoading && (
                <DetailsCard key={product._id} {...product} />
            )}
            {productLoading && (<Loading />)}

            <div className='productContent'>
                <h2>{productName[type]}</h2>
                {!productLoading && allProducts.length > 0 && (
                    <>
                        {<Slider data={allProducts} />}
                        <Link className='goTo' to={`/shop/${product.type}`}>See all</Link>
                    </>
                )}
                {productLoading && (<Loading />)}

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