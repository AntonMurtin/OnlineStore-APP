import '../Product.css';
import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { productType } from '../../../../config/constants/constants';
import { ProductCard } from '../../../CardComponents/ProductCard/ProductCard'
import { productServiceFactory } from '../../../../sevices/productService';
import { useProductContext } from '../../../../context/ProductContext';
import { Slider } from '../../../SwiperComponents/Slider/Slider';
const Tools = () => {
    const productservice = productServiceFactory();
    const {lastSeenProducts}=useProductContext();
    const [tools, setTools] = useState([]);

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        productservice.getAll(productType.tools)
            .then(data => setTools(data))
    }, [pathname]);
    return (
        <div className="page">

            <div className="productPage">

                {tools && tools.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
              
            </div>
            {tools.length === 0 && (
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

export default Tools;