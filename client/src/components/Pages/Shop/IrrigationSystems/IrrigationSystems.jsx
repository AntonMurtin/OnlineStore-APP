import '../Product.css';
import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import {ProductCard} from '../../../CardComponents/ProductCard/ProductCard'

import { productType } from '../../../../config/constants/constants';
import { productServiceFactory } from '../../../../sevices/productService';

const IrrigationSystems = () => {
    const productservice=productServiceFactory()
    const [irigationSystems,setIrigationSystems]=useState([]);

    const {pathname}=useLocation()

     useEffect(()=>{
        window.scrollTo(0,0);
     },[pathname]);

     useEffect(()=>{
        productservice.getAll(productType.irigationSystems)
        .then(data=>setIrigationSystems(data));
     },[pathname])

    return (
        <div className="page">

            <div className="productPage">

                {irigationSystems && irigationSystems.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
                {irigationSystems.length === 0 && (
                    <p className="noProduct">There are no Products yet!</p>
                )}
            </div>
        </div>
    );
};

export default IrrigationSystems;