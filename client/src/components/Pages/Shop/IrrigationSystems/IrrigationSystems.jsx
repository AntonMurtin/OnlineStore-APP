import '../Product.css';
import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import {ProductCard} from '../../../CardComponents/ProductCard/ProductCard'

import { productType } from '../../../../config/constants/constants';
import { productServiceFactory } from '../../../../sevices/productService';
import { Slider } from '../../../SwiperComponents/Slider/Slider';
import { useProductContext } from '../../../../context/ProductContext';

const IrrigationSystems = () => {
    const productservice=productServiceFactory();
    const {lastSeenProducts}=useProductContext()
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
                
            </div>
            {irigationSystems.length === 0 && (
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

export default IrrigationSystems;