import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { useProductContext } from '../../../context/ProductContext'
import { useAuthContext } from '../../../context/AuthContext'

import { productServiceFactory } from '../../../sevices/productService';
import { DetailsCard } from '../../CardComponents/DetailsCard/DetailsCard';
import { Slider } from '../../SwiperComponents/Slider/Slider';
import { productName } from '../../../config/constants/constants';
import { useNotification } from '../../../context/NotificationContext';
import { productType } from '../../../config/constants/constants';

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
            productService.getById(type,id),
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
        if (userId){
            
            try {
                productService.addLastSeen(type, id, { userId });
            } catch (error) {
                console.log(error);
                // dispatch({
                //     type: 'ERROR',
                //     message: error,
                // });
        }
        };
    }, [id]);


    return (
        <section className='page'>

            <DetailsCard key={product._id}
                {...product}
            />

            <div className='productContent'>
                <h2>{productName[productType]}</h2>
                {<Slider data={allProducts} />}
                <Link className='goTo' to={`/shop/${product.type}`}>See all</Link>
            </div>
            {lastSeenProducts.length > 2 && (
                <>
                    <div className='productContent'>
                        <h2>Last Seen</h2>
                        {<Slider data={lastSeenProducts} />}
                        <Link className='goTo' to="/lastSeen">See all</Link>
                    </div>
                </>
            )}
        </section>

    );
};

export default Details