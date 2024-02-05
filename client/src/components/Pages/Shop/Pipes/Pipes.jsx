import '../Product.css';
import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { productServiceFactory } from '../../../../sevices/productService';
import { productType } from '../../../../config/constants/constants';
import { ProductCard } from '../../../CardComponents/ProductCard/ProductCard'
import { useProductContext } from '../../../../context/ProductContext';
import { Slider } from '../../../SwiperComponents/Slider/Slider';

const Pipes = () => {
    const productservice = productServiceFactory();
    const {lastSeenProducts}=useProductContext();
    const [pipes, setPipes] = useState([]);

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        productservice.getAll(productType.pipes)
            .then(data => setPipes(data))
    }, [pathname])

    return (
        <div className="page">

            <div className="productPage">

                {pipes && pipes.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
                
            </div>
            {pipes.length === 0 && (
                <p className="noProduct">There are no Products yet!</p>
            )}
             {lastSeenProducts.length > 2 && (
                <>
                    <div className='productContent'>
                        <h2>Last Seen</h2>
                        {<Slider data={lastSeenProducts} />}
                        <Link className='goTo' to="/lastSeen">See all</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Pipes;