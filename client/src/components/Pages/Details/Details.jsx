import '../Shop/Product.css';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { productServiceFactory } from '../../../sevices/productService';
import { useAuthContext } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';

import { productName, productType } from '../../../config/constants/constants';

const  DetailsCard= lazy(() => import('../../CardComponents/DetailsCard/DetailsCard'));
const Slider = lazy(() => import('../../SwiperComponents/Slider/Slider'));


const Details = () => {
    const { pathname } = useLocation();
    const { type, id } = useParams();

    const productService = productServiceFactory();
    const dispatch = useNotification();

    const { userId } = useAuthContext();

    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [lastSeenProducts, setLastSeenProducts] = useState([]);


    const allProducts = products.filter(x => x._id !== id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
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
    }, [id]);

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
            <Suspense fallback={<h1 style={{ textAlign: 'center' }}>Loading...</h1>}>
                <DetailsCard key={product._id} {...product} />
            </Suspense>

            <div className='productContent'>
                <h2>{productName[productType]}</h2>
                <Suspense fallback={<h1 style={{ textAlign: 'center' }}>Loading...</h1>}>
                    {<Slider data={allProducts} />}
                </Suspense>
                <Link className='goTo' to={`/shop/${product.type}`}>See all</Link>
            </div>
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

export default Details;