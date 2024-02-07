import '../Product.css';
import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { productType } from '../../../../config/constants/constants';
import {ProductCard} from '../../../CardComponents/ProductCard/ProductCard'
import { productServiceFactory } from '../../../../sevices/productService';

import { Slider } from '../../../SwiperComponents/Slider/Slider';
import { useAuthContext } from '../../../../context/AuthContext';

const Parts = () => {
    const productService = productServiceFactory();
    const { userId } = useAuthContext();

    const [lastSeenProducts, setLastSeenProducts] = useState([]);
     const [parts,setParts]=useState([]);
     const {pathname}=useLocation();

     useEffect(()=>{
        window.scrollTo(0,0);
     },[pathname]);

     useEffect(()=>{
        productService.getAll(productType.parts)
        .then(data=>setParts(data))
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

                {parts && parts.map(x =>
                    <ProductCard key={x._id} {...x} />
                )}
            
            </div>
            {parts.length === 0 && (
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

export default Parts;