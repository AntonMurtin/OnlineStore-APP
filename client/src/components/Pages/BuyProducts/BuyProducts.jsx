import './BuyProducts.css'
import { lazy, Suspense, useEffect } from 'react';

import { useProductContext } from '../../../context/ProductContext';
import { useLocation } from 'react-router-dom';

const BuyCard = lazy(() => import('../../CardComponents/BuyCard/BuyCard'));

const BuyProducts = () => {
  const { buysProducts, totalPrice } = useProductContext();

  const { pathname } = useLocation();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

  return (

    <section className='buyProductPage'>

      {buysProducts.length > 0 && (
        <>
          <h2 className='buyTitle'>Shoping Bag</h2>
          <div className="buyProducts">
            <div className='buySize'>
              <Suspense fallback={<h1 style={{ textAlign: 'center' }}>Loading...</h1>}>
                {buysProducts.map(x => <BuyCard key={x._id} {...x} />)}
              </Suspense>
            </div>

            <div className='subtotal'>{`Subtotal: ${totalPrice} $`}</div>
            <div className='buyBtnDiv' >
              <button id='buybtn'>BUY</button>
            </div>
          </div>
        </>
      )}


      {buysProducts.length === 0 && (

        <p className="noProduct">There are no Products yet!</p>

      )}

    </section>
  )
}

export default BuyProducts;