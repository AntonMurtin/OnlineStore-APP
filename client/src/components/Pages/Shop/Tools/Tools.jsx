import '../Product.css';
import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { productType } from '../../../../config/constants/constants';
import { ProductCard } from '../../../CardComponents/ProductCard/ProductCard'
import { productServiceFactory } from '../../../../sevices/productService';
const Tools = () => {
    const productservice = productServiceFactory()
    const [tools, setTools] = useState([])

    const { pathname } = useLocation()

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
                {tools.length === 0 && (
                    <p className="noProduct">There are no Products yet!</p>
                )}
            </div>
        </div>
    );
};

export default Tools;