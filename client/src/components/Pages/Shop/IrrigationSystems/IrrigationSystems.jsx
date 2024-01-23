import '../Product.css';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useProductContext } from '../../../../context/ProductContext';
import { ProductCard } from '../../../productCard/productCard';

const IrrigationSystems = () => {
    const { systems } = useProductContext();

    const {pathname}=useLocation()

     useEffect(()=>{
        window.scrollTo(0,0);
     },[pathname]);

    return (
        <div className="waterpompPage">

            <div className="productPage">

                {systems && systems.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
                {systems.length === 0 && (
                    <p className="noProduct">There are no Products yet!</p>
                )}
            </div>
        </div>
    );
};

export default IrrigationSystems;