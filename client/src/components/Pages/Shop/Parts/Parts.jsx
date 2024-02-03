import '../Product.css';
import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { productType } from '../../../../config/constants/constants';
import {ProductCard} from '../../../CardComponents/ProductCard/ProductCard'
import { productServiceFactory } from '../../../../sevices/productService';

const Parts = () => {
    const productservice=productServiceFactory()
     const [parts,setParts]=useState([])
     const {pathname}=useLocation()

     useEffect(()=>{
        window.scrollTo(0,0);
     },[pathname]);

     useEffect(()=>{
        productservice.getAll(productType.parts)
        .then(data=>setParts(data))
     },[pathname]);
   
    return (
       <div className="page">

            <div className="productPage">

                {parts && parts.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
                {parts.length === 0 && (
                    <p className="noProduct">There are no Products yet!</p>
                )}
            </div>
       </div>
    );
};

export default Parts;