import '../Product.css';
import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { productType } from '../../../../config/constants/constants';
import {ProductCard} from '../../../CardComponents/ProductCard/ProductCard'
import { productServiceFactory } from '../../../../sevices/productService';

const PowerMachines = () => {
    const productservice=productServiceFactory();

     const  [powerMachines, setPowerMachines ]=useState([])

     const {pathname}=useLocation()

     useEffect(()=>{
        window.scrollTo(0,0);
     },[pathname]);

     useEffect(()=>{
        productservice.getAll(productType.powerMachines)
        .then(data=> setPowerMachines(data))
     },[pathname])
   
    return (
       <div className="page">

            <div className="productPage">

                {powerMachines && powerMachines.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
                {powerMachines.length === 0 && (
                    <p className="noProduct">There are no Products yet!</p>
                )}
            </div>
       </div>
    );
};

export default PowerMachines;