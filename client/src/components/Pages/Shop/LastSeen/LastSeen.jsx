import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '../../../CardComponents/ProductCard/ProductCard';
import { useProductContext } from '../../../../context/ProductContext';

const LastSeen = () => {
    const {pathname}=useLocation();
    const {lastSeenProducts}=useProductContext();

    useEffect(()=>{
       window.scrollTo(0,0);
    },[pathname]);
return (
      <div className="page">
           <div className="productPage">
               {lastSeenProducts && lastSeenProducts.map(x =>
                   <ProductCard key={x._id} {...x} />
               )}
           </div>
               {lastSeenProducts.length === 0 && (
                   <p className="noProduct">There are no Products yet!</p>
               )}
      </div>
     
   );
};

export default LastSeen;