import '../Product.css';
import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import {ProductCard} from '../../../CardComponents/ProductCard/ProductCard'

import { productType } from '../../../../config/constants/constants';
import { productServiceFactory } from '../../../../sevices/productService';
import { Slider } from '../../../SwiperComponents/Slider/Slider';
import { useAuthContext } from '../../../../context/AuthContext';

const IrrigationSystems = () => {
    const productService=productServiceFactory();
    const {userId}=useAuthContext()

    const [irigationSystems,setIrigationSystems]=useState([]);
    const [lastSeenProducts, setLastSeenProducts] = useState([]);


    const {pathname}=useLocation()

     useEffect(()=>{
        window.scrollTo(0,0);
     },[pathname]);

     useEffect(()=>{
        productService.getAll(productType.irigationSystems)
        .then(data=>setIrigationSystems(data));
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