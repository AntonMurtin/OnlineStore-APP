import './buyProducts.css'
import { lazy, Suspense, useEffect } from 'react';

import { useProductContext } from '../../../context/ProductContext';
import { useLocation } from 'react-router-dom';
import { Loading } from '../../cardComponents/loading/Loading';

import BuyCard from '../../cardComponents/buyCard/BuyCard';

const BuyProducts = () => {
  const { buysProducts, buyLoading, totalPrice } = useProductContext();

  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (

    <section className='buyProductPage'>

      <h2 className='buyTitle'>Shoping Bag</h2>
      <div className="buyProducts">
        <div className='buySize'>
          {buyLoading && (<Loading />)}
          {!buyLoading && buysProducts.map(x => <BuyCard key={x._id} {...x} />)}
          {!buyLoading && buysProducts.length === 0 && (
            <p className="noProduct">There are no Products !</p>)}
        </div>

        <div className='subtotal'>{`Subtotal: ${buysProducts.length > 0 ? totalPrice : 0} $`}</div>
        <div className='buyBtnDiv' >
          <button id='buybtn'>BUY</button>
        </div>
      </div>




    </section>
  )
}

export default BuyProducts;