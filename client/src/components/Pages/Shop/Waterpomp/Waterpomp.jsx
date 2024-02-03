import '../Product.css';
import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { productType } from '../../../../config/constants/constants';
import { ProductCard } from '../../../CardComponents/ProductCard/ProductCard'
import { productServiceFactory } from '../../../../sevices/productService';



const Waterpomp = () => {
    const productservice = productServiceFactory()
    const [waterpomps, setWaterpomps] = useState([])

     const {pathname}=useLocation()

     useEffect(()=>{
        window.scrollTo(0,0);
     },[pathname]);

     useEffect(()=>{
        productservice.getAll(productType.waterpomps)
        .then(data=>setWaterpomps(data))
     },[pathname]);
   
    return (
       <div className="page">
            <div className="productPage">
                {waterpomps && waterpomps.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
            </div>
                {waterpomps.length === 0 && (
                    <p className="noProduct">There are no Products yet!</p>
                )}
       </div>
      
    );
};

export default Waterpomp;