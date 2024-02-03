import '../Product.css';
import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { productServiceFactory } from '../../../../sevices/productService';
import { productType } from '../../../../config/constants/constants';
import { ProductCard } from '../../../CardComponents/ProductCard/ProductCard'

const Pipes = () => {
    const productservice = productServiceFactory()
    const [pipes, setPipes] = useState([]);

    const { pathname } = useLocation()

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
                {pipes.length === 0 && (
                    <p className="noProduct">There are no Products yet!</p>
                )}
            </div>
        </div>
    );
};

export default Pipes;