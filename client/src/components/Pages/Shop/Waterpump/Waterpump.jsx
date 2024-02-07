import '../Product.css';
import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { productName, productType } from '../../../../config/constants/constants';
import { ProductCard } from '../../../CardComponents/ProductCard/ProductCard'
import { productServiceFactory } from '../../../../sevices/productService';
import { Slider } from '../../../SwiperComponents/Slider/Slider';
import { useAuthContext } from '../../../../context/AuthContext';



const Waterpump = () => {
    const productService = productServiceFactory();
    const {userId}=useAuthContext();


    const [waterpumps, setWaterpumps] = useState([]);
    const [lastSeenProducts, setLastSeenProducts] = useState([]);
  


     const {pathname}=useLocation();

     useEffect(()=>{
        window.scrollTo(0,0);
     },[pathname]);

     useEffect(()=>{
        productService.getAll(productType.waterpumps)
        .then(data=>setWaterpumps(data))
     },[pathname]);

     useEffect(() => {
        if (userId) {
            Promise.all([
                productService.getLastSeen(productType.waterpumps, userId),
                productService.getLastSeen(productType.irigationSystems, userId),
                productService.getLastSeen(productType.parts, userId),
                productService.getLastSeen(productType.powerMachines, userId),
                productService.getLastSeen(productType.pipes, userId),
                productService.getLastSeen(productType.tools, userId),
            ]).then(([
                waterpumpsgetSeen,
                irigationSystemsgetSeen,
                partsgetSeen,
                powerMachinesgetSeen,
                pipesgetSeen,
                toolsgetSeen,
            ]) => {
                setLastSeenProducts([
                    ...waterpumpsgetSeen,
                    ...irigationSystemsgetSeen,
                    ...partsgetSeen,
                    ...powerMachinesgetSeen,
                    ...pipesgetSeen,
                    ...toolsgetSeen,
                ]);
            });
        };
    }, [pathname]);
   
    return (
       <div className="page">
        <div className="productTop">
            <h2>{productName.waterpumps}</h2>
        </div>
            <div className="productPage">

                {waterpumps && waterpumps.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
            </div>
            {waterpumps.length === 0 && (
                <p className="noProduct">There are no Products yet!</p>
            )}
            {lastSeenProducts.length > 2 && (
                <>
                    <div className='productTop'>
                        <h2>{productName.lastSeen}</h2>
                        {<Slider data={lastSeenProducts} />}
                        <Link className='goTo' to="/lastSeen">See all</Link>
                    </div>
                </>
            )}
       </div>

      
    );
};

export default Waterpump;